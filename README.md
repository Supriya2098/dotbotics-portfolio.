# Dotbotics company portfolio

A responsive single-page company portfolio built from the Dotbotics brochure.

## Run locally

- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Build production assets: `npm run build`
- Preview a production build: `npm run preview`

## Project notes

- The portfolio content is maintained in `src/content.ts`; project links, categories, brochure descriptions, technology tags, and in-progress status are data-driven.
- Original product imagery and the company mark were extracted from the supplied brochure into `public/images/`. Website project visuals are brochure images matched to their corresponding cards; the remaining projects use their extracted product screenshots.
- The inquiry form validates fields in the browser and prepares a `mailto:` draft to `info@dotbotics.io`. It does not send or store form data. Configure a real server-side form integration before replacing this fallback.
- The canonical production domain has not been configured because deployment of this portfolio at `dotbotics.io` is not confirmed. The brochure company site remains linked as `https://www.dotbotics.io`.
- The engagement steps are a proposed framework, not brochure claims.

## Deployment

Deploy the generated `dist/` directory to the hosting provider of your choice. Configure the deployment URL with the provider and add the matching canonical URL and sitemap host once the portfolio's production domain is confirmed.
