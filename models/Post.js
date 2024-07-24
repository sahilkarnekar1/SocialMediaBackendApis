const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  imageId: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    text: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
