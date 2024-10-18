import express from 'express';
const router = express.Router();
import {ensureAuthenticated } from '../config/auth.js';

//home page
router.get('/',(req,res)=>{
    res.render('home',{title:'ShowTime-home',cssFile: 'home.css'});
});

//dashboard
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{title: 'Dashboard-ShowTime',cssFile:'home.css'});
})


export default router;