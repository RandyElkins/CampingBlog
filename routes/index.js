// Import ALL functions from '/routes/camps.js' to then
// Export to be available for pickup by 'server.js'
module.exports = {
    rtsCamps: require('./camps.js'),
    rtsOauth: require('./oauth.js'),
    // rtsComments: require('./comments.js'),
};