# Contributing to Poweresume

Thank you for your interest in contributing to Poweresume! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful, inclusive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. Check existing issues first
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (browser, OS)

### Suggesting Features

1. Check if feature already requested
2. Create a feature request with:
   - Clear use case
   - Expected behavior
   - Mockups or examples (if applicable)

### Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Update documentation
6. Submit PR with clear description

## Development Setup

### Prerequisites

- Node.js 20+
- npm or yarn
- Git

### Setup Steps

```bash
# Clone repository
git clone https://github.com/sumeshthakr/Poweresume.git
cd Poweresume

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up

# Or build manually
docker build -t poweresume .
docker run -p 3000:3000 poweresume
```

## Project Structure

```
Poweresume/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── editor/            # Editor page
│   └── templates/         # Templates page
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
│   └── jobParser.ts       # Job parser
├── public/                # Static assets
└── docs/                  # Documentation
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for props
- Avoid `any` type
- Use strict mode

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Bad
function Button(props: any) { }
```

### React

- Use functional components
- Use hooks instead of classes
- Follow React naming conventions
- Extract reusable logic

```typescript
// Good
export default function Component() {
  const [state, setState] = useState();
  return <div />;
}
```

### Styling

- Use Tailwind CSS utilities
- Follow mobile-first approach
- Maintain consistent spacing
- Use design system colors

```tsx
// Good
<div className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
```

### File Organization

- One component per file
- Co-locate related files
- Use index files for exports
- Keep files under 300 lines

## Testing Guidelines

### Unit Tests

```typescript
import { parseResume } from '@/lib/parsers';

describe('parseResume', () => {
  it('should extract name from PDF', async () => {
    const file = new File(['...'], 'resume.pdf');
    const result = await parseResume(file);
    expect(result.identity.name).toBeTruthy();
  });
});
```

### Component Tests

```typescript
import { render, screen } from '@testing-library/react';
import FileUpload from '@/components/FileUpload';

test('renders upload area', () => {
  render(<FileUpload onFileUpload={jest.fn()} />);
  expect(screen.getByText(/drag and drop/i)).toBeInTheDocument();
});
```

## Documentation

- Update README for major changes
- Add JSDoc comments for functions
- Update API.md for new APIs
- Include examples in docs

```typescript
/**
 * Parses uploaded resume file
 * @param file - Resume file (PDF, LaTeX, or DOCX)
 * @returns Structured resume data
 * @throws {Error} If file type is unsupported
 */
export async function parseResume(file: File): Promise<Resume> {
  // ...
}
```

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat(parser): add LaTeX resume parsing

Implement LaTeX parser with section detection and
structured data extraction.

Closes #123
```

## Adding New Templates

### 1. Define Template Schema

```typescript
// lib/templates.ts
{
  template_id: 'your-template',
  name: 'Your Template Name',
  description: 'Brief description',
  schema: {
    required_fields: ['identity', 'experience'],
    sections: ['header', 'experience', 'education']
  },
  slots: {
    header: 'name_contact',
    body: 'experience_education'
  },
  constraints: {
    max_bullets: 5,
    page_limit: 1
  }
}
```

### 2. Implement Renderer

```typescript
function renderYourTemplate(resume: Partial<Resume>): string {
  return `
    \\documentclass{article}
    % Your LaTeX template
  `;
}
```

### 3. Add Preview Image

- Create preview in `public/templates/`
- Use 850x1100px PNG
- Name: `{template-id}-preview.png`

### 4. Update Tests

```typescript
test('renders your template', () => {
  const latex = renderLatex(sampleResume, 'your-template');
  expect(latex).toContain('\\documentclass');
});
```

## Adding New Parsers

### 1. Implement Parser Function

```typescript
export async function parseNewFormat(file: File): Promise<Partial<Resume>> {
  // Implementation
}
```

### 2. Update Main Parser

```typescript
// lib/parsers.ts
case 'newext':
  return parseNewFormat(file);
```

### 3. Add File Type Support

```typescript
// components/FileUpload.tsx
accept: {
  'application/newtype': ['.newext']
}
```

### 4. Add Tests

```typescript
test('parses new format', async () => {
  const file = new File(['...'], 'resume.newext');
  const result = await parseResume(file);
  expect(result).toBeDefined();
});
```

## Performance Guidelines

- Lazy load heavy components
- Use React.memo for expensive renders
- Debounce user inputs
- Optimize images
- Code split large bundles

```typescript
// Good
const LatexEditor = lazy(() => import('@/components/LatexEditor'));

const MemoizedComponent = memo(ExpensiveComponent);

const debouncedSearch = debounce(handleSearch, 300);
```

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Support keyboard navigation
- Ensure color contrast
- Test with screen readers

```tsx
<button
  aria-label="Upload resume"
  className="..."
  onClick={handleClick}
>
  Upload
</button>
```

## Security

- Validate all inputs
- Sanitize user content
- Escape LaTeX special chars
- Use environment variables
- Never commit secrets

```typescript
// Good
const escaped = escapeLatex(userInput);

// Bad
const latex = `\\section{${userInput}}`;
```

## Review Process

1. Self-review checklist:
   - [ ] Code follows style guide
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No console errors
   - [ ] Accessibility checked

2. Create pull request:
   - Clear title and description
   - Link related issues
   - Add screenshots
   - Request reviewers

3. Address feedback:
   - Respond to comments
   - Make requested changes
   - Update PR description

4. Merge:
   - Squash commits (if requested)
   - Delete branch after merge

## Questions?

- Open a discussion on GitHub
- Join our Discord (coming soon)
- Email: contribute@poweresume.com

Thank you for contributing! 🎉
