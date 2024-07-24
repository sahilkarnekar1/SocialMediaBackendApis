// routes/posts.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const upload = require('../middleware/multer');
const cloudinary = require('../config/cloudinary');

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ msg: 'Invalid token' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'post_images' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(file.buffer);
  });
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

// Create a new post
router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
  const { heading, description } = req.body;

  try {
    let imageUrl = null;
    let imageId = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      imageUrl = result.secure_url;
      imageId = result.public_id;
    }

    const newPost = new Post({
      heading,
      description,
      imageUrl,
      imageId,
      user: req.user._id
    });

    const post = await newPost.save();
    res.status(201).json(post);
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

    let imageUrl = post.imageUrl;
    let imageId = post.imageId;
    if (req.file) {
      if (post.imageId) {
        await deleteFromCloudinary(post.imageId);
      }
      const result = await uploadToCloudinary(req.file);
      imageUrl = result.secure_url;
      imageId = result.public_id;
    }

    post.heading = heading;
    post.description = description;
    post.imageUrl = imageUrl;
    post.imageId = imageId;
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

    // Delete the image from Cloudinary
    if (post.imageId) {
      await deleteFromCloudinary(post.imageId);
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
  const { comment } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (!req.user.following.includes(post.user)) {
      return res.status(401).json({ msg: 'You need to follow the user to comment on the post' });
    }

    const newComment = {
      user: req.user._id,
      text: comment
    };

    post.comments.push(newComment);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
