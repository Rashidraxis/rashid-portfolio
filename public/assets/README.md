# Portfolio assets

- Add your real resume as `Rashid_Faruqui_Resume.pdf` here. It will be available at `/assets/Rashid_Faruqui_Resume.pdf` on a root deployment. The download link is intentionally present, but cannot download a PDF until you add it.
- Add a 1600 x 900 StreamNest screenshot as `streamnest.webp`, then add `image: 'assets/streamnest.webp'` to its object in `src/app/data/projects.ts`.
- The existing screenshot placeholder is not an image of the application. Adding `image` replaces it automatically, with lazy loading, alt text, and a reserved 16:9 frame.
- Use base-relative paths (`assets/...`, without a leading slash) so GitHub Pages repository deployments work too.