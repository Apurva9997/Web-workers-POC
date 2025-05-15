# Web Workers POC

A proof of concept for using Web Workers in a web application.

## Local Development

To run the project locally:

```bash
npm install
npm start
```

This will serve the application at http://localhost:5000.

## Deployment to Netlify

This project is configured for Netlify deployment. You can deploy in one of the following ways:

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub/GitLab
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Netlify will detect the configuration automatically
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI if you haven't already
npm install netlify-cli -g

# Login to Netlify
netlify login

# Initialize site (if not already done)
netlify init

# Deploy to production
netlify deploy --prod
```

## Project Structure

- `src/`: Source files
  - `index.html`: Main HTML file
  - `index.js`: Main JavaScript file
  - `worker.js`: Web Worker implementation
  - `styles.css`: CSS styles
  - `progressbar.js`: Progress bar functionality
  - `progress-bar.css`: Progress bar styles 