# Daycast Weather

A small responsive weather website built on the existing Node.js project. The static site calls `/api/weather`; the Vercel function reads the OpenWeatherMap key on the server and returns only the weather details needed by the page.

## Run locally

Install dependencies with `npm install`. For a Vercel-like local environment, install the Vercel CLI if needed, put `OPENWEATHER_API_KEY=your-key` in a local `.env` file, then run `npx vercel dev`. The `.env` file is ignored by Git. The original terminal example remains available with `npm run weather:terminal` and also reads `OPENWEATHER_API_KEY` from the environment.

## Deploy the existing GitHub repository

1. Sign in to Vercel and choose **Add New… → Project**.
2. Import the existing GitHub repository `zoha-arkati/projectOneWeather`. Leave the root directory as the repository root. Vercel detects the static `index.html` and the function under `api/`.
3. In the project’s **Settings → Environment Variables**, add `OPENWEATHER_API_KEY` and paste the API key from your OpenWeatherMap account as its value. Select Production, Preview, and Development as needed, then save.
4. Go to **Deployments** and redeploy, or let the first import build. Vercel provides the site URL when the deployment is ready.

The key belongs only in Vercel’s environment variable settings (and in your untracked local `.env` for local development). Do not place it in browser code or commit it. Pushes to the connected GitHub repository will trigger deployments after the initial import; this project has not been pushed or deployed as part of this change.
