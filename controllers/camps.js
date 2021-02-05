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
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! req.user !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('req.user', req.user);
    db.mdlsUser.find({}, function(err, users) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! users !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log('users', users);
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
    db.mdlsCamp.create(req.body, (err, createdCamp) => {
        console.log('createdCamp', createdCamp);
        if (err) return console.log('Error in data creation:', err);
        console.log('Data entered into DB.');

    });
    res.redirect('/'); // 'redirect' goes thru the ROUTE, not just shows the 'ejs' file, so make sure to put the ROUTE, & NOT the 'ejs' file
};

// Show
const ctrlsCampsDetails = (req, res) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! req !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('req.params.campId', req.params.campId);
    const id = req.params.campId;
    const user = req.user;
    db.mdlsCamp.findById(id)
        .populate('users')
        .exec(function(err, camp) {
            console.log('camp.users', camp.users);
            console.log('user', user);
            console.log('id', id);
            db.mdlsUser.find({
                _id: {
                    $nin: camp.users,
                },
            });
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! camp !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('camp', camp);
            res.render('camps/show', { title: 'Camp Details', camp, user: req.user });
        });
};

const ctrlsCampsDelete = (req, res) => {
    const id = req.params.campId;
    db.mdlsCamp.findByIdAndDelete(id, (err, deletedCamp) => {
        if (err) return console.log(err);
        res.redirect('/');
    });
};

const ctrlsCampsGetEdit = (req, res) => {
    console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${new Date()} !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    console.log('req.params', req.params);
    const id = req.params.campId;
    const user = req.user;
    db.mdlsCamp.findById(id)
        .populate('user')
        .exec(function(err, camp) {
            console.log('camp', camp);
            console.log('user', user);
            console.log('id', id);
            db.mdlsUser.find({
                _id: {
                    // $nin: camp.users,
                },
            })
            res.render('camps/edit', { title: 'Camp Details', camp, user: req.user });
        });
};

const ctrlsCampsPutEdit = (req, res) => {
    const id = req.params.campId;
    db.mdlsCamp.findByIdAndUpdate(
        id, {
            $set: {
                ...req.body
            },
        }, {
            new: true
        },
        (err, updateCamp) => {
            if (err) return console.log(err);
            res.redirect(`/camps/${id}`)
        });
}

// Export the various 'camps' functions created
// These will be picked up by '/controllers/index.js' to be connected via '/routes'
module.exports = {
    ctrlsCampsGetIndex,
    ctrlsCampsGetNew,
    ctrlsCampsPostNew,
    ctrlsCampsDetails,
    ctrlsCampsDelete,
    ctrlsCampsGetEdit,
    ctrlsCampsPutEdit,
}