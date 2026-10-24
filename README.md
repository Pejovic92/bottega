# Bottega

Website for Bottega, which designs and makes made-to-measure wardrobes and other furniture from board materials (chipboard and MDF). The site's content is in Serbian (Latin script).

## Tech stack

- [React 18](https://react.dev) with [Vite 5](https://vitejs.dev)
- [Tailwind CSS 3](https://tailwindcss.com). Custom fonts, font sizes, colors and shadows are defined in `tailwind.config.js`.
- Fonts (Bree Serif, Junge, Ledger, Neuton) load from Google Fonts in `index.html`.
- [three.js](https://threejs.org) with React Three Fiber, for a 3D wardrobe preview that isn't shown on the page yet.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run lint      # ESLint
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Project structure

```
index.html                 page shell: title, meta tags, favicon, font links
public/                    files served as-is (favicon)
src/
  main.jsx                 entry point
  App.jsx                  renders every section of the page, top to bottom
  index.css                Tailwind directives and custom CSS (animations, flip card)
  assets/                  images, icons and the 3D model
  components/
    Navbar/
    Homepage/              hero, description and call-to-action sections
    About/                 intro, values and segment-based production sections
    Process-description/   process step card
    Recktangle-animation/  animated rectangles in the About section
    3dModel/               3D wardrobe scene (not rendered yet)
```

## Workflow

`main` holds the current state of the site. Each change gets its own branch (`chore/…`, `feat/…`, `redesign/…`) and is merged into `main` through a pull request.
