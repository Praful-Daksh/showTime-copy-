import express from 'express';
import expressLayots from 'express-ejs-layouts';
import mongoose from 'mongoose'; 
import routeHome from './routes/home.js';
import routeLogin from './routes/login.js';
import flash from 'connect-flash';
import session from 'express-session';
const app = express();
import passport from 'passport';

import configPass from './config/passport.js';
configPass(passport);

//db config 
import dotenv from 'dotenv';
dotenv.config();
const mongoUri = process.env.mongoURI;

//connect mongo
mongoose.connect(mongoUri)
.then(()=> console.log('Database connected'))
.catch(err => console.log(err));

//ejs
app.use(expressLayots);
app.set('view engine','ejs');
app.use(express.static('public'));

//Body parse
app.use(express.urlencoded({extended:false}));

//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
 
//connect flash
app.use(flash());

//Global Variables
 app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg') || null;
  res.locals.error_msg = req.flash('error_msg') || null;
  res.locals.error = req.flash('error') || null;
  next();
 });

//routes 
app.use('/',routeHome);
app.use('/login',routeLogin);


//server starter
const PORT = process.env.PORT || 1200;
app.listen(PORT , ()=>{
    console.log('server started on ',PORT);
});