// Project settings. The framework core reads only this file.
export default {
  port: Number(process.env.PORT) || 3000,

  dirs: {
    routes: 'server/routes',
    views: 'app/views',
    public: 'app/public',
    meta: 'server/meta',
  },

  view: { engine: 'eta' },

  // Strings (npm packages or paths like './server/plugins/x.js') or functions
  plugins: [],
};
