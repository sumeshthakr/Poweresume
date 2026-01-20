import type { Resume } from './schemas';

/**
 * Parse PDF resume and extract structured data
 */
export async function parsePDFResume(file: File): Promise<Partial<Resume>> {
  try {
    // For client-side, we'll use pdf-parse via a worker or API
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Import pdf-parse dynamically - it has named export
    const pdfParseModule = await import('pdf-parse');
    // @ts-ignore - pdf-parse has complex type definitions
    const data = await pdfParseModule(uint8Array);
    
    const text = data.text;
    return extractStructuredData(text, 'pdf');
  } catch (error) {
    console.error('Error parsing PDF:', error);
    // Fallback: return minimal data
    return {
      identity: {
        name: '',
        email: '',
        links: [],
      },
      skills: {
        languages: [],
        frameworks: [],
        gpu_graphics: [],
        systems_tools: [],
      },
      experience: [],
      education: [],
      projects: [],
      publications: [],
      certifications: [],
      metadata: {
        source_files: ['pdf'],
        extraction_confidence: 0,
      },
    };
  }
}

/**
 * Parse LaTeX resume and extract structured data
 */
export async function parseLatexResume(file: File): Promise<Partial<Resume>> {
  try {
    const text = await file.text();
    return extractStructuredData(text, 'latex');
  } catch (error) {
    console.error('Error parsing LaTeX:', error);
    throw new Error('Failed to parse LaTeX resume');
  }
}

/**
 * Parse DOCX resume and extract structured data
 */
export async function parseDOCXResume(file: File): Promise<Partial<Resume>> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const mammoth = (await import('mammoth')).default;
    
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;
    
    return extractStructuredData(text, 'docx');
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX resume');
  }
}

/**
 * Extract structured data from text using pattern matching and heuristics
 */
function extractStructuredData(text: string, sourceType: string): Partial<Resume> {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  
  const resume: Partial<Resume> = {
    identity: {
      name: '',
      email: '',
      links: [],
    },
    skills: {
      languages: [],
      frameworks: [],
      gpu_graphics: [],
      systems_tools: [],
    },
    experience: [],
    education: [],
    projects: [],
    publications: [],
    certifications: [],
    metadata: {
      source_files: [sourceType],
      extraction_confidence: 0.7,
    },
  };

  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch && resume.identity) {
    resume.identity.email = emailMatch[0];
  }

  // Extract phone
  const phoneMatch = text.match(/(?:\+?1[-.]?)?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})/);
  if (phoneMatch && resume.identity) {
    resume.identity.phone = phoneMatch[0];
  }

  // Extract name (usually first non-empty line)
  if (lines.length > 0 && resume.identity) {
    const firstLine = lines[0];
    // Skip if it looks like a section header
    if (!firstLine.toLowerCase().includes('resume') && 
        !firstLine.toLowerCase().includes('curriculum')) {
      resume.identity.name = firstLine;
    } else if (lines.length > 1) {
      resume.identity.name = lines[1];
    }
  }

  // Extract links (GitHub, LinkedIn, Portfolio)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex) || [];
  
  if (resume.identity) {
    resume.identity.links = urls.map(url => {
      let type: 'linkedin' | 'github' | 'portfolio' | 'other' = 'other';
      if (url.includes('linkedin.com')) type = 'linkedin';
      else if (url.includes('github.com')) type = 'github';
      else if (url.includes('portfolio') || url.includes('personal')) type = 'portfolio';
      
      return { type, url };
    });
  }

  // Extract sections
  const sections = findSections(text);
  
  // Extract experience
  if (sections.experience) {
    resume.experience = extractExperience(sections.experience);
  }

  // Extract education
  if (sections.education) {
    resume.education = extractEducation(sections.education);
  }

  // Extract skills
  if (sections.skills) {
    resume.skills = extractSkills(sections.skills);
  }

  // Extract projects
  if (sections.projects) {
    resume.projects = extractProjects(sections.projects);
  }

  return resume;
}

/**
 * Find major sections in the resume text
 */
function findSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  
  const sectionHeaders = {
    experience: /(?:work\s+)?experience|employment(?:\s+history)?/i,
    education: /education/i,
    skills: /(?:technical\s+)?skills|technologies/i,
    projects: /projects|portfolio/i,
    publications: /publications|papers/i,
    certifications: /certifications|certificates/i,
  };

  const lines = text.split('\n');
  let currentSection = '';
  let sectionContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this line is a section header
    let matchedSection = '';
    for (const [key, regex] of Object.entries(sectionHeaders)) {
      if (regex.test(line) && line.length < 50) {
        matchedSection = key;
        break;
      }
    }

    if (matchedSection) {
      // Save previous section
      if (currentSection && sectionContent.length > 0) {
        sections[currentSection] = sectionContent.join('\n');
      }
      // Start new section
      currentSection = matchedSection;
      sectionContent = [];
    } else if (currentSection) {
      sectionContent.push(line);
    }
  }

  // Save last section
  if (currentSection && sectionContent.length > 0) {
    sections[currentSection] = sectionContent.join('\n');
  }

  return sections;
}

/**
 * Extract experience entries from experience section text
 */
function extractExperience(text: string): any[] {
  const experiences: any[] = [];
  const lines = text.split('\n').filter(Boolean);
  
  let current: any = null;
  
  for (const line of lines) {
    // Check for company/title line (usually has dates)
    const dateMatch = line.match(/(\d{4}|present|current)/i);
    
    if (dateMatch && line.length < 100) {
      // Save previous entry
      if (current) {
        experiences.push(current);
      }
      
      // Parse new entry
      current = {
        company: '',
        title: '',
        location: '',
        start_date: '',
        end_date: '',
        bullets: [],
        tech: [],
      };
      
      // Try to extract dates
      const dateRangeMatch = line.match(/(\w+\s+\d{4}|\d{4})\s*[-–—]\s*(\w+\s+\d{4}|\d{4}|present|current)/i);
      if (dateRangeMatch) {
        current.start_date = dateRangeMatch[1];
        current.end_date = dateRangeMatch[2];
      }
      
      // Extract company/title (everything before dates)
      const beforeDates = line.split(/\d{4}/)[0].trim();
      const parts = beforeDates.split(/[|,]/);
      if (parts.length >= 2) {
        current.title = parts[0].trim();
        current.company = parts[1].trim();
      } else {
        current.company = beforeDates;
      }
    } else if (current && line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
      // Bullet point
      current.bullets.push(line.replace(/^[•\-*]\s*/, '').trim());
    } else if (current && line.length > 20) {
      // Long line might be a bullet without marker
      current.bullets.push(line);
    }
  }
  
  if (current) {
    experiences.push(current);
  }
  
  return experiences;
}

/**
 * Extract education entries from education section text
 */
function extractEducation(text: string): any[] {
  const education: any[] = [];
  const lines = text.split('\n').filter(Boolean);
  
  let current: any = null;
  
  for (const line of lines) {
    const dateMatch = line.match(/\d{4}/);
    
    if (dateMatch || line.toLowerCase().includes('university') || 
        line.toLowerCase().includes('college') || 
        line.toLowerCase().includes('bachelor') ||
        line.toLowerCase().includes('master') ||
        line.toLowerCase().includes('phd')) {
      
      if (current) {
        education.push(current);
      }
      
      current = {
        school: '',
        degree: '',
        field: '',
        location: '',
        start_date: '',
        end_date: '',
      };
      
      // Extract school and degree
      if (line.toLowerCase().includes('university') || line.toLowerCase().includes('college')) {
        const parts = line.split(/[,|]/);
        current.school = parts[0].trim();
        if (parts.length > 1) {
          current.degree = parts[1].trim();
        }
      } else {
        current.degree = line;
      }
      
      // Extract date
      if (dateMatch) {
        current.end_date = dateMatch[0];
      }
    } else if (current && line.length > 10) {
      if (!current.school) {
        current.school = line;
      } else if (!current.field) {
        current.field = line;
      }
    }
  }
  
  if (current) {
    education.push(current);
  }
  
  return education;
}

/**
 * Extract skills from skills section text
 */
function extractSkills(text: string): any {
  const skills: any = {
    languages: [],
    frameworks: [],
    gpu_graphics: [],
    systems_tools: [],
  };
  
  const lines = text.split('\n').filter(Boolean);
  
  for (const line of lines) {
    const skillList = line.split(/[,;]/).map(s => s.trim()).filter(Boolean);
    
    // Categorize skills based on keywords
    for (const skill of skillList) {
      const lower = skill.toLowerCase();
      
      if (lower.match(/python|java|c\+\+|javascript|typescript|rust|go|c#/)) {
        skills.languages.push(skill);
      } else if (lower.match(/react|vue|angular|django|flask|node|express|next/)) {
        skills.frameworks.push(skill);
      } else if (lower.match(/cuda|opengl|vulkan|directx|metal|gpu|shader/)) {
        skills.gpu_graphics.push(skill);
      } else {
        skills.systems_tools.push(skill);
      }
    }
  }
  
  return skills;
}

/**
 * Extract projects from projects section text
 */
function extractProjects(text: string): any[] {
  const projects: any[] = [];
  const lines = text.split('\n').filter(Boolean);
  
  let current: any = null;
  
  for (const line of lines) {
    // Project name is usually bolded or at start
    if (line.length < 80 && !line.startsWith('•') && !line.startsWith('-')) {
      if (current) {
        projects.push(current);
      }
      
      current = {
        name: line,
        one_liner: '',
        bullets: [],
        tech: [],
        links: [],
      };
      
      // Extract links from project name line
      const urlMatch = line.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        current.links.push(urlMatch[0]);
        current.name = line.replace(urlMatch[0], '').trim();
      }
    } else if (current && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))) {
      current.bullets.push(line.replace(/^[•\-*]\s*/, '').trim());
    } else if (current && line.length > 20) {
      if (!current.one_liner) {
        current.one_liner = line;
      } else {
        current.bullets.push(line);
      }
    }
  }
  
  if (current) {
    projects.push(current);
  }
  
  return projects;
}

/**
 * Main parser function that routes to appropriate parser based on file type
 */
export async function parseResume(file: File): Promise<Partial<Resume>> {
  const fileType = file.name.split('.').pop()?.toLowerCase();
  
  switch (fileType) {
    case 'pdf':
      return parsePDFResume(file);
    case 'tex':
    case 'latex':
      return parseLatexResume(file);
    case 'docx':
    case 'doc':
      return parseDOCXResume(file);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}
