import type { Job } from './schemas';

/**
 * Parse job description from URL or text
 */
export async function parseJob(urlOrText: string): Promise<Partial<Job>> {
  // Check if it's a URL
  if (urlOrText.startsWith('http://') || urlOrText.startsWith('https://')) {
    return parseJobFromURL(urlOrText);
  } else {
    return parseJobFromText(urlOrText);
  }
}

/**
 * Fetch and parse job description from URL
 */
async function parseJobFromURL(url: string): Promise<Partial<Job>> {
  try {
    // For GitHub Pages/client-side, we need a CORS proxy or user to paste content
    // For now, we'll return a placeholder and require manual paste
    throw new Error('URL fetching requires backend API. Please paste the job description directly.');
  } catch (error) {
    console.error('Error fetching job URL:', error);
    throw error;
  }
}

/**
 * Parse job description from pasted text
 */
function parseJobFromText(text: string): Partial<Job> {
  const job: Partial<Job> = {
    role_title: '',
    company: '',
    responsibilities: [],
    required_skills: [],
    preferred_skills: [],
    keywords: [],
    signals: {
      research: false,
      gpu: false,
      graphics: false,
      genai: false,
    },
  };

  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  // Extract role title (usually in first few lines)
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    if (line.toLowerCase().includes('engineer') ||
        line.toLowerCase().includes('developer') ||
        line.toLowerCase().includes('scientist') ||
        line.toLowerCase().includes('manager') ||
        line.toLowerCase().includes('designer')) {
      job.role_title = line;
      break;
    }
  }

  // Extract company name
  const companyMatch = text.match(/(?:at|@|for)\s+([A-Z][A-Za-z\s&]+?)(?:\s|,|\n)/);
  if (companyMatch) {
    job.company = companyMatch[1].trim();
  }

  // Extract location
  const locationMatch = text.match(/(?:location|based in|office in)[:\s]+([A-Za-z\s,]+)/i);
  if (locationMatch) {
    job.location = locationMatch[1].trim();
  }

  // Extract sections
  const sections = extractJobSections(text);

  // Extract responsibilities
  if (sections.responsibilities) {
    job.responsibilities = extractBullets(sections.responsibilities);
  }

  // Extract required skills
  if (sections.requirements || sections.qualifications) {
    const reqText = sections.requirements || sections.qualifications || '';
    job.required_skills = extractSkills(reqText);
  }

  // Extract preferred skills
  if (sections.preferred || sections.nice_to_have) {
    const prefText = sections.preferred || sections.nice_to_have || '';
    job.preferred_skills = extractSkills(prefText);
  }

  // Extract keywords from entire text
  job.keywords = extractKeywords(text);

  // Detect signals
  const lowerText = text.toLowerCase();
  if (job.signals) {
    job.signals.research = lowerText.includes('research') || lowerText.includes('phd');
    job.signals.gpu = lowerText.includes('gpu') || lowerText.includes('cuda') || lowerText.includes('parallel');
    job.signals.graphics = lowerText.includes('graphics') || lowerText.includes('opengl') || lowerText.includes('vulkan');
    job.signals.genai = lowerText.includes('ai') || lowerText.includes('machine learning') || 
                        lowerText.includes('deep learning') || lowerText.includes('llm');
  }

  return job;
}

/**
 * Extract major sections from job description
 */
function extractJobSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};

  const sectionHeaders = {
    responsibilities: /(?:responsibilities|what you['']ll do|role|duties)/i,
    requirements: /(?:requirements|qualifications|what we['']re looking for|minimum qualifications)/i,
    preferred: /(?:preferred|nice to have|bonus|plus|ideal candidate)/i,
    about: /(?:about us|about the company|who we are)/i,
    benefits: /(?:benefits|perks|what we offer)/i,
  };

  const lines = text.split('\n');
  let currentSection = '';
  let sectionContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if this line is a section header
    let matchedSection = '';
    for (const [key, regex] of Object.entries(sectionHeaders)) {
      if (regex.test(line) && line.length < 100) {
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
 * Extract bullet points from text
 */
function extractBullets(text: string): string[] {
  const bullets: string[] = [];
  const lines = text.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('•') || trimmed.startsWith('-') || 
        trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
      bullets.push(trimmed.replace(/^[•\-*\d.]+\s*/, '').trim());
    } else if (trimmed.length > 20 && bullets.length > 0) {
      // Continuation of previous bullet
      bullets[bullets.length - 1] += ' ' + trimmed;
    } else if (trimmed.length > 20) {
      // Start new bullet
      bullets.push(trimmed);
    }
  }

  return bullets;
}

/**
 * Extract skills from text
 */
function extractSkills(text: string): string[] {
  const skills: Set<string> = new Set();

  // Common skill patterns
  const skillPatterns = [
    // Languages
    /\b(Python|Java|JavaScript|TypeScript|C\+\+|C#|Go|Rust|Ruby|PHP|Swift|Kotlin|Scala)\b/gi,
    // Frameworks
    /\b(React|Angular|Vue|Django|Flask|FastAPI|Express|Node\.js|Next\.js|Spring|Rails)\b/gi,
    // Databases
    /\b(SQL|MySQL|PostgreSQL|MongoDB|Redis|Elasticsearch|DynamoDB)\b/gi,
    // Cloud
    /\b(AWS|Azure|GCP|Docker|Kubernetes|Terraform)\b/gi,
    // ML/AI
    /\b(TensorFlow|PyTorch|Keras|Scikit-learn|CUDA|OpenCV)\b/gi,
    // Tools
    /\b(Git|CI\/CD|Jenkins|GitHub Actions|Jira)\b/gi,
  ];

  for (const pattern of skillPatterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      skills.add(match[0]);
    }
  }

  // Also extract from bullet lists
  const bullets = extractBullets(text);
  for (const bullet of bullets) {
    // Look for "X years of experience with Y" patterns
    const expMatch = bullet.match(/experience (?:with|in) ([\w\s,./+#-]+?)(?:\.|,|\n|$)/i);
    if (expMatch) {
      const skillList = expMatch[1].split(/[,/]/).map(s => s.trim());
      skillList.forEach(s => skills.add(s));
    }
  }

  return Array.from(skills);
}

/**
 * Extract important keywords from job description
 */
function extractKeywords(text: string): string[] {
  const keywords: Set<string> = new Set();

  // Extract all capitalized words and phrases (likely to be important terms)
  const capitalizedPattern = /\b[A-Z][A-Za-z0-9+#.-]*\b/g;
  const matches = text.matchAll(capitalizedPattern);
  
  for (const match of matches) {
    const word = match[0];
    // Filter out common words
    if (word.length > 2 && 
        !['The', 'We', 'You', 'Our', 'Are', 'Will', 'Can', 'Must', 'Should'].includes(word)) {
      keywords.add(word);
    }
  }

  // Extract technical terms with special characters
  const technicalPattern = /\b(?:[A-Z][A-Za-z0-9]*[./+#-][A-Za-z0-9./+#-]*|[A-Z]{2,})\b/g;
  const techMatches = text.matchAll(technicalPattern);
  
  for (const match of techMatches) {
    keywords.add(match[0]);
  }

  // Limit to most relevant keywords
  return Array.from(keywords).slice(0, 50);
}

/**
 * Analyze relevance between resume and job
 */
export interface RelevanceMap {
  matching_skills: string[];
  missing_skills: string[];
  matching_keywords: string[];
  emphasis_suggestions: {
    experiences: number[];
    projects: number[];
    skills: string[];
  };
}

export function analyzeRelevance(
  resume: any,
  job: Partial<Job>
): RelevanceMap {
  const relevance: RelevanceMap = {
    matching_skills: [],
    missing_skills: [],
    matching_keywords: [],
    emphasis_suggestions: {
      experiences: [],
      projects: [],
      skills: [],
    },
  };

  // Collect all resume skills
  const resumeSkills = new Set<string>();
  if (resume.skills) {
    [...resume.skills.languages, ...resume.skills.frameworks, 
     ...resume.skills.gpu_graphics, ...resume.skills.systems_tools]
      .forEach(skill => resumeSkills.add(skill.toLowerCase()));
  }

  // Collect all resume keywords
  const resumeKeywords = new Set<string>();
  resume.experience?.forEach((exp: any) => {
    exp.bullets?.forEach((bullet: string) => {
      bullet.split(/\s+/).forEach(word => {
        if (word.length > 3) {
          resumeKeywords.add(word.toLowerCase());
        }
      });
    });
  });

  // Check matching skills
  const jobSkills = [...(job.required_skills || []), ...(job.preferred_skills || [])];
  for (const skill of jobSkills) {
    if (resumeSkills.has(skill.toLowerCase())) {
      relevance.matching_skills.push(skill);
    } else {
      relevance.missing_skills.push(skill);
    }
  }

  // Check matching keywords
  const jobKeywords = job.keywords || [];
  for (const keyword of jobKeywords) {
    if (resumeKeywords.has(keyword.toLowerCase())) {
      relevance.matching_keywords.push(keyword);
    }
  }

  // Suggest which experiences to emphasize
  resume.experience?.forEach((exp: any, index: number) => {
    const expText = exp.bullets.join(' ').toLowerCase();
    let relevanceScore = 0;

    // Check how many job keywords appear in this experience
    jobKeywords.forEach(keyword => {
      if (expText.includes(keyword.toLowerCase())) {
        relevanceScore++;
      }
    });

    if (relevanceScore > 2) {
      relevance.emphasis_suggestions.experiences.push(index);
    }
  });

  // Suggest which projects to emphasize
  resume.projects?.forEach((proj: any, index: number) => {
    const projText = (proj.name + ' ' + proj.bullets.join(' ')).toLowerCase();
    let relevanceScore = 0;

    jobKeywords.forEach(keyword => {
      if (projText.includes(keyword.toLowerCase())) {
        relevanceScore++;
      }
    });

    if (relevanceScore > 1) {
      relevance.emphasis_suggestions.projects.push(index);
    }
  });

  // Suggest which skills to emphasize
  relevance.emphasis_suggestions.skills = relevance.matching_skills.slice(0, 10);

  return relevance;
}
