import { messageSchema, fieldErrors, LIMITS } from '../../schemas/message.js';

const blank = { name: '', email: '', message: '' };
const pick = (body = {}) => ({
  name: String(body.name ?? ''),
  email: String(body.email ?? ''),
  message: String(body.message ?? ''),
});

// GET /contact and POST /contact
export default (router) => {
  router.get('/', (req, res) => {
    res.render('contact', { title: 'Contact', values: blank, errors: {}, limits: LIMITS, sent: req.query.sent === '1' });
  });

  router.post('/', (req, res) => {
    const values = pick(req.body);
    const result = messageSchema.safeParse(values);

    if (!result.success) {
      return res.status(422).render('contact', {
        title: 'Contact',
        values,
        errors: fieldErrors(result.error.issues),
        limits: LIMITS,
        sent: false,
      });
    }

    // This demo does not store or send anything. A real site would do it here.
    req.log.info('Contact message accepted');

    // Redirect after POST so a page refresh does not send the form again
    res.redirect(303, '/contact?sent=1');
  });
};
