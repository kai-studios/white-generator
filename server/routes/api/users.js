export default (router) => {
  router.get('/', (req, res) => res.json([{ id: 1, name: 'Test' }]));
  router.get('/:id', (req, res) => res.json({ id: req.params.id }));
};
