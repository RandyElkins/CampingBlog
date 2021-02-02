const db = require('../config/database.js');
// const script = require('../public/js/script.js');

// Create a function 'index' to render ALL camps at the '/camps/index.js' route (aka: '...PORT}`/camps')
// GET + Path http://localhost:`${PORT}`[/views]/camps[/index.js]
const ctrlsCampsGetIndex = (req, res) => {

    db.mdlsCamp.find({}).sort({ campDbDate: 'asc' }).exec((err, allCamps) => {

        if (err) return console.log(err);

        const context = {
            camps: allCamps,
            title: 'List of camps'
        };
        // console.log('context', context);
        res.render('camps/index.ejs', context);

    });
};

const ctrlsCampsGetNew = (req, res) => {
    res.render('camps/new.ejs'); // we’ll be changing this later
};

const ctrlsCampsPostNew = (req, res) => {
    // console.log('req.body', req.body);
    db.mdlsCamp.create(req.body, (err, createdFlight) => {
        if (err) return console.log('Error in data creation:', err);
        console.log('Data entered into DB.');

    });
    res.redirect('camps'); // 'redirect' goes thru the ROUTE, not just shows the 'ejs' file, so make sure to put the ROUTE, & NOT the 'ejs' file
};

// Export the various 'camps' functions created
// These will be picked up by '/controllers/index.js' to be connected via '/routes'
module.exports = {
    ctrlsCampsGetIndex,
    ctrlsCampsGetNew,
    ctrlsCampsPostNew,
}