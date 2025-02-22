const {connectToDb}=require('./dbconnect');
const path=require('path');
const express=require('express');
const app=express();
const PORT=8000;

//db connection
connectToDb('mongodb://127.0.0.1:27017/blog')
.then(()=>console.log("database connected!!"))
.catch((error)=>console.log(`some error occurred ${error}`));

const userRoute=require('./routes/user');

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/',userRoute);

app.get('/',(req,res)=>{
	return res.render('home');
})

app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`));