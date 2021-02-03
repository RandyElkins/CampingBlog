const db = require('../config/database.js');
// const User = require('../models/User.js');
// const script = require('../public/js/script.js');

// Create a function 'index' to render ALL camps at the '/camps/index.js' route (aka: '...PORT}`/camps')
// GET + Path http://localhost:`${PORT}`[/views]/camps[/index.js]
const ctrlsCampsGetIndex = (req, res) => {

    db.mdlsCamp.find({}).sort({ campDbDate: 'asc' }).exec((err, allCamps) => {

        if (err) return console.log(err);

        const context = {
            camps: allCamps,
            title: 'List of Camps'
        };
        console.log('context', context);
        res.render('camps/index.ejs', {
            context,
            user: req.user
        });
    });
};

const ctrlsCampsGetNew = (req, res) => {
    db.mdlsUser.find({}, function(err, users) {
        res.render('camps/new', {
            users,
            user: req.user,
        });
    });
};

const ctrlsCampsPostNew = (req, res) => {
    // console.log('****** ctrlsCampsPostNew ******');
    // console.log(Date());
    // console.log('req.body', req.body);
    // console.log('****** ctrlsCampsPostNew ******');
    db.mdlsCamp.create(req.body, (err, createdCamp) => {
        console.log('createdCamp', createdCamp);
        if (err) return console.log('Error in data creation:', err);
        console.log('Data entered into DB.');

    });
    res.redirect('/'); // 'redirect' goes thru the ROUTE, not just shows the 'ejs' file, so make sure to put the ROUTE, & NOT the 'ejs' file
};

// Export the various 'camps' functions created
// These will be picked up by '/controllers/index.js' to be connected via '/routes'
module.exports = {
    ctrlsCampsGetIndex,
    ctrlsCampsGetNew,
    ctrlsCampsPostNew,
}