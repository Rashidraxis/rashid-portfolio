# Portfolio conventions

- Angular 22, standalone components, explicit zoneless change detection, strict TypeScript and strict templates. Use signals for local UI state.
- One component per section under `src/app/sections`. Keep project and skill content in typed files under `src/app/data`.
- Use plain SCSS and shared CSS variables in `src/styles.scss`; no UI or animation frameworks. Preserve both themes, keyboard navigation and reduced-motion behavior.
- Keep exactly two self-hosted font families: Space Grotesk and JetBrains Mono. Lucide icons use the small `Icon` wrapper with explicit accessible labels on controls.
- Never add hosted demos, iframes, backend contact forms, invented experience, or fake project screenshots. `demoUrl` is reserved data only.
- Static client build only. Keep assets base-relative for subpath deployment.
- Use Node 24.15+ within the Node 24 release line. Run `npm test -- --watch=false` and `npm run build` after changes. Add focused tests to `src/app/app.spec.ts`.
- Check widths 375, 768, 1440 in dark and light themes after layout changes.
- Run Snyk code scans for first-party code and SCA scans after dependency changes. Ask before remediating reported security issues.