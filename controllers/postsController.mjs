import Post from '../models/postModel.mjs';
import User from '../models/userModel.mjs';

// CREATE a new post
export const createPost = async (req, res) => {
  try {
    
    const { title, content} = req.body;

    if (!title || !content) return res.status(304).json({ error: 'title content missing' });

    const post = new Post({ title, content, author:  req.user.id });

    await post.save();

    res.status(201).json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL posts with pagination
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;     // default to page 1
    const limit = parseInt(req.query.limit) || 10;  // default to 10 posts per page
    const skip = (page - 1) * limit; 

    const total = await Post.countDocuments(); // total post count
    
    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // optional: newest first
      .populate('author', 'name email');

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      count: posts.length,
      posts
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// READ ONE post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a post
export const updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a post
export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
