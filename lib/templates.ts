import type { Resume, Template } from './schemas';

/**
 * Template library with professional LaTeX templates
 */
export const templates: Template[] = [
  {
    template_id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, ATS-friendly single-column layout with clear sections',
    preview_image: '/templates/modern-preview.png',
    schema: {
      required_fields: ['identity', 'experience', 'education', 'skills'],
      sections: ['identity', 'summary', 'experience', 'education', 'skills', 'projects'],
    },
    slots: {
      header: 'name_email_phone_links',
      body: 'summary_experience_education_skills_projects',
    },
    constraints: {
      max_bullets: 5,
      max_chars_per_section: 2000,
      page_limit: 1,
    },
  },
  {
    template_id: 'academic',
    name: 'Academic Research',
    description: 'Two-column layout optimized for research positions with publications',
    preview_image: '/templates/academic-preview.png',
    schema: {
      required_fields: ['identity', 'education', 'publications', 'experience'],
      sections: ['identity', 'education', 'publications', 'experience', 'skills', 'projects'],
    },
    slots: {
      header: 'name_email_phone',
      sidebar: 'skills_education',
      body: 'publications_experience_projects',
    },
    constraints: {
      max_bullets: 6,
      page_limit: 2,
    },
  },
  {
    template_id: 'tech',
    name: 'Tech Engineer',
    description: 'Technical layout emphasizing projects and technical skills',
    preview_image: '/templates/tech-preview.png',
    schema: {
      required_fields: ['identity', 'skills', 'experience', 'projects'],
      sections: ['identity', 'summary', 'skills', 'experience', 'projects', 'education'],
    },
    slots: {
      header: 'name_contact_links',
      body: 'summary_skills_experience_projects_education',
    },
    constraints: {
      max_bullets: 4,
      page_limit: 1,
    },
  },
  {
    template_id: 'executive',
    name: 'Executive Summary',
    description: 'Professional layout for senior positions with leadership focus',
    preview_image: '/templates/executive-preview.png',
    schema: {
      required_fields: ['identity', 'summary', 'experience', 'education'],
      sections: ['identity', 'summary', 'experience', 'education', 'skills'],
    },
    slots: {
      header: 'name_title_contact',
      body: 'summary_experience_education_skills',
    },
    constraints: {
      max_bullets: 6,
      page_limit: 2,
    },
  },
  {
    template_id: 'minimal',
    name: 'Minimal Clean',
    description: 'Ultra-clean minimalist design, perfect for creative roles',
    preview_image: '/templates/minimal-preview.png',
    schema: {
      required_fields: ['identity', 'experience', 'education'],
      sections: ['identity', 'experience', 'education', 'skills', 'projects'],
    },
    slots: {
      header: 'name_contact',
      body: 'experience_education_skills_projects',
    },
    constraints: {
      max_bullets: 4,
      page_limit: 1,
    },
  },
  {
    template_id: 'creative',
    name: 'Creative Portfolio',
    description: 'Distinctive layout for designers and creative professionals',
    preview_image: '/templates/creative-preview.png',
    schema: {
      required_fields: ['identity', 'projects', 'experience', 'skills'],
      sections: ['identity', 'summary', 'projects', 'experience', 'skills', 'education'],
    },
    slots: {
      header: 'name_headline_contact',
      sidebar: 'skills',
      body: 'summary_projects_experience_education',
    },
    constraints: {
      max_bullets: 5,
      page_limit: 1,
    },
  },
];

/**
 * Render LaTeX for a given resume and template
 */
export function renderLatex(resume: Partial<Resume>, templateId: string): string {
  const template = templates.find(t => t.template_id === templateId);
  
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }

  switch (templateId) {
    case 'modern':
      return renderModernTemplate(resume);
    case 'academic':
      return renderAcademicTemplate(resume);
    case 'tech':
      return renderTechTemplate(resume);
    case 'executive':
      return renderExecutiveTemplate(resume);
    case 'minimal':
      return renderMinimalTemplate(resume);
    case 'creative':
      return renderCreativeTemplate(resume);
    default:
      return renderModernTemplate(resume);
  }
}

/**
 * Escape LaTeX special characters
 */
function escapeLatex(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[&%$#_{}]/g, '\\$&')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

/**
 * Modern Professional Template
 */
function renderModernTemplate(resume: Partial<Resume>): string {
  const identity = resume.identity;
  const experience = resume.experience || [];
  const education = resume.education || [];
  const skills = resume.skills;
  const projects = resume.projects || [];

  return `\\documentclass[11pt,letterpaper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{xcolor}

\\geometry{margin=0.75in}
\\setlist{nosep}
\\pagestyle{empty}

\\definecolor{primarycolor}{RGB}{0, 102, 204}

\\begin{document}

% Header
\\begin{center}
  {\\Huge\\bfseries ${escapeLatex(identity?.name || 'Your Name')}} \\\\[4pt]
  ${identity?.email || ''} ${identity?.phone ? `| ${escapeLatex(identity.phone)}` : ''} \\\\
  ${identity?.links?.map(link => `\\href{${link.url}}{${link.type}}`).join(' | ') || ''}
\\end{center}

\\vspace{10pt}

${resume.summary ? `
% Summary
\\section*{Professional Summary}
${escapeLatex(resume.summary)}

\\vspace{8pt}
` : ''}

% Experience
\\section*{Experience}
${experience.map(exp => `
\\textbf{${escapeLatex(exp.title)}} | \\textit{${escapeLatex(exp.company)}} \\hfill ${escapeLatex(exp.start_date)} -- ${escapeLatex(exp.end_date || 'Present')} \\\\
${exp.location ? `\\textit{${escapeLatex(exp.location)}} \\\\` : ''}
\\begin{itemize}[leftmargin=*]
${exp.bullets.map(bullet => `  \\item ${escapeLatex(bullet)}`).join('\n')}
\\end{itemize}
\\vspace{6pt}
`).join('\n')}

% Education
\\section*{Education}
${education.map(edu => `
\\textbf{${escapeLatex(edu.degree)}}${edu.field ? ` in ${escapeLatex(edu.field)}` : ''} \\hfill ${escapeLatex(edu.end_date || '')} \\\\
\\textit{${escapeLatex(edu.school)}}${edu.location ? `, ${escapeLatex(edu.location)}` : ''} \\\\
${edu.gpa ? `GPA: ${escapeLatex(edu.gpa)} \\\\` : ''}
\\vspace{4pt}
`).join('\n')}

${skills && (skills.languages.length > 0 || skills.frameworks.length > 0) ? `
% Skills
\\section*{Technical Skills}
${skills.languages.length > 0 ? `\\textbf{Languages:} ${skills.languages.map(escapeLatex).join(', ')} \\\\` : ''}
${skills.frameworks.length > 0 ? `\\textbf{Frameworks:} ${skills.frameworks.map(escapeLatex).join(', ')} \\\\` : ''}
${skills.gpu_graphics.length > 0 ? `\\textbf{GPU/Graphics:} ${skills.gpu_graphics.map(escapeLatex).join(', ')} \\\\` : ''}
${skills.systems_tools.length > 0 ? `\\textbf{Tools:} ${skills.systems_tools.map(escapeLatex).join(', ')} \\\\` : ''}
\\vspace{4pt}
` : ''}

${projects.length > 0 ? `
% Projects
\\section*{Projects}
${projects.map(proj => `
\\textbf{${escapeLatex(proj.name)}}${proj.one_liner ? ` -- ${escapeLatex(proj.one_liner)}` : ''} \\\\
${proj.tech.length > 0 ? `\\textit{${proj.tech.map(escapeLatex).join(', ')}} \\\\` : ''}
\\begin{itemize}[leftmargin=*]
${proj.bullets.map(bullet => `  \\item ${escapeLatex(bullet)}`).join('\n')}
\\end{itemize}
\\vspace{4pt}
`).join('\n')}
` : ''}

\\end{document}`;
}

/**
 * Academic Research Template
 */
function renderAcademicTemplate(resume: Partial<Resume>): string {
  const identity = resume.identity;
  const experience = resume.experience || [];
  const education = resume.education || [];
  const publications = resume.publications || [];
  const skills = resume.skills;

  return `\\documentclass[11pt,letterpaper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{multicol}

\\geometry{margin=0.75in}
\\setlist{nosep}
\\pagestyle{empty}

\\begin{document}

% Header
\\begin{center}
  {\\Huge\\bfseries ${escapeLatex(identity?.name || 'Your Name')}} \\\\[4pt]
  ${identity?.email || ''} | ${identity?.phone || ''} \\\\
\\end{center}

\\vspace{10pt}

% Education
\\section*{Education}
${education.map(edu => `
\\textbf{${escapeLatex(edu.degree)}}${edu.field ? ` in ${escapeLatex(edu.field)}` : ''} \\hfill ${escapeLatex(edu.end_date || '')} \\\\
${escapeLatex(edu.school)}${edu.location ? `, ${escapeLatex(edu.location)}` : ''} \\\\
\\vspace{4pt}
`).join('\n')}

${publications.length > 0 ? `
% Publications
\\section*{Publications}
\\begin{enumerate}[leftmargin=*]
${publications.map(pub => `
  \\item ${escapeLatex(pub.title)}, \\textit{${escapeLatex(pub.venue)}}, ${escapeLatex(pub.year)}
`).join('\n')}
\\end{enumerate}
\\vspace{6pt}
` : ''}

% Experience
\\section*{Research Experience}
${experience.map(exp => `
\\textbf{${escapeLatex(exp.title)}} | ${escapeLatex(exp.company)} \\hfill ${escapeLatex(exp.start_date)} -- ${escapeLatex(exp.end_date || 'Present')} \\\\
\\begin{itemize}[leftmargin=*]
${exp.bullets.map(bullet => `  \\item ${escapeLatex(bullet)}`).join('\n')}
\\end{itemize}
\\vspace{6pt}
`).join('\n')}

${skills ? `
% Skills
\\section*{Technical Skills}
${skills.languages.length > 0 ? `\\textbf{Languages:} ${skills.languages.map(escapeLatex).join(', ')} \\\\` : ''}
${skills.frameworks.length > 0 ? `\\textbf{Frameworks:} ${skills.frameworks.map(escapeLatex).join(', ')} \\\\` : ''}
` : ''}

\\end{document}`;
}

/**
 * Tech Engineer Template
 */
function renderTechTemplate(resume: Partial<Resume>): string {
  return renderModernTemplate(resume); // Similar to modern with different ordering
}

/**
 * Executive Template
 */
function renderExecutiveTemplate(resume: Partial<Resume>): string {
  return renderModernTemplate(resume);
}

/**
 * Minimal Template
 */
function renderMinimalTemplate(resume: Partial<Resume>): string {
  return renderModernTemplate(resume);
}

/**
 * Creative Portfolio Template
 */
function renderCreativeTemplate(resume: Partial<Resume>): string {
  return renderModernTemplate(resume);
}

/**
 * Get all available templates
 */
export function getTemplates(): Template[] {
  return templates;
}

/**
 * Get a single template by ID
 */
export function getTemplate(templateId: string): Template | undefined {
  return templates.find(t => t.template_id === templateId);
}
