# White.js starter

A small site built with [White.js](https://github.com/kai-studios/white.js). It is meant to be read: every file shows one feature of the framework.

## Run it

```sh
npm install
npm run dev     # development: restarts when files in server/ change
npm start       # production: cached templates, error details hidden
```

Open http://localhost:3000. Copy `.env.example` to `.env` to change the port or log level.

## What is where

```
white.config.js              only the settings that differ from the defaults
server/
  routes/
    client/                  pages (no URL prefix)
      index.js               GET /
      contact.js             GET and POST /contact
      blog/index.js          GET /blog
      blog/[slug].js         GET /blog/:slug      [slug] becomes :slug
    api/                     JSON (prefix /api)
      status.js              GET /api/status
      messages.js            POST /api/messages
  plugins/site.js            local plugin: site-wide template data
  schemas/message.js         zod schema shared by the form and the API
  data/posts.js              sample blog content
app/
  views/                     Eta templates (layout, pages, error page)
    partials/                components: button, field, code, terminal, icon, header, footer
  public/
    css/                     base.css (tokens, text), components.css, pages.css
    js/                      ui.js (all pages), contact.js (the form)
    favicon.svg, robots.txt
```

## Design

The site is white on purpose: one light theme, hairlines instead of boxes, soft shadows and a single gradient used in thin touches. There is no build step and no CSS or JS framework.

- **Tokens first.** Colors, radii, shadows and easing curves are CSS variables at the top of `base.css`. Change them there.
- **Motion is CSS.** Entrance animations (`data-rise`), the typed terminal, page cross-fades (View Transitions) and the reading progress line need no JavaScript. `ui.js` adds scroll reveal, the sliding nav pill, the card spotlight, copy buttons and link prefetching on hover.
- **Works without JavaScript.** Content is never hidden unless a script is there to reveal it, and the contact form posts normally and shows server-side errors.
- **Respects `prefers-reduced-motion`.**
- **Components are partials.** `include('./partials/button', { href: '/', label: 'Home', arrow: true })`. Each partial lists its parameters in a comment at the top.

## Features to look at

| Feature | Where |
| --- | --- |
| Routes from files | `server/routes/` |
| Dynamic route parameter | `server/routes/client/blog/[slug].js` |
| Plugin | `server/plugins/site.js`, listed in `white.config.js` |
| Validation in a route (`validate`) | `server/routes/api/messages.js` |
| Validation in an HTML form with redirect after POST | `server/routes/client/contact.js` |
| `NotFoundError` and the error page | `blog/[slug].js`, `app/views/error.eta` |
| Layout, component partials (button, field, code, icon) | `app/views/layout.eta`, `app/views/partials/` |
| Form that works with and without JavaScript | `app/views/contact.eta`, `app/public/js/contact.js` |
| CSP nonce and `it.w.json()` | `app/views/contact.eta` |
| Cache-busting asset URLs (`it.w.asset()`) | `app/views/layout.eta` |

## Try the API

```sh
curl -s http://localhost:3000/api/status

curl -s -X POST http://localhost:3000/api/messages \
  -H 'content-type: application/json' \
  -d '{"name":"Ann","email":"ann@example.com","message":"Hello from curl"}'
```

Send an invalid body and you get a 422 with a list of problems.

## Make it yours

- Site name and tagline: `server/plugins/site.js`
- Colors and spacing: the variables at the top of `app/public/css/style.css`
- Add a page: create `server/routes/client/about.js` and `app/views/about.eta`
