import { z } from 'zod';

// Identity Schema
export const IdentitySchema = z.object({
  name: z.string(),
  headline: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  links: z.array(z.object({
    type: z.enum(['linkedin', 'github', 'portfolio', 'other']),
    url: z.string().url(),
  })).default([]),
});

// Skills Schema
export const SkillsSchema = z.object({
  languages: z.array(z.string()).default([]),
  frameworks: z.array(z.string()).default([]),
  gpu_graphics: z.array(z.string()).default([]),
  systems_tools: z.array(z.string()).default([]),
});

// Experience Schema
export const ExperienceSchema = z.object({
  company: z.string(),
  title: z.string(),
  location: z.string().optional(),
  start_date: z.string(),
  end_date: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  tech: z.array(z.string()).default([]),
});

// Education Schema
export const EducationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  location: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  gpa: z.string().optional(),
});

// Project Schema
export const ProjectSchema = z.object({
  name: z.string(),
  one_liner: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  tech: z.array(z.string()).default([]),
  links: z.array(z.string()).default([]),
});

// Publication Schema
export const PublicationSchema = z.object({
  title: z.string(),
  venue: z.string(),
  year: z.string(),
  links: z.array(z.string()).default([]),
});

// Resume Schema
export const ResumeSchema = z.object({
  identity: IdentitySchema,
  summary: z.string().optional(),
  skills: SkillsSchema,
  experience: z.array(ExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  publications: z.array(PublicationSchema).default([]),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string().optional(),
  })).default([]),
  metadata: z.object({
    source_files: z.array(z.string()).default([]),
    extraction_confidence: z.number().min(0).max(1).default(0),
  }),
});

// Job Schema
export const JobSchema = z.object({
  company: z.string().optional(),
  role_title: z.string(),
  level: z.string().optional(),
  location: z.string().optional(),
  visa_constraints: z.string().optional(),
  responsibilities: z.array(z.string()).default([]),
  required_skills: z.array(z.string()).default([]),
  preferred_skills: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  signals: z.object({
    research: z.boolean().default(false),
    gpu: z.boolean().default(false),
    graphics: z.boolean().default(false),
    genai: z.boolean().default(false),
  }).optional(),
});

// Tailor Plan Schema
export const TailorPlanSchema = z.object({
  target_role_headline: z.string(),
  emphasis: z.object({
    skills: z.array(z.string()).default([]),
    experiences: z.array(z.number()).default([]),
    projects: z.array(z.number()).default([]),
  }),
  pruning: z.object({
    experiences: z.array(z.number()).default([]),
    bullets_to_remove: z.array(z.string()).default([]),
  }),
  keyword_insertion: z.object({
    terms: z.array(z.string()).default([]),
    where_to_place: z.array(z.string()).default([]),
  }),
  constraints: z.object({
    page_limit: z.number().default(1),
    bullet_limits_by_section: z.record(z.string(), z.number()).default({}),
  }),
  open_questions: z.array(z.string()).default([]),
});

// Template Schema
export const TemplateSchema = z.object({
  template_id: z.string(),
  name: z.string(),
  description: z.string(),
  preview_image: z.string().optional(),
  schema: z.object({
    required_fields: z.array(z.string()).default([]),
    sections: z.array(z.string()).default([]),
  }),
  slots: z.record(z.string(), z.string()),
  constraints: z.object({
    max_bullets: z.number().optional(),
    max_chars_per_section: z.number().optional(),
    page_limit: z.number().default(1),
  }),
});

// Export types
export type Identity = z.infer<typeof IdentitySchema>;
export type Skills = z.infer<typeof SkillsSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Resume = z.infer<typeof ResumeSchema>;
export type Job = z.infer<typeof JobSchema>;
export type TailorPlan = z.infer<typeof TailorPlanSchema>;
export type Template = z.infer<typeof TemplateSchema>;
