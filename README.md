# Om Warkari — Portfolio

A personal portfolio built with React and Vite.

![Om Warkari](frontend/public/om-profile.jpg)

## Run locally

```bash
cd frontend
npm ci
npm run dev
```

## Validate and build

```bash
npm run lint
npm run build
```

The production build is generated in `frontend/dist`.

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Select **Vite** as the framework preset.
4. Set the build command to `npm run build` and the output directory to `dist`.
5. Deploy. Vercel can automatically redeploy whenever you push to the connected branch.
