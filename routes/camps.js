// You have to import 'express', since we're creating a Router
const express = require('express');
const router = express.Router();

// Import ALL controllers in 1 go
const ctrlsAll = require('../controllers/index.js');

// Setup the various routes you'll be using
// GET /flights; 
router.get('/', ctrlsAll.ctrlsCamps.ctrlsCampsGetIndex); // Do NOT end with '/index[.ejs]'
router.get('/camps/new', ctrlsAll.ctrlsCamps.ctrlsCampsGetNew); // Do NOT end with '.ejs'
router.post('/camps', ctrlsAll.ctrlsCamps.ctrlsCampsPostNew); // Do NOT end with '.ejs'

// Export the various routes created
// These will be picked up by '/routes/index.js' to be connected via 'server.js'
module.exports = router;