const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authenticateToken = require('../middleware/authMiddleware');

// CREATE POST – Protected Route
// router.post('/', authenticateToken, async (req, res) => {
//   console.log("🔐 Authenticated user:", req.user);
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: "Unauthorized: No user info." });
//     }

//     const { title, content } = req.body;

//     if (!title || !content) {
//       return res.status(400).json({ error: 'Title and content are required.' });
//     }

//     const newPost = new Post({
//       title,
//       content,
//       author: req.user.id
//     });

//     const savedPost = await newPost.save();

//     res.status(201).json(savedPost);
//   } catch (error) {
//     console.error('Error creating post:', error.message);
//     res.status(500).json({ error: 'Something went wrong while creating the post.' });
//   }
// });

// create post - new: requires login
router.post('/', authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({
      title,
      content,
      author: req.user.id // 👈 use the id from your middleware
    });

    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Could not create post' });
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

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true } // returns updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH /api/posts/:id/upvote
// router.patch('/:id/upvote', async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { upvotes: 1 } },
//       { new: true }
//     );

//     if (!updatedPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.status(200).json(updatedPost);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
// Upvote post — new: requires login
router.patch('/:id/upvote', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Upvote failed' });
  }
});

// PATCH /api/posts/:id/downvote
// router.patch('/:id/downvote', async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { upvotes: -1 } },
//       { new: true }
//     );

//     if (!updatedPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.status(200).json(updatedPost);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
// Downvote post — new: requires login
router.patch('/:id/downvote', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: -1 } },
      { new: true }
    );

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Downvote failed' });
  }
});


module.exports = router;