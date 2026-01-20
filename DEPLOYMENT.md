# Deployment Guide

## GitHub Pages Deployment

### Prerequisites
- GitHub repository with Pages enabled
- Node.js 20+ installed locally
- Git configured

### Steps

1. **Build the application:**
```bash
npm install
npm run build
```

This creates an optimized static site in the `out/` directory.

2. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The `.github/workflows/deploy.yml` workflow will automatically deploy on push to `main`

3. **Push to main branch:**
```bash
git push origin main
```

The GitHub Action will:
- Install dependencies
- Build the application
- Deploy to GitHub Pages
- Site will be available at: `https://sumeshthakr.github.io/Poweresume/`

### Manual Deployment

If you prefer manual deployment:

```bash
# Build
npm run build

# The out/ directory contains all static files
# Deploy these files to any static hosting service
```

## Alternative Hosting Options

### Vercel (Recommended for development)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

### Docker Deployment

1. **Build Docker image:**
```bash
docker build -t poweresume .
```

2. **Run container:**
```bash
docker run -p 3000:3000 poweresume
```

3. **Or use Docker Compose:**
```bash
docker-compose up
```

## Environment Variables

For production deployment with backend services, set these environment variables:

```env
# Optional: OpenAI API for AI features
NEXT_PUBLIC_OPENAI_API_KEY=your_key_here

# Optional: GitHub OAuth for enrichment
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

# Optional: Backend API URL
NEXT_PUBLIC_API_URL=https://api.yourbackend.com
```

## Performance Optimization

### Build Optimization
- Static site generation (already configured)
- Image optimization disabled for GitHub Pages compatibility
- Code splitting enabled
- Tree shaking enabled

### CDN Configuration
GitHub Pages automatically uses CDN. For other hosts:
- Enable CDN for `/_next/static/` directory
- Cache static assets with long TTL
- Enable compression (gzip/brotli)

## Monitoring

### GitHub Pages
- Check deployment status in Actions tab
- Monitor uptime using status page

### Custom Monitoring (Optional)
- Google Analytics
- Sentry for error tracking
- LogRocket for session replay

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Pages Not Updating
- Check GitHub Actions logs
- Verify `out/` directory was created
- Clear browser cache

### 404 Errors
- Verify `basePath` in `next.config.js` matches repository name
- Check file paths in deployment

## Scaling

### Current Setup
- Static files on CDN
- No server-side processing
- Scales automatically with CDN

### Adding Backend Services

For advanced features (LaTeX compilation, AI tailoring):

1. **Deploy backend separately:**
   - AWS Lambda / Cloud Functions
   - Heroku / Railway
   - DigitalOcean App Platform

2. **Update frontend:**
```typescript
// Set API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.poweresume.com';
```

3. **Configure CORS:**
```javascript
// Backend CORS config
app.use(cors({
  origin: 'https://sumeshthakr.github.io',
  credentials: true
}));
```

## Custom Domain (Optional)

### GitHub Pages with Custom Domain

1. Add CNAME file to `public/` directory:
```
poweresume.com
```

2. Configure DNS:
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Name: www
Value: sumeshthakr.github.io
```

3. Enable HTTPS in repository settings

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix vulnerabilities
npm audit fix
```

### Monitoring Checklist
- [ ] Check build status weekly
- [ ] Review GitHub Actions logs
- [ ] Monitor dependency updates
- [ ] Test critical paths monthly
- [ ] Review security advisories

## Rollback

If deployment fails:

1. **Via GitHub:**
   - Go to Actions → Failed workflow
   - Click "Re-run all jobs"

2. **Manual rollback:**
```bash
git revert HEAD
git push origin main
```

## Support

For deployment issues:
- Check logs in GitHub Actions
- Review DEPLOYMENT.md
- Open issue on GitHub
- Contact: deploy@poweresume.com
