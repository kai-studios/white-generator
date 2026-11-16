// GET /api/status
export default (router) => {
  router.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json({ status: 'ok', node: process.version, uptime: Math.round(process.uptime()) });
  });
};
