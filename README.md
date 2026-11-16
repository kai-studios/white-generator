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
  views/                     Eta templates (layout, partials, pages, error page)
  public/                    static files: css, js, favicon, robots.txt
```

## Features to look at

| Feature | Where |
| --- | --- |
| Routes from files | `server/routes/` |
| Dynamic route parameter | `server/routes/client/blog/[slug].js` |
| Plugin | `server/plugins/site.js`, listed in `white.config.js` |
| Validation in a route (`validate`) | `server/routes/api/messages.js` |
| Validation in an HTML form with redirect after POST | `server/routes/client/contact.js` |
| `NotFoundError` and the error page | `blog/[slug].js`, `app/views/error.eta` |
| Layout, partials, reusable form field | `app/views/layout.eta`, `app/views/partials/` |
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
