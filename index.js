const {connectToDb}=require('./dbconnect');
const path=require('path');
const cookieParser = require('cookie-parser')
const express=require('express');
const {checkForAuthenticationCookie}=require('./middleware/authentication');
const app=express();
const PORT=8000;

//db connection
connectToDb('mongodb://127.0.0.1:27017/blog')
.then(()=>console.log("database connected!!"))
.catch((error)=>console.log(`some error occurred ${error}`));

const userRoute=require('./routes/user');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.get('/',(req,res)=>{
	console.log(req.user)
	return res.render('home',{
		user: req.user,
	});
})

app.use('/user',userRoute);

app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`));