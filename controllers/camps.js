const db = require('../config/database.js');
const script = require('../public/js/script.js');

// Create a function 'index' to render ALL flights at the '/flights/index.js' route (aka: '...PORT}`/flights')
// GET + Path http://localhost:`${PORT}`[/views]/flights[/index.js]
const ctrlsFltsGetIndex = (req, res) => {

    db.mdlsFlight.find({}).sort({ fltDbDeparts: 'asc' }).exec((err, allFlights) => {

        if (err) return console.log(err);

        const context = {
            flights: allFlights,
            title: 'List of flights'
        };
        // console.log('context', context);
        res.render('flights/index.ejs', context);

    });
};

const ctrlsFltsGetNew = (req, res) => {
    res.render('flights/new.ejs'); // we’ll be changing this later
};

const ctrlsFltsPostNew = (req, res) => {
    // console.log('req.body', req.body);
    db.mdlsFlight.create(req.body, (err, createdFlight) => {
        if (err) return console.log('Error in data creation:', err);
        console.log('Data entered into DB.');

    });
    res.redirect('flights'); // 'redirect' goes thru the ROUTE, not just shows the 'ejs' file, so make sure to put the ROUTE, & NOT the 'ejs' file
};

// Export the various 'flights' functions created
// These will be picked up by '/controllers/index.js' to be connected via '/routes'
module.exports = {
    ctrlsFltsGetIndex,
    ctrlsFltsGetNew,
    ctrlsFltsPostNew,
}