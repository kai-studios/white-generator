// A local plugin: a function that runs once at startup with the Express app
// and the White.js context. It is listed in white.config.js.
export default function site(app) {
  // Available in every template as it.site
  app.locals.site = {
    name: 'White.js',
    tagline: 'A thin, fast framework on top of Express',
    year: new Date().getFullYear(),
  };

  // Available in every template as it.path (used to highlight the current link)
  app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
}
