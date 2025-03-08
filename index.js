const {connectToDb}=require('./dbconnect');
const path=require('path');
const cookieParser = require('cookie-parser')
const express=require('express');
const {checkForAuthenticationCookie}=require('./middleware/authentication');
const app=express();
const PORT=8000;
const Blog=require('./models/blog');

//db connection
connectToDb('mongodb://127.0.0.1:27017/blog')
.then(()=>console.log("database connected!!"))
.catch((error)=>console.log(`some error occurred ${error}`));

const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.get('/', async(req,res)=>{
	const allBlog=await Blog.find({});
	return res.render('home',{
		user: req.user,
		blogs: allBlog
	});
})

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`));