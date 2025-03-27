const express=require('express');
const router=express.Router();
const postController=require('../controllers/postController.js');
const auth = require('../middleware/auth.js'); //token

router.get('/',postController.getAllPosts); //api/posts
router.get('/:id',postController.getPostById); //api/posts/5
router.post('/',auth,postController.createPost); //this is post method
router.put('/:id',auth,postController.updatePost); //update post
router.delete('/:id',auth,postController.deletePost);

module.exports=router;