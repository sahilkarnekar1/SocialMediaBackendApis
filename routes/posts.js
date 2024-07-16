const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const upload = require('../middleware/multer');

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  const userId = req.header('userId');
  if (!userId) return res.status(401).json({ msg: 'No user ID, authorization denied' });

  const user = await User.findById(userId);
  if (!user) return res.status(401).json({ msg: 'Invalid user ID' });

  req.user = user;
  next();
};

// Helper function to delete image
const deleteImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) console.error('Failed to delete image:', err);
  });
};

// Create a new post
router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
  const { heading, description } = req.body;

  try {
    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;

    const newPost = new Post({
      heading,
      description,
      imageUrl,
      user: req.user._id
    });

    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all posts of the authenticated user
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a post by ID
router.put('/:id', isAuthenticated, upload.single('image'), async (req, res) => {
  const { heading, description } = req.body;

  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const imageUrl = req.file ? `uploads/${req.file.filename}` : post.imageUrl;

    // Delete old image if a new one is uploaded
    if (req.file && post.imageUrl) {
      const oldImagePath = path.join(__dirname, '..', post.imageUrl);
      deleteImage(oldImagePath);
    }

    post.heading = heading;
    post.description = description;
    post.imageUrl = imageUrl;
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a post by ID
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete the image from the uploads folder
    if (post.imageUrl) {
      const imagePath = path.join(__dirname, '..', post.imageUrl);
      deleteImage(imagePath);
    }

    await post.deleteOne();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Follow a user
router.post('/follow/:userId', isAuthenticated, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);
    if (!userToFollow) return res.status(404).json({ msg: 'User not found' });

    if (req.user.following.includes(userToFollow._id)) {
      return res.status(400).json({ msg: 'Already following this user' });
    }

    req.user.following.push(userToFollow._id);
    await req.user.save();

    res.json({ msg: 'User followed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get posts of followed users
router.get('/followed', isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find({ user: { $in: req.user.following } }).populate('user', 'username');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Like a post
router.post('/:id/like', isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (!req.user.following.includes(post.user)) {
      return res.status(401).json({ msg: 'You need to follow the user to like the post' });
    }

    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a comment to a post
router.post('/:id/comment', isAuthenticated, async (req, res) => {
  const { text } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (!req.user.following.includes(post.user)) {
      return res.status(401).json({ msg: 'You need to follow the user to comment on the post' });
    }

    const newComment = {
      text,
      user: req.user._id
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
