const Flight = require('../models/flight');

module.exports = {
    index,
    indexSort,
    new: newFlight,
    create,
    show,
    createTicket,
    deleteTicket
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

function indexSort(req, res) {
    Flight.find({}).sort({departs: 'asc'})
        .then( flights => {
            const now = new Date().toISOString();
            flights.forEach( flight => {
                if (flight.departs.toISOString() < now) flight.past = true;
            })
            res.render('flights/index', {
                title: "All Flights",
                flights })
        })
        .catch(err => console.log(err))
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', { title: "Add Flight", departsDate })
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

function show(req, res) {
    Flight.findById(req.params.id)
    .then(flight => res.render('flights/show', { title: "Flight Details", flight }))
    .catch(err => console.log(err))
}

function createTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets.push(req.body);
        flight.save( err => {
            if(err) console.log(err);
            res.redirect(`/flights/${flight._id}`);
        })
    })
    .catch(err => console.log(err))
}

function deleteTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets.id(req.params.tid).remove()
        flight.save( err => {
            if(err) console.log(err);
            res.redirect(`/flights/${flight._id}`);
        })
    })
}