# Om Warkari's Portfolio

A React and Vite portfolio site.

## Run locally

```bash
npm ci
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Deploy to Vercel

Import the GitHub repository into Vercel and set the project **Root Directory** to `frontend`. Use these build settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Vercel will build and deploy the site when changes are pushed to the connected branch.
