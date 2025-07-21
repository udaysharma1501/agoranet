const Comment = require('../models/Comment');

// ✅ Add a comment to a post
const addComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  if (!content) {
    return res.status(400).json({ error: 'Comment content is required' });
  }

  try {
    const newComment = new Comment({
      content,
      author: req.user.id, // from auth middleware
      post: postId,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get all comments for a specific post
const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId }).populate('author', 'username');
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addComment,
  getCommentsByPostId,
};
