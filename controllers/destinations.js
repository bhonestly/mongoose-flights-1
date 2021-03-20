const Destination = require('../models/destination');

module.exports = {
    new: newDestination,
    create,
    delete: deleteDestination
}

function newDestination(req, res) {
    Destination.find( {}, (err, destinations) => {
        if (err) console.log(err)
        res.render('destinations/new', { 
            title: "Add Destination",
            destinations
        })
    })
}

function create(req, res) {
    Destination.find( {}, (err, destinations) => {
        if (err) console.log(err)
        const destination = new Destination(req.body);
        destination.save( err => {
            if (err) {
                return res.render('destinations/new', { 
                    title: "Add Destination",
                    err,
                    destinations
                })
            }
            res.redirect('/destinations/new');
        })
    })
}

function deleteDestination(req, res) {
    Destination.deleteOne( { _id : req.params.id }, err => {
        if (err) console.log(err)
        res.redirect('/destinations/new');
    })
}