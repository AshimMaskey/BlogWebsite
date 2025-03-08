const express=require('express');
const multer=require('multer');
const router=express.Router();
const path=require('path');
const Blog=require('../models/blog');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, path.resolve(`./public/uploads/`));
	},
	filename: function (req, file, cb) {
	 const fileName=`${Date.now()}-${file.originalname}`;
	 cb(null,fileName);
	}
  })
  
const upload = multer({ storage: storage })

router.get('/add-blog',(req,res)=>{
	return res.render('addBlog',{
		user: req.user,
	})
})

router.post('/add-blog',upload.single('coverImage'), async(req,res)=>{
	const {title,body}=req.body;
	const blog = await Blog.create({
		title,
		body,
		createdBy:req.user._id,
		coverImageUrl: `/uploads/${req.file.filename}`,
	})
	return res.redirect(`/blog/${blog._id}`);
});

router.get('/:id', async(req,res)=>{
	const blog =await Blog.findById(req.params.id).populate('createdBy');
	console.log(blog.createdBy.profileImageUrl);
	return res.render('blog', {
		user: req.user,
		blog
	})
})

module.exports=router;