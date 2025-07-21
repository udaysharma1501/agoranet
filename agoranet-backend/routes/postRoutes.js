const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authenticateToken = require('../middleware/authMiddleware');

// CREATE POST – Protected Route
router.post('/', authenticateToken, async (req, res) => {
  console.log("🔐 Authenticated user:", req.user);
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: No user info." });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ error: 'Something went wrong while creating the post.' });
  }
});

// GET ALL POSTS
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find().populate('author', 'username email');
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error('Error fetching posts:', error.message);
//     res.status(500).json({ error: 'Failed to fetch posts.' });
//   }
// });
router.get('/', async (req, res) => {
  try {
    console.log("Fetching all posts...");
    const posts = await Post.find().populate('author', 'username email');
    console.log("Posts found:", posts.length);
    console.log(posts);  // log to see exactly what’s returned

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
});


// GET POST BY ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error.message);
    res.status(500).json({ error: 'Failed to fetch the post.' });
  }
});

module.exports = router;
