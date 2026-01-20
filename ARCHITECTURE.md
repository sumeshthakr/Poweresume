# Architecture Overview

## System Architecture

Poweresume is built as a static web application optimized for GitHub Pages deployment, with optional backend services for advanced features.

### Core Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (Next.js)                     │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   Upload   │  │   Template   │  │   Job Parser    │ │
│  │   Parser   │  │   Renderer   │  │   & Analyzer    │ │
│  └────────────┘  └──────────────┘  └─────────────────┘ │
│                                                           │
│  ┌────────────────────────────────────────────────────┐ │
│  │          LaTeX Editor + PDF Preview                 │ │
│  │          (Monaco Editor + Live Compilation)         │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Optional Backend Services                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │   LaTeX      │  │   OpenAI     │  │   GitHub      │ │
│  │   Compiler   │  │   API        │  │   API         │ │
│  │   (Sandbox)  │  │   (AI)       │  │   (Projects)  │ │
│  └──────────────┘  └──────────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Resume Upload Flow
```
File Upload → Parser → Schema Validation → Structured Data → Review UI
   (PDF/LaTeX/DOCX)      ↓
                    Text Extraction
                         ↓
                    Pattern Matching
                         ↓
                    JSON Schema
```

### 2. Template Selection Flow
```
User Selection → Template Retrieval → Slot Mapping → LaTeX Generation
                                          ↓
                                    Resume Data
                                          ↓
                                    Constraints Check
                                          ↓
                                    Rendered LaTeX
```

### 3. Job Analysis Flow
```
Job URL/Text → Content Extraction → Requirements Parser → Relevance Analysis
                                          ↓
                                    Skills Extraction
                                          ↓
                                    Keyword Identification
                                          ↓
                                    Matching Algorithm
```

### 4. AI Tailoring Flow (Optional)
```
Resume + Job → OpenAI API → Tailoring Plan → Section Rewriting → Updated Resume
      ↓            ↓              ↓                  ↓
   Context      Prompt        Modifications      Fact Check
   Building     Engineering   w/ Rationale       & Validation
```

## Component Architecture

### Core Components

#### 1. FileUpload Component
- Handles drag-and-drop file upload
- Validates file types (PDF, .tex, .docx)
- Triggers appropriate parser based on file type
- Displays upload progress

#### 2. TemplateSelector Component
- Displays template gallery
- Shows template previews
- Allows template selection
- Displays template constraints

#### 3. JobInput Component
- Accepts job URL or pasted text
- Validates input format
- Triggers job parsing
- Displays parsed requirements

#### 4. LatexEditor Component
- Monaco editor integration
- LaTeX syntax highlighting
- Real-time validation
- Section-aware editing

#### 5. PDFPreview Component
- Displays compiled PDF
- Shows compilation errors
- Refresh on demand
- Page navigation

#### 6. ChatInterface Component
- AI interaction interface
- Command suggestions
- Change history
- Undo/redo support

## Data Models

### Resume Schema
```typescript
{
  identity: {
    name: string
    email: string
    phone?: string
    links: Link[]
  }
  skills: {
    languages: string[]
    frameworks: string[]
    gpu_graphics: string[]
    systems_tools: string[]
  }
  experience: Experience[]
  education: Education[]
  projects: Project[]
  publications: Publication[]
  metadata: {
    source_files: string[]
    extraction_confidence: number
  }
}
```

### Job Schema
```typescript
{
  role_title: string
  company?: string
  required_skills: string[]
  preferred_skills: string[]
  keywords: string[]
  signals: {
    research: boolean
    gpu: boolean
    graphics: boolean
    genai: boolean
  }
}
```

### Template Schema
```typescript
{
  template_id: string
  name: string
  description: string
  schema: {
    required_fields: string[]
    sections: string[]
  }
  slots: Record<string, string>
  constraints: {
    max_bullets?: number
    page_limit: number
  }
}
```

## Security Considerations

### LaTeX Compilation Security
- Run in isolated Docker containers
- No network access
- CPU and memory limits
- Timeout enforcement
- Allowlist of LaTeX packages
- Input sanitization

### Data Privacy
- Client-side processing by default
- No server-side storage without consent
- Encryption at rest
- Minimal logging
- GDPR compliance

### Input Validation
- Schema validation with Zod
- File type verification
- Size limits enforcement
- Content sanitization
- XSS prevention

## Deployment Architecture

### GitHub Pages Deployment
```
Source Code → Build Process → Static Files → GitHub Pages
     ↓             ↓               ↓              ↓
  TypeScript   Next.js Build     HTML/CSS      CDN
  React        Optimization      JavaScript    Distribution
```

### Optional Backend Services
- LaTeX Compilation: Docker + Lambda/Cloud Run
- AI Integration: OpenAI API or self-hosted LLM
- GitHub API: OAuth + REST API
- Storage: S3/CloudFlare R2 for user data

## Performance Optimization

### Build Optimization
- Static site generation
- Code splitting
- Tree shaking
- Image optimization
- Bundle analysis

### Runtime Optimization
- Lazy loading components
- Memoization
- Virtual scrolling
- Web Workers for parsing
- Service Worker for caching

## Scalability Considerations

### Current Limitations
- Client-side parsing (browser memory)
- No persistent storage
- Limited file sizes
- No real-time collaboration

### Future Enhancements
- Backend API for heavy processing
- Database for version history
- WebSocket for real-time updates
- CDN for asset delivery
- Load balancing for compilation service

## Technology Stack

### Frontend
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Monaco Editor**: Code editor component
- **Zod**: Schema validation
- **React Dropzone**: File upload

### Libraries
- **pdf-parse**: PDF text extraction
- **mammoth**: DOCX parsing
- **axios**: HTTP client
- **diff**: Change tracking

### Deployment
- **GitHub Actions**: CI/CD pipeline
- **GitHub Pages**: Static hosting
- **Vercel/Netlify**: Alternative hosting

### Optional Backend
- **Node.js/Python**: Backend runtime
- **Docker**: Containerization
- **LaTeX**: Document compilation
- **OpenAI API**: AI capabilities
- **PostgreSQL**: Data storage
