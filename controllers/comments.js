const db = require('../config/database.js');
// const User = require('../models/User.js');
// const script = require('../public/js/script.js');

// Route to the new entry FORM
const ctrlsCommentsGetNew = (req, res) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! req.user !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('req.user', req.user);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! req.params !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('req.params', req.params);
    db.mdlsCamp.findOne({ _id: req.params.campId }, function(err, camp) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! camp !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log('camp', camp);
        res.render('comments/new', {
            camp,
            user: req.user,
        });
    });
};

// Route to POST a new campground
const ctrlsCommentsPostNew = (req, res) => {
    // console.log('****** ctrlsCampsPostNew ******');
    // console.log(Date());
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! req.body !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    // console.log('req.body', req.body);
    req.body.users = req.user._id;
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
    ctrlsCommentsGetNew,
    ctrlsCommentsPostNew,
}