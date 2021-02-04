const db = require('../config/database.js');
// const User = require('../models/User.js');
// const script = require('../public/js/script.js');

// Route to 'index' that renders ALL camps at the '/camps/index.js' route (aka: '...PORT}`/camps')
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

// Route to the new entry FORM
const ctrlsCampsGetNew = (req, res) => {
    db.mdlsUser.find({}, function(err, users) {
        res.render('camps/new', {
            users,
            user: req.user,
        });
    });
};

// Route to POST a new campground
const ctrlsCampsPostNew = (req, res) => {
    // console.log('****** ctrlsCampsPostNew ******');
    // console.log(Date());
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! req.body !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    // console.log('req.body', req.body);
    req.body.users = req.user._id;
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! req.body !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    // console.log('req.body', req.body);
    // console.log('****** ctrlsCampsPostNew ******');
    db.mdlsCamp.create(req.body, (err, createdCamp) => {
        console.log('createdCamp', createdCamp);
        if (err) return console.log('Error in data creation:', err);
        console.log('Data entered into DB.');

    });
    res.redirect('/'); // 'redirect' goes thru the ROUTE, not just shows the 'ejs' file, so make sure to put the ROUTE, & NOT the 'ejs' file
};

// Show
const ctrlsCampsDetails = (req, res) => {
    const id = req.params.campId;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! req !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('req', req);
    const user = req.user;

    db.mdlsCamp.findById(id)
        .populate('user')
        .exec(function(err, camp, user) {
            console.log('camp', camp);
            console.log('id', id);
            db.mdlsUser.find({
                _id: {
                    $nin: camp.user,
                }
            })
            res.render('camps/show', { title: 'Camp Details', camp, user });
        });
    // db.mdlsCamp.findById(id, (err, foundCamp) => {

    //     if (err) return console.log(err);

    //     const context = {
    //         camp: foundCamp,
    //     }

    //     res.render('camps/show', context);
    // });
};


// Export the various 'camps' functions created
// These will be picked up by '/controllers/index.js' to be connected via '/routes'
module.exports = {
    ctrlsCampsGetIndex,
    ctrlsCampsGetNew,
    ctrlsCampsPostNew,
    ctrlsCampsDetails,
}