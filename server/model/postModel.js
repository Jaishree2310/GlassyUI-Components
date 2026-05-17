import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  content: { type: String, required: true, trim: true, maxlength: 5000 },
  category: { type: String, required: true, trim: true, maxlength: 100 },
  date: { type: Date, default: Date.now },
});

postSchema.index({ date: -1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
