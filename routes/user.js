const express=require('express');
const User=require('../models/user');

const router=express.Router();

router.get('/signin',(req,res)=>{
	return res.render('signin');
})
router.get('/signup',(req,res)=>{
	return res.render('signup');
})

router.post('/signup',async(req,res)=>{
	const {fullName,email,password}=req.body;
	await User.create({
		fullName,
		email,
		password
	});

	return res.status(201).json({msg: "data inserted"}).redirect("/");
	
})
// router.post('/signin',(req,res)=>{
// 	const user=req.body;
	
// })
module.exports=router;