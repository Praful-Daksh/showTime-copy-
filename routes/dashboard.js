import Event from "../models/events.js";
import express from "express";
import { ensureAuthenticated } from "../config/auth.js";

const router = express.Router();

// Route for dashboard home

router.get("/home", ensureAuthenticated, async (req, res) => {
    try {
        let e = [];
        let userId = req.user._id;
        const currentDate = new Date();
        await Event.find({ user: userId, date: { $gte: currentDate } })
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
            E: e,
            eventLength: e.length,
        });

    } catch (error) {
        if (error) {
            console.log(error);
            res.send("Service Unavailable (502)");
        }
    }
});

//route for the events section

router.get("/AllEvents", ensureAuthenticated, async (req, res) => {
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
        res.render("dash-events", {
            layout: "dashboard-layout.ejs",
            cssFile: "dashboard.css",
            E: e,
        });

    } catch (error) {
        if (error) {
            console.log(error);
            res.send("Internal Server Error , 502");
            res.render('/login');
        }
    }
});

// route for viewing an event  

router.get('/AllEvents/:id', ensureAuthenticated, async (req, res) => {
    try {
        const eventId = req.params.id;
        await Event.findById(eventId)
            .then(event => {
                res.render('viewEvent', {
                    layout: "dashboard-layout.ejs",
                    cssFile: "dashboard.css",
                    E: event,
                });
            })
            .catch(er => {
                res.send("Event doesn't Exist Anymore");
            })
    }
    catch (err) {
        if (err) {
            console.log(error);
            res.send("Internal Server Error , 502");
            res.render('/dashboard/AllEvents');
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
        res.redirect("/dashboard/AllEvents");
        console.log("New Event Created", newEvent);
    } catch (error) {
        console.log("error in creating event", error);
        res.status(500).send("server Errro");
    }
});

export default router;
