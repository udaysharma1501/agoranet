const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const authenticateToken = require('../middleware/authMiddleware');

const { addComment, getCommentsByPostId } = require('../controllers/commentController');

// Create a comment on a post
router.post('/:postId', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = new Comment({
      post: postId,
      author: req.user.id,
      content
    });

    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Could not create comment' });
  }
});

// Get all comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username') // optional: get username of commenter
      .sort({ createdAt: -1 });

    console.log("Found comments:", comments);

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch comments' });
  }
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// GET all comments for a specific post (already working)
// router.get('/:postId', getCommentsByPostId);

// ADD a comment to a post
router.post('/:postId', authenticateToken, addComment);

module.exports = router;
