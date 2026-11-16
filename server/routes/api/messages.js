import { validate } from 'white-js';
import { messageSchema } from '../../schemas/message.js';

// POST /api/messages
// validate() checks the body and answers 422 with a list of problems when it is wrong.
// Parsed and trimmed values are available as req.valid.body.
export default (router) => {
  router.post('/', validate({ body: messageSchema }), (req, res) => {
    req.log.info('API message accepted');
    res.status(202).json({ accepted: true });
  });
};
