# How to Distribute Your Component

You have generated a `registry/cover-flow.json` file. To make this installable via CLI for everyone, you need to host this file publicly.

## Step 1: Push to GitHub

Ensure your project is pushed to a public GitHub repository.

```bash
git add .
git commit -m "Add registry and documentation"
git push origin main
```

## Step 2: Enable GitHub Pages (Optional but Recommended)

For a stable URL, enable GitHub Pages:

1. Go to your repository **Settings**.
2. Navigate to **Pages**.
3. Select the `main` branch and the `/public` folder (if your registry is in public) or just root if it's a simple repo.
   - _Note: Since we generated `public/registry/cover-flow.json`, deploying the `/public` directory is ideal._

## Step 3: Get the Registry URL

Once deployed, your registry file will be accessible at:

```
https://[your-username].github.io/[your-repo]/registry/cover-flow.json
```

**Recursive Raw URL (Recommended)**:

```
https://raw.githubusercontent.com/intrface2026/cover-flow-ui/main/public/registry/cover-flow.json
```

## Step 4: Share the Command

Now anyone can install your component using:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/intrface2026/cover-flow-ui/main/public/registry/cover-flow.json
```
