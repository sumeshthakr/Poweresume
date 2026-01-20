# Security Policy

## Supported Versions

Currently supporting:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **Do NOT** open a public issue
2. Email security details to: security@poweresume.com (or repository maintainer)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to resolve the issue.

## Security Measures

### Client-Side Security

1. **Input Validation**
   - All user inputs validated with Zod schemas
   - File type and size verification
   - Content sanitization

2. **XSS Prevention**
   - React's built-in XSS protection
   - Sanitized user-generated content
   - Content Security Policy headers

3. **Data Privacy**
   - Client-side processing by default
   - No automatic data transmission
   - Local storage only

### LaTeX Compilation Security (When Implemented)

1. **Sandboxing**
   - Docker container isolation
   - No network access
   - Read-only file system
   - Limited system calls

2. **Resource Limits**
   - CPU time limits (30 seconds)
   - Memory limits (2GB)
   - File size limits (10MB)
   - Process limits

3. **Input Sanitization**
   - LaTeX special character escaping
   - Package allowlist
   - Command filtering
   - Path traversal prevention

4. **Allowlisted LaTeX Packages**
   ```
   geometry, inputenc, fontenc, hyperref,
   enumitem, xcolor, graphicx, amsmath
   ```

5. **Blocked LaTeX Commands**
   ```latex
   \write18
   \input
   \include
   \openin
   \openout
   ```

### API Security (Future)

1. **Authentication**
   - JWT-based authentication
   - OAuth 2.0 support
   - API key rotation

2. **Rate Limiting**
   - IP-based rate limiting
   - User-based rate limiting
   - Endpoint-specific limits

3. **Data Protection**
   - Encryption at rest (AES-256)
   - Encryption in transit (TLS 1.3)
   - Secure key management

## Known Security Considerations

### Current Limitations

1. **Client-Side Processing**
   - Large files may cause browser memory issues
   - No server-side validation backup
   - Limited file size handling

2. **PDF Parsing**
   - Uses pdf-parse library (not sandboxed)
   - Potential for malicious PDFs
   - Limited error handling

3. **LaTeX Rendering**
   - Currently no server-side compilation
   - Export features limited
   - Manual compilation required

### Mitigation Strategies

1. **File Size Limits**
   - Enforce 10MB maximum file size
   - Display warnings for large files
   - Implement chunked processing

2. **Error Handling**
   - Graceful degradation
   - User-friendly error messages
   - Detailed logging (development only)

3. **User Education**
   - Clear privacy policy
   - Data handling transparency
   - Security best practices guide

## Dependency Security

### Automated Scanning

- GitHub Dependabot enabled
- npm audit on every build
- Regular dependency updates

### Critical Dependencies

Monitor these for security updates:
- next
- react
- pdf-parse
- mammoth
- monaco-editor

## Incident Response

### Response Timeline

1. **0-2 hours**: Acknowledge receipt
2. **2-24 hours**: Initial assessment
3. **24-48 hours**: Fix development
4. **48-72 hours**: Testing and deployment

### Communication

- Security advisories on GitHub
- Email notifications to users (if applicable)
- Detailed post-mortem report

## Best Practices for Users

1. **File Handling**
   - Only upload files from trusted sources
   - Review extracted data before proceeding
   - Don't upload sensitive information

2. **Job Descriptions**
   - Paste text instead of using URLs when possible
   - Review parsed data for accuracy
   - Don't include personal information

3. **API Keys (Future)**
   - Keep API keys secure
   - Don't commit keys to version control
   - Rotate keys regularly
   - Use environment variables

4. **Browser Security**
   - Keep browser updated
   - Use secure connection (HTTPS)
   - Clear browser data regularly

## Security Checklist for Contributors

- [ ] All inputs validated
- [ ] No hardcoded secrets
- [ ] Dependencies up to date
- [ ] Tests include security scenarios
- [ ] Documentation updated
- [ ] Code review completed

## Contact

For security concerns:
- Email: security@poweresume.com
- GitHub: Open a private security advisory

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who help improve our security.
