# White.js starter

A minimal White.js site template with one home page and a small server API.

## Run it

```sh
npm install
npm run dev
npm start
```

Open http://localhost:3000. Copy `.env.example` to `.env` to change the port or log level.

## Structure

```
server/
  routes/
    client/index.js     GET /
    api/status.js       GET /api/status
app/
  views/                Shared layout, home page, and error page
    partials/           Reusable template components
  public/               Styles, browser enhancements, and static assets
```

Routes are discovered from files under `server/routes`. Templates use Eta and are stored under `app/views`; static files are served from `app/public`.

## Customize

- Replace the content in `app/views/index.eta`.
- Change the shared layout in `app/views/layout.eta`.
- Adjust colors and typography in `app/public/css/base.css`.
- Add a page by creating a route in `server/routes/client` and its template in `app/views`.
