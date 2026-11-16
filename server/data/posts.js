// Sample content for the blog. A real site would read this from a database.
export const posts = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    date: '2026-11-16',
    summary: 'Install White.js, add two scripts and run your first page.',
    body: [
      { text: 'White.js is installed like any other npm package. Add it to a project, then add two scripts.' },
      { code: 'npm install white-js' },
      { code: '"scripts": {\n  "start": "white run",\n  "dev": "white run dev"\n}' },
      { text: 'npm run dev restarts the server when files in server/ change. npm start runs in production mode: templates are cached and error details are hidden from visitors.' },
      { text: 'Everything else is optional. Without a white.config.js the defaults apply: routes in server/routes, views in app/views and static files in app/public.' },
    ],
  },
  {
    slug: 'routes-from-files',
    title: 'Routes come from files',
    date: '2026-11-12',
    summary: 'Every file in server/routes becomes a URL. No route table to maintain.',
    body: [
      { text: 'Every .js file under server/routes becomes a router. Files in api/ get the /api prefix, files in client/ do not.' },
      {
        code:
          'server/routes/client/index.js        ->  /\n' +
          'server/routes/client/contact.js      ->  /contact\n' +
          'server/routes/client/blog/[slug].js  ->  /blog/:slug\n' +
          'server/routes/api/status.js          ->  /api/status',
      },
      { text: 'A route file exports one function that receives an Express router. Inside it, paths are written relative to the file’s own URL.' },
      { text: 'This page is served by blog/[slug].js. An unknown slug throws a NotFoundError, which renders the error page.' },
    ],
  },
  {
    slug: 'secure-by-default',
    title: 'Secure by default',
    date: '2026-11-09',
    summary: 'Headers, CSRF checks, rate limits and escaping, active from the first request.',
    body: [
      { text: 'These protections are on without any configuration.' },
      { text: 'Security headers and a Content Security Policy with a fresh nonce for every request. Inline scripts must carry that nonce, available in templates as it.nonce.' },
      { text: 'State-changing requests (POST, PUT, PATCH and DELETE) are rejected when they come from a different site.' },
      { text: 'Requests are rate limited, JSON and form bodies are size limited, and the template engine escapes everything it prints. For data inside a script tag use it.w.json(), and for links it.w.url().' },
      { text: 'The contact form on this site relies on all of it. Try sending a message with an invalid email address.' },
    ],
  },
];

export const findPost = (slug) => posts.find((post) => post.slug === slug);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en', { dateStyle: 'long', timeZone: 'UTC' });
