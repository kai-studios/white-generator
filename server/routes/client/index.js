export default (router) => {
  router.get('/', (req, res) => res.render('index', { title: 'Example | White.js' }));
};
