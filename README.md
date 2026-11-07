# Rashid Faruqui | Portfolio

A static, single-page portfolio using Angular 22 (CLI 22.2.5), standalone components, signals, explicit zoneless change detection, strict TypeScript/templates and plain SCSS. No server, router, backend form, UI framework, or animation library.

The page is **prerendered at build time**, so crawlers, link unfurlers and no-JS readers receive the full markup. The result is still a folder of static files; no SSR runtime is deployed.

## Run locally

Use Node **24.15.0 or newer in the Node 24 release line**. The originally installed Node 24.5.0 is too old for Angular 22.

```bash
npm ci
npm start
```

Open http://localhost:4200. To use a different port: `npm start -- --port 4300`.

Without changing an older system Node, the compatible runtime can also be invoked temporarily:

```bash
npm exec --yes --package=node@24 -- node node_modules/@angular/cli/bin/ng.js serve
```

## Build and test

```bash
npm test -- --watch=false
npm run build
```

Deploy **`dist/rashid-portfolio/browser`**, not its parent. The production build contains only static HTML, JS, CSS, self-hosted fonts and public assets. The build renders `index.html` ahead of time via `src/main.server.ts`, but nothing from `@angular/ssr` runs in production. Serve via HTTP; opening index.html with `file://` is not supported.

## Structure

```text
src/app/
	app.ts, app.spec.ts       Root composition and focused unit tests
	header.ts                Sticky navigation, active section, mobile menu
	app.config.ts            Zoneless change detection and client hydration
	app.config.server.ts     Prerender-only providers
	core/theme.service.ts    System preference and stored theme override
	data/                    profile.ts, experience.ts, projects.ts, skills.ts
	sections/                One standalone component per section
	shared/                  Lucide wrapper and reveal directive
src/styles.scss            Shared tokens, fonts, controls and motion rules
src/index.html             Metadata, structured data and early theme init
src/main.server.ts         Build-time prerender entry point
public/                    RF favicon, theme-init.js, robots.txt and assets/
```

Small section templates and component-scoped styles live beside the TypeScript in each section file. Shared styles are defined only in `src/styles.scss`.

## Add a project

Add one object to the typed `projects` array in `src/app/data/projects.ts`:

```typescript
{
	id: '02',
	title: 'Project name',
	summary: 'A one-line description.',
	description: 'Architecture, implementation, and impact.',
	stack: ['Angular', 'Node.js'],
	repoUrl: 'https://github.com/your-account/your-project',
	image: 'assets/project.webp',
}
```

`repoUrl`, `image`, `caseStudyUrl`, and `demoUrl` are optional. Missing fields render no links or images. StreamNest alone has the requested 16:9 screenshot placeholder. Images reserve dimensions, lazy-load, and use project-specific alt text. `caseStudyUrl` renders when supplied. `demoUrl` is reserved in the data model but intentionally never rendered: adding hosted demos later requires enabling their presentation, not changing the model.

Edit skill groups in `src/app/data/skills.ts`, roles and achievements in `src/app/data/experience.ts`, and personal links in `src/app/data/profile.ts`. Years of experience are derived from `company.startedOn`, so the About and Hero copy never goes stale.

## Fill in before publishing

1. Add `public/assets/Rashid_Faruqui_Resume.pdf`. Until then, the download target is intentionally missing.
2. Add your real StreamNest screenshot to `public/assets/streamnest.webp` and set its `image` field. Recommended dimensions: 1600 x 900.
3. Set `portfolioRepository` in `src/app/data/profile.ts` to this website's actual repository URL. It currently points to your GitHub repositories list because no repository URL was provided.
4. Once a public domain exists, add an absolute `og:url` and canonical URL in `src/index.html`.
5. Add a 1200 x 630 social-share image, reference it with an absolute `og:image` URL, and switch `twitter:card` to `summary_large_image`. Until then, shared links show a text-only preview.

## Deploy to Cloudflare Pages

Connect the repository in Workers & Pages, create a Pages project, and configure:

| Setting | Value |
| --- | --- |
| Framework preset | None / Angular |
| Build command | `npm run build` |
| Build output directory | `dist/rashid-portfolio/browser` |
| Root directory | Repository root |
| Environment variable | `NODE_VERSION=24.15.0` or a newer supported Node 24 patch |

No Workers, Functions, secrets, or API configuration is needed. Navigation uses section fragments, so no route rewrites are required.

### Other static hosts

- **Vercel:** build `npm run build`, output `dist/rashid-portfolio/browser`; choose Node 24.x (at least 24.15).
- **Netlify:** build `npm run build`, publish `dist/rashid-portfolio/browser`; set the same `NODE_VERSION`.
- **GitHub Pages:** build `npm run build -- --base-href /REPOSITORY_NAME/`, upload `dist/rashid-portfolio/browser` with the official Pages Actions workflow, then deploy with `actions/deploy-pages`. Set up Node 24.15+ in the workflow. Use `/` for a user-site repository or custom root domain. Assets are base-relative to support both forms.

## Design and accessibility

- Space Grotesk for headings/body; JetBrains Mono for dates, labels and tags. Both are self-hosted via Fontsource with `font-display: swap` and system fallbacks. The two weights behind the hero are preloaded, so `outputHashing` is set to `bundles` to keep font filenames stable.
- Near-black `#0b0d10`, off-white `#f1f2ee`, and lime `#c6f432` in dark mode. Warm off-white `#faf8f4`, near-black `#171b1e`, and contrast-adjusted green `#4b6800` in light mode. `--accent` is the contrast-safe value used for text and icons; `--accent-fill` stays lime in both themes and is used only for filled surfaces that carry `--accent-ink` on top, so the brand reads the same in either theme.
- Mono micro-labels never drop below 10px, and carry letter-spacing at that size.
- A 1100px content column, asymmetric dot-grid hero, editorial project rows, vertical timeline and grouped skill chips.
- System theme preference applies until the user toggles; localStorage operations are guarded. A small pre-paint script prevents a theme flash.
- Native anchors, skip link, visible focus, labeled icon buttons, Escape-to-close navigation, active-section indicators, and reduced-motion support. Reveal animations use IntersectionObserver with 60ms stagger steps and no animation dependency.
- Validate desktop/mobile and both themes after edits; automated accessibility checks do not replace a full manual assistive-technology audit.
