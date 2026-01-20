# Poweresume 🚀

AI-Powered Resume Tailor - Transform your resume with intelligent tailoring for any job posting.

## Features

- 📄 **Smart Resume Parsing** - Upload PDF, LaTeX, or DOCX resumes
- 🎨 **Professional Templates** - Choose from 12+ ATS-friendly LaTeX templates
- 🤖 **AI Optimization** - Intelligent resume tailoring based on job requirements
- ⚡ **Real-time Editing** - Live LaTeX editor with syntax highlighting
- 🔍 **Change Tracking** - Full diff view of all modifications
- 📦 **Multiple Exports** - Export to PDF, LaTeX source, and DOCX

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site for GitHub Pages
npm run export
```

Visit `http://localhost:3000` to see the app.

## Architecture

### Frontend
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Monaco Editor** for LaTeX editing
- **Zod** for schema validation

### Data Flow
1. Resume Upload → Parser → Structured Data
2. Template Selection → LaTeX Generation
3. Job Description → Requirements Analysis
4. AI Tailoring → Modified Resume
5. Real-time Editing → Live Preview
6. Export → PDF/LaTeX/DOCX

## Project Structure

```
Poweresume/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── editor/            # Main editor interface
│   └── templates/         # Template gallery
├── components/            # React components
│   ├── FileUpload.tsx
│   ├── TemplateSelector.tsx
│   ├── JobInput.tsx
│   ├── LatexEditor.tsx
│   ├── PDFPreview.tsx
│   └── ChatInterface.tsx
├── lib/                   # Core logic
│   ├── schemas.ts         # Zod schemas
│   ├── parsers.ts         # Resume parsers
│   ├── templates.ts       # LaTeX templates
│   └── jobParser.ts       # Job description parser
└── public/                # Static assets

```

## Core Components

### Resume Parser
Extracts structured data from PDF, LaTeX, and DOCX files:
- Contact information
- Work experience
- Education
- Skills
- Projects
- Publications

### Template System
Professional LaTeX templates with:
- Configurable layouts
- ATS-friendly formatting
- Constraint-based rendering
- Slot mapping system

### Job Analyzer
Analyzes job postings to extract:
- Required skills
- Preferred qualifications
- Keywords for ATS
- Relevance mapping

## Data Schemas

### Resume Schema
```typescript
{
  identity: { name, email, phone, links },
  skills: { languages, frameworks, tools },
  experience: [{ company, title, dates, bullets }],
  education: [{ school, degree, dates }],
  projects: [{ name, description, tech }]
}
```

### Job Schema
```typescript
{
  role_title: string,
  required_skills: string[],
  preferred_skills: string[],
  keywords: string[],
  signals: { research, gpu, graphics, genai }
}
```

## LaTeX Templates

Available templates:
1. **Modern Professional** - Clean single-column layout
2. **Academic Research** - Two-column with publications
3. **Tech Engineer** - Technical skills emphasis
4. **Executive** - Leadership-focused layout
5. **Minimal Clean** - Ultra-clean design
6. **Creative Portfolio** - Distinctive creative layout

## Features Roadmap

### Phase 1: MVP ✅
- [x] Resume parsing (PDF/LaTeX/DOCX)
- [x] Template library
- [x] LaTeX editor
- [x] Basic job analysis
- [x] Static site deployment

### Phase 2: AI Integration
- [ ] OpenAI API integration
- [ ] Intelligent tailoring
- [ ] Chat-based editing
- [ ] Bullet rewriting
- [ ] Change tracking with diffs

### Phase 3: Advanced Features
- [ ] LaTeX compilation service
- [ ] Live PDF preview
- [ ] GitHub enrichment
- [ ] Project extraction
- [ ] Version history

### Phase 4: Backend Services
- [ ] Authentication (OAuth)
- [ ] Cloud storage
- [ ] Collaboration features
- [ ] Payment integration

## Security & Privacy

- **Client-side Processing** - Resume parsing happens in the browser
- **No Data Storage** - Data only stored locally in browser
- **LaTeX Sandboxing** - Compilation in isolated Docker containers
- **No Fabrication** - AI never invents facts or experiences
- **Audit Trail** - All changes tracked with rationale

## Deployment

### GitHub Pages
The app is configured for static export to GitHub Pages:

```bash
npm run build
```

This generates a static site in the `out/` directory.

### Environment Variables
```env
NEXT_PUBLIC_OPENAI_API_KEY=your_key_here  # Optional for AI features
```

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Next.js team for the amazing framework
- LaTeX community for template inspiration
- OpenAI for AI capabilities
- All contributors and users

---

Built with ❤️ by the Poweresume team