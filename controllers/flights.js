const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create
}

function index(req, res) {
    Flight.find( {}, (err, flights) => {
        if (err) console.log(err)
        res.render('flights/index', {
            title: "All Flights",
            flights
        })
    })
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', { title: "New Flight", departsDate })
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save( err => {
        if (err) {
            console.log(err)
            return res.render('flights/new', { title: "Add Flight" })
        }
        res.redirect('/flights');
    })


}