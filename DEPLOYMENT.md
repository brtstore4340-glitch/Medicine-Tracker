# Deployment Guide - GitHub Pages

This guide will help you deploy the Medicine Tracker application to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer
- Your Firebase and Gemini API keys ready

## Deployed URL

Once deployed, your app will be available at:
```
https://brtstore4340-glitch.github.io/Medicine-Tracker/
```

## Step 1: Push Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
cd C:\Users\User\.gemini\antigravity\scratch\medicine-tracker
git init
git add .
git commit -m "Initial commit - Medicine Tracker app"
git branch -M main
git remote add origin https://github.com/brtstore4340-glitch/Medicine-Tracker.git
git push -u origin main
```

## Step 2: Configure GitHub Secrets

Your environment variables (API keys) need to be added as GitHub Secrets:

1. Go to your repository: `https://github.com/brtstore4340-glitch/Medicine-Tracker`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of the following:

| Secret Name | Value (from your `.env` file) |
|-------------|-------------------------------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Your Firebase App ID |
| `VITE_GEMINI_API_KEY` | Your Gemini API Key |

> **Important**: Never commit your `.env` file to GitHub. The secrets are used during the build process.

## Step 3: Enable GitHub Pages

1. Go to **Settings** → **Pages** in your repository
2. Under **Source**, select **GitHub Actions**
3. Save the settings

## Step 4: Deploy

The deployment is automatic! Every time you push to the `main` branch, GitHub Actions will:
- Install dependencies
- Build your app with the environment variables
- Deploy to GitHub Pages

To trigger the first deployment:

```bash
git push origin main
```

Or manually trigger from GitHub:
1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## Step 5: Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You'll see the workflow running
3. Wait for both "build" and "deploy" jobs to complete (usually 2-3 minutes)
4. Once complete, visit: `https://brtstore4340-glitch.github.io/Medicine-Tracker/`

## Troubleshooting

### Build fails in GitHub Actions

- **Check Secrets**: Ensure all 7 secrets are correctly added in GitHub Settings
- **Check Logs**: Click on the failed workflow in Actions tab to see error details
- **Branch Name**: Ensure you're pushing to `main` branch

### App loads but features don't work

- **Firebase Rules**: Check your Firebase Security Rules allow read/write
- **API Keys**: Verify all secrets are correctly configured
- **Console Errors**: Open browser DevTools (F12) and check for errors

### 404 Error when accessing the app

- **Wait**: GitHub Pages can take 5-10 minutes for first deployment
- **Check Settings**: Verify GitHub Pages is enabled and set to GitHub Actions
- **Clear Cache**: Try clearing browser cache or incognito mode

### Changes not reflecting

- **Check Workflow**: Ensure GitHub Actions workflow completed successfully
- **Force Refresh**: Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
- **Wait**: Give it a few minutes for CDN to update

## Making Updates

After the initial deployment, any changes you push to `main` will automatically deploy:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

## Local Testing Before Deploy

Always test your build locally before deploying:

```bash
# Build the production version
npm run build

# Preview the production build
npm run preview
```

Visit the preview URL (usually `http://localhost:4173`) to test.

## Security Notes

- Your Firebase and Gemini API keys will be embedded in the built JavaScript
- Use Firebase Security Rules to protect your database
- Consider implementing Firebase App Check for additional security
- Monitor your API usage in Firebase and Google Cloud Console

## Support

If you encounter issues:
1. Check the GitHub Actions logs for build errors
2. Verify all environment variables are correctly set
3. Test the build locally with `npm run build`
4. Check browser console for runtime errors
