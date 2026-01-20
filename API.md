# API Documentation

## Client-Side APIs

### Resume Parser API

#### `parseResume(file: File): Promise<Partial<Resume>>`

Parses uploaded resume files and extracts structured data.

**Parameters:**
- `file`: File object (PDF, .tex, or .docx)

**Returns:**
- Promise resolving to partial Resume object

**Example:**
```typescript
import { parseResume } from '@/lib/parsers';

const file = event.target.files[0];
const resume = await parseResume(file);
console.log(resume.identity.name);
```

---

#### `parsePDFResume(file: File): Promise<Partial<Resume>>`

Specifically parses PDF files.

**Parameters:**
- `file`: PDF File object

**Returns:**
- Promise resolving to partial Resume object

---

#### `parseLatexResume(file: File): Promise<Partial<Resume>>`

Parses LaTeX (.tex) files.

**Parameters:**
- `file`: LaTeX File object

**Returns:**
- Promise resolving to partial Resume object

---

#### `parseDOCXResume(file: File): Promise<Partial<Resume>>`

Parses DOCX files.

**Parameters:**
- `file`: DOCX File object

**Returns:**
- Promise resolving to partial Resume object

---

### Job Parser API

#### `parseJob(urlOrText: string): Promise<Partial<Job>>`

Parses job description from URL or text.

**Parameters:**
- `urlOrText`: Job posting URL or pasted text

**Returns:**
- Promise resolving to partial Job object

**Example:**
```typescript
import { parseJob } from '@/lib/jobParser';

const jobText = "Senior Software Engineer...";
const job = await parseJob(jobText);
console.log(job.required_skills);
```

---

#### `analyzeRelevance(resume: any, job: Partial<Job>): RelevanceMap`

Analyzes how well a resume matches a job posting.

**Parameters:**
- `resume`: Resume object
- `job`: Job object

**Returns:**
- RelevanceMap object with matching/missing skills

**Example:**
```typescript
import { analyzeRelevance } from '@/lib/jobParser';

const relevance = analyzeRelevance(resume, job);
console.log(relevance.matching_skills);
console.log(relevance.missing_skills);
```

---

### Template API

#### `renderLatex(resume: Partial<Resume>, templateId: string): string`

Generates LaTeX code from resume data and template.

**Parameters:**
- `resume`: Resume object
- `templateId`: Template identifier (e.g., 'modern', 'academic')

**Returns:**
- LaTeX source code as string

**Example:**
```typescript
import { renderLatex } from '@/lib/templates';

const latex = renderLatex(resume, 'modern');
console.log(latex);
```

---

#### `getTemplates(): Template[]`

Retrieves all available templates.

**Returns:**
- Array of Template objects

**Example:**
```typescript
import { getTemplates } from '@/lib/templates';

const templates = getTemplates();
templates.forEach(t => console.log(t.name));
```

---

#### `getTemplate(templateId: string): Template | undefined`

Retrieves a specific template by ID.

**Parameters:**
- `templateId`: Template identifier

**Returns:**
- Template object or undefined

**Example:**
```typescript
import { getTemplate } from '@/lib/templates';

const template = getTemplate('modern');
if (template) {
  console.log(template.description);
}
```

---

## Schema Validation

### Resume Schema

```typescript
import { ResumeSchema } from '@/lib/schemas';

// Validate resume data
const result = ResumeSchema.safeParse(resumeData);
if (result.success) {
  const validResume = result.data;
} else {
  console.error(result.error);
}
```

### Job Schema

```typescript
import { JobSchema } from '@/lib/schemas';

// Validate job data
const result = JobSchema.safeParse(jobData);
if (result.success) {
  const validJob = result.data;
}
```

## Component Props

### FileUpload Component

```typescript
interface FileUploadProps {
  onFileUpload: (file: File) => void;
}
```

**Usage:**
```tsx
<FileUpload onFileUpload={handleFileUpload} />
```

---

### TemplateSelector Component

```typescript
interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void;
  selectedTemplate: string;
}
```

**Usage:**
```tsx
<TemplateSelector
  onTemplateSelect={handleTemplateSelect}
  selectedTemplate="modern"
/>
```

---

### JobInput Component

```typescript
interface JobInputProps {
  onJobSubmit: (jobText: string) => void;
}
```

**Usage:**
```tsx
<JobInput onJobSubmit={handleJobSubmit} />
```

---

### LatexEditor Component

```typescript
interface LatexEditorProps {
  value: string;
  onChange: (value: string) => void;
}
```

**Usage:**
```tsx
<LatexEditor
  value={latexCode}
  onChange={handleLatexChange}
/>
```

---

### PDFPreview Component

```typescript
interface PDFPreviewProps {
  latexCode: string;
}
```

**Usage:**
```tsx
<PDFPreview latexCode={latexCode} />
```

---

### ChatInterface Component

```typescript
interface ChatInterfaceProps {
  resume: Partial<Resume> | null;
  job: Partial<Job> | null;
  onLatexUpdate: (latex: string) => void;
}
```

**Usage:**
```tsx
<ChatInterface
  resume={resume}
  job={job}
  onLatexUpdate={handleLatexUpdate}
/>
```

---

## Future Backend API (Planned)

### LaTeX Compilation Service

#### `POST /api/compile`

Compiles LaTeX to PDF.

**Request:**
```json
{
  "latex": "\\documentclass{article}...",
  "timeout": 30
}
```

**Response:**
```json
{
  "success": true,
  "pdf_url": "https://...",
  "compilation_time": 2.3
}
```

---

### AI Tailoring Service

#### `POST /api/tailor`

Generates tailored resume using AI.

**Request:**
```json
{
  "resume": {...},
  "job": {...},
  "preferences": {
    "page_limit": 1,
    "emphasis": ["technical", "leadership"]
  }
}
```

**Response:**
```json
{
  "tailored_resume": {...},
  "changes": [...],
  "rationale": "..."
}
```

---

### GitHub Enrichment Service

#### `POST /api/github/enrich`

Fetches GitHub projects and READMEs.

**Request:**
```json
{
  "github_url": "https://github.com/username",
  "max_projects": 5
}
```

**Response:**
```json
{
  "projects": [
    {
      "name": "...",
      "description": "...",
      "tech_stack": [...],
      "stars": 100
    }
  ]
}
```

---

## Error Handling

All APIs follow a consistent error handling pattern:

```typescript
try {
  const result = await parseResume(file);
  // Handle success
} catch (error) {
  console.error('Parse error:', error);
  // Handle error
}
```

Common error types:
- `ParseError`: File parsing failed
- `ValidationError`: Schema validation failed
- `NetworkError`: API request failed
- `TimeoutError`: Operation timed out

---

## Rate Limiting (Future)

Backend APIs will implement rate limiting:

```
GET /api/*          100 requests/minute
POST /api/compile   10 requests/minute
POST /api/tailor    20 requests/minute
```

---

## Authentication (Future)

Protected endpoints will require authentication:

```typescript
fetch('/api/tailor', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```
