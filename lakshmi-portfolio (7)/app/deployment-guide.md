# 🚀 GitHub Pages Deployment Guide

## Step 1: Repository Setup

1. **Create a new repository** on GitHub:
   - Repository name: `lakshmiresume` (or your preferred name)
   - Make it public
   - Initialize with README

2. **Clone and upload your code**:
   \`\`\`bash
   git clone https://github.com/yourusername/lakshmiresume.git
   cd lakshmiresume
   # Copy all your portfolio files here
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   \`\`\`

## Step 2: Configure Repository Settings

1. **Update next.config.mjs**:
   - Change `basePath` and `assetPrefix` to match your repository name
   - If your repo is `lakshmiresume`, keep the current settings
   - If different, update both values to `/your-repo-name`

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "GitHub Actions"

## Step 3: Environment Variables

1. **Add Google Analytics ID**:
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: Your Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`)

2. **Get Google Analytics ID**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property for your portfolio
   - Copy the Measurement ID from Admin → Data Streams

## Step 4: Deploy

1. **Automatic Deployment**:
   - Push any changes to the main branch
   - GitHub Actions will automatically build and deploy
   - Check the "Actions" tab to monitor deployment progress

2. **Manual Deployment** (if needed):
   - Go to Actions tab
   - Click "Deploy Portfolio to GitHub Pages"
   - Click "Run workflow"

## Step 5: Access Your Portfolio

Your portfolio will be available at:
`https://yourusername.github.io/lakshmiresume`

## Troubleshooting

### Common Issues:

1. **404 Error**: Check that `basePath` in `next.config.mjs` matches your repository name

2. **Images not loading**: Ensure all image paths are relative and start with `/`

3. **Build fails**: Check the Actions tab for error details

4. **Analytics not working**: Verify the `NEXT_PUBLIC_GA_ID` environment variable is set

### Build Status:
- ✅ Green checkmark = Successful deployment
- ❌ Red X = Build failed (check logs)
- 🟡 Yellow dot = Build in progress

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Update the `assetPrefix` in `next.config.mjs` to your domain

## Performance Monitoring

The portfolio includes Google Analytics to track:
- Page views and user engagement
- Project and blog interactions
- Resume downloads
- Contact form submissions
- Chatbot usage

Access your analytics at: https://analytics.google.com/
