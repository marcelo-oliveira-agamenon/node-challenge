const post = require('../models/postModel');

module.exports = {
  async fetchAll(req, res) {
    let page = req.query.page;

    if (page >>> 0 !== parseFloat(page)) {
      page = 1;
    }

    const users = await post
      .find({})
      .skip((page - 1) * 5)
      .limit(5);

    return res.status(200).json(users);
  },

  async createPost(req, res) {
    const { title, body, tags } = req.body;

    if (!title || !body || !tags) {
      return res.status(403).json({ error: 'Missing data on body request' });
    }

    const createdPost = await post.create({
      title,
      body,
      tags,
    });

    if (createdPost) {
      return res.status(201).json(createdPost);
    }

    return res.status(500).json({ error: 'Error insert user in database' });
  },
};
