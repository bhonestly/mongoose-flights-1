const Destination = require('../models/destination');

module.exports = {
    index,
    new: newDestination,
    create,
}

function index(req, res) {
    Flight.find( {}, (err, flights) => {
        if (err) console.log(err)
        const now = new Date().toISOString();
        flights.forEach( flight => {
            if (flight.departs.toISOString() < now) flight.past = true;
        })
        res.render('flights/index', {
            title: "All Flights",
            flights
        })
    })
}

function newDestination(req, res) {
    res.render('destinations/new', { title: "Add Destination" })
}

function create(req, res) {
    const destination = new Destination(req.body);
    destination.save( err => {
        if (err) {
            console.log(err)
            return res.render('destinations/new', { title: "Add Destination" })
        }
        res.redirect('/flights');
    })
}