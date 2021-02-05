// You have to import 'express', since we're creating a Router
const express = require('express');
const router = express.Router();

// Import ALL controllers in 1 go
const ctrlsAll = require('../controllers/index.js');

// Setup the various routes you'll be using
// GET /camps; 
router.get('/camps/:campId/comments/new', isLoggedIn, ctrlsAll.ctrlsComments.ctrlsCommentsGetNew); // Do NOT end with '.ejs'
router.post('/camps/:campId/comments', isLoggedIn, ctrlsAll.ctrlsComments.ctrlsCommentsPostNew); // Do NOT end with '.ejs'

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

// Export the various routes created
// These will be picked up by '/routes/index.js' to be connected via 'server.js'
module.exports = router;