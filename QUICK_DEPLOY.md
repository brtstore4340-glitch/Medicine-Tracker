# Quick Deploy Guide - GitHub Web Interface

Since Git is not available in your PowerShell, I'll guide you through deploying using GitHub's web interface.

## Option 1: Upload via GitHub Web Interface (Simplest)

### Step 1: Go to Your Repository
Visit: https://github.com/brtstore4340-glitch/Medicine-Tracker

### Step 2: Upload All Files

1. Click **"Add file"** → **"Upload files"**
2. Drag and drop ALL files from: `C:\Users\User\.gemini\antigravity\scratch\medicine-tracker`
3. **Important**: Make sure to upload:
   - `.github/workflows/deploy.yml` (the workflow file)
   - `vite.config.js` (updated with base path)
   - `DEPLOYMENT.md` (documentation)
   - `.agent/workflows/deploy.md` (workflow guide)
   - All other project files (src, public, package.json, etc.)
   
4. **DO NOT upload**:
   - `node_modules/` folder
   - `dist/` folder
   - `.env` file (NEVER upload this!)

5. Write commit message: "Add GitHub Pages deployment configuration"
6. Click **"Commit changes"**

### Step 3: Add GitHub Secrets

1. Go to: **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"** button
3. Add each secret (7 total) - copy values from your `.env` file:

**Open your `.env` file here:**
```
C:\Users\User\.gemini\antigravity\scratch\medicine-tracker\.env
```

Then add these secrets one by one:

| Click "New repository secret" | Name | Value from .env |
|-------------------------------|------|-----------------|
| 1st secret | `VITE_FIREBASE_API_KEY` | Copy from VITE_FIREBASE_API_KEY= |
| 2nd secret | `VITE_FIREBASE_AUTH_DOMAIN` | Copy from VITE_FIREBASE_AUTH_DOMAIN= |
| 3rd secret | `VITE_FIREBASE_PROJECT_ID` | Copy from VITE_FIREBASE_PROJECT_ID= |
| 4th secret | `VITE_FIREBASE_STORAGE_BUCKET` | Copy from VITE_FIREBASE_STORAGE_BUCKET= |
| 5th secret | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Copy from VITE_FIREBASE_MESSAGING_SENDER_ID= |
| 6th secret | `VITE_FIREBASE_APP_ID` | Copy from VITE_FIREBASE_APP_ID= |
| 7th secret | `VITE_GEMINI_API_KEY` | Copy from VITE_GEMINI_API_KEY= |

### Step 4: Enable GitHub Pages

1. Go to: **Settings** → **Pages**
2. Under **"Source"**, select: **GitHub Actions**
3. Save

### Step 5: Trigger Deployment

The workflow should automatically run after you upload files. To verify:

1. Go to **Actions** tab
2. You should see **"Deploy to GitHub Pages"** workflow running
3. Wait 2-3 minutes for it to complete

If it doesn't start automatically:
1. Click **"Deploy to GitHub Pages"** in the Actions list
2. Click **"Run workflow"** → **"Run workflow"**

### Step 6: Access Your App! 🎉

Once the workflow shows ✅ success, visit:

```
https://brtstore4340-glitch.github.io/Medicine-Tracker/
```

---

## Option 2: Install Git and Use Command Line

If you'd prefer to use Git:

### Install Git for Windows
1. Download from: https://git-scm.com/download/win
2. Install with default options
3. Restart your terminal
4. Then run these commands:

```bash
cd C:\Users\User\.gemini\antigravity\scratch\medicine-tracker
git init
git add .
git commit -m "Initial commit - Medicine Tracker with GitHub Pages"
git branch -M main
git remote add origin https://github.com/brtstore4340-glitch/Medicine-Tracker.git
git push -u origin main
```

Then follow **Step 3-6** from Option 1 above.

---

## What Files to Upload (Checklist)

When uploading via web interface, make sure these are included:

### Root Files
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `vite.config.js` ✨ (UPDATED with base path)
- [ ] `index.html`
- [ ] `eslint.config.js`
- [ ] `.gitignore`
- [ ] `.env.example`
- [ ] `README.md`
- [ ] `DEPLOYMENT.md` ✨ (NEW)

### Folders
- [ ] `.github/workflows/deploy.yml` ✨ (NEW - very important!)
- [ ] `.agent/workflows/deploy.md` ✨ (NEW)
- [ ] `src/` (entire folder)
- [ ] `public/` (entire folder)

### DO NOT Upload
- ❌ `node_modules/` folder
- ❌ `dist/` folder  
- ❌ `.env` file (SECURITY RISK!)

---

## Troubleshooting

**"I don't see .github folder"**
- Windows hides folders starting with `.`
- In File Explorer, View → Show → Hidden items
- Or create the folder structure in GitHub directly

**"Workflow didn't run"**
- Check if `.github/workflows/deploy.yml` was uploaded
- Go to Actions tab and manually click "Run workflow"

**"Build failed"**
- Check that all 7 GitHub Secrets are added correctly
- View error logs in Actions tab

**"404 Not Found"**
- Wait 5-10 minutes after first deployment
- Verify GitHub Pages is enabled in Settings → Pages
- Check that Source is set to "GitHub Actions"

---

## Need Help?

If you get stuck, let me know at which step and I'll help you troubleshoot!
