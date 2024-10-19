import Event from "../models/events.js";
import express from "express";
import { ensureAuthenticated } from "../config/auth.js";

const router = express.Router();

// Route for dashboard home
router.get("/home", ensureAuthenticated, async (req, res) => {
    try {
        let e = [];
        let userId = req.user._id;
        await Event.find({ user: userId })
            .then(events => {
                e = events;
            })
            .catch(err => {
                console.error('Error fetching events:', err);
            });
            res.render("dashboard", {
                layout: "dashboard-layout.ejs",
                cssFile: "dashboard.css",
                user: req.user,
                E:e,
            });
        
    } catch (error) {
        if (error) {
            console.log(error);
            res.send("Server Overloaded , Try again later");
        }
    }
});
router.get("/settings", ensureAuthenticated, (req, res) => {
    res.render("dash-settings", { layout: "dashboard-layout.ejs" });
});
//new Event for user
router.get("/newEvent", ensureAuthenticated, (req, res) => {
    res.render("new-Event", {
        layout: "layout.ejs",
        cssFile: "newEvent.css",
        title: "Create New Event",
        user: req.user,
    });
});

// post requrest for new Event
router.post("/newEvent", async (req, res) => {
    try {
        const { title, date, city, venue } = req.body;
        const user = req.user._id;
        const newEvent = new Event({
            title,
            date,
            user,
            city,
            venue,
        });
        await newEvent.save();
        res.redirect("/dashboard/home");
        console.log("New Event Created", newEvent);
    } catch (error) {
        console.log("error in creating event", error);
        res.status(500).send("server Errro");
    }
});

export default router;
