import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postsController.mjs';

const router = express.Router();

router.post('/', createPost);         // create post
router.get('/', getAllPosts);         // get all posts
router.get('/:id', getPostById);      // get post by id
router.put('/:id', updatePost);       // update post
router.delete('/:id', deletePost);    // delete post

export default router;
