const post = require('../models/postModel');

module.exports = {
  async fetchAll(req, res) {
    let page = req.query.page;
    let limit = req.query.limit;

    if (!page || !limit) {
      return res.status(403).json({ error: 'Missing page or limit parameter' });
    }

    if (page >>> 0 !== parseFloat(page)) {
      page = 1;
    }

    const users = await post
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);

    if (users) {
      return res.status(200).json(users);
    }

    return res.status(500).json({ error: 'Internal server error' });
  },

  async fetchOne(req, res) {
    const postId = req.params.id;

    const localPost = await post.findById(postId);

    if (localPost) {
      return res.status(200).json(localPost);
    }

    return res.status(404).json({ message: 'Post not found' });
  },

  async createPost(req, res) {
    const { title, body, tags } = req.body;

    if (!title || !body || !tags) {
      return res.status(403).json({ error: 'Missing data on body request' });
    }

    if (title.length < 3 || body.length < 3) {
    }

    const createdPost = await post.create({
      title,
      body,
      tags,
    });

    if (createdPost) {
      return res.status(201).json(createdPost);
    }

    return res.status(500).json({ error: 'Error insert post in database' });
  },

  async editPost(req, res) {
    const postId = req.params.id;
    const { title, body, tags } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(403).json({ error: 'Missing data on body request' });
    }
    // fix this
    const editedPost = await post.findByIdAndUpdate(postId, {
      title,
      body,
      tags,
    });

    if (editedPost) {
      return res.status(200).json(editedPost);
    }

    return res.status(500).json({ error: 'Error editing post in database' });
  },

  async deletePost(req, res) {
    const postId = req.params.id;

    const localPost = await post.findByIdAndDelete(postId);

    if (localPost) {
      return res.status(200).json({ message: 'Post deleted' });
    }

    return res.status(500).json({ error: 'Error deleting post in database' });
  },
};
