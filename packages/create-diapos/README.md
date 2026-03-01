# create-diapos

[![npm](https://img.shields.io/npm/v/create-diapos)](https://www.npmjs.com/package/create-diapos)

Scaffold a new [Diapos](https://www.npmjs.com/package/diapos) presentation project.

## Usage

```bash
npx create-diapos my-slides
cd my-slides
npm install
npm run dev
```

Creates a ready-to-run presentation with:
- A demo slide deck
- Presenter and projector views wired with `DiaposRouter`
- Vite dev server with HMR

## What You Get

```
my-slides/
  src/
    slides.tsx    # your slides
    theme.ts      # your theme (optional)
    main.tsx      # router entry point
  index.html
  package.json
  vite.config.ts
```

Open `http://localhost:5173` for the presenter view, click the projector button to open the audience view in a new tab.

## License

[MIT](../../LICENSE)
