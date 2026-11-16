import { posts, formatDate } from '../../../data/posts.js';

// GET /blog
export default (router) => {
  router.get('/', (req, res) => {
    res.render('blog/index', {
      title: 'Blog',
      posts: posts.map((post) => ({ ...post, dateLabel: formatDate(post.date) })),
    });
  });
};
