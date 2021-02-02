/* EXTERNAL MODULES */
const express = require('express');
const morgan = require('morgan');
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')

/* INTERNAL MODULES */
const routes = require('./routes/index.js');
const logger = require('./middleware/logger');
// const indexRoutes = require('./routes/index');
// const studentsRoutes = require('./routes/students');

/******* PORT *******/
const PORT = 3100;

/*** APP INSTANCE ***/
const app = express();

// We'll need to load the env vars
require('dotenv').config();

// connect to the MongoDB with mongoose
require('./config/database');
require('./config/passport');

/**** APP CONFIG ****/
app.set('view engine', 'ejs');

/**** MIDDLEWARE ****/
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(session({
    secret: 'LifeHappensOutside!',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/****** ROUTES ******/
app.use('/', routes.rtsCamps);
// app.use('/', indexRoutes);
// app.use('/', studentsRoutes);

/** APP  LISTENING **/
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});