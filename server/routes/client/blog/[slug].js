import { NotFoundError } from 'white-js';
import { findPost, formatDate } from '../../../data/posts.js';

// GET /blog/:slug    ([slug] in the file name becomes :slug)
export default (router) => {
  router.get('/', (req, res) => {
    const post = findPost(req.params.slug);
    if (!post) throw new NotFoundError('That post does not exist.');
    res.render('blog/post', { title: post.title, description: post.summary, post, dateLabel: formatDate(post.date) });
  });
};
