import Event from '../models/events.js';
import express from 'express';
import {ensureAuthenticated } from '../config/auth.js';

const router = express.Router();

// Route for dashboard home
router.get('/home',ensureAuthenticated, (req, res) => {
    res.render('dashboard',{layout : 'dashboard-layout.ejs',cssFile:'dashboard.css',user:req.user});
});
router.get('/settings',ensureAuthenticated,(req,res)=>{
    res.render('dash-settings',{layout : 'dashboard-layout.ejs'});
});
//new Event for user
router.get('/newEvent',ensureAuthenticated,(req,res)=>{
    res.render('new-Event',{layout:'layout.ejs',cssFile:'newEvent.css',title:'Create New Event',user:req.user});
});

// post requrest for new Event
router.post('/newEvent',async (req,res) =>{
    try{
        const {title,date,city,venue} = req.body;
       const user = req.user._id;
       const newEvent = new Event({
        title,
        date,
        user,
        city,
        venue
       });
       await newEvent.save();
       res.redirect('/dashboard/home');
       console.log('New Event Created',newEvent)
    } catch (error){
        console.log('error in creating event',error);
        res.status(500).send('server Errro');
    }
});

export default router;
