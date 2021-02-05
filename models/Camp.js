const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campSchema = new Schema({
    campDbName: {
        type: String,
        required: true,
    },
    campDbPrice: {
        type: Number,
        required: true,
        min: 0,
        max: 9999,
    },
    campDbImage: {
        type: String,
        required: true,
    },
    campDbDescription: {
        type: String,
        required: true,
    },
    campDbLocation: {
        type: String,
        required: true,
    },
    campDbDate: {
        type: Date,
        // default: Date.now,
        default: new Date(new Date().setFullYear(new Date().getFullYear() + 0)),
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, {
    // timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
});

const Camp = mongoose.model('Camp', campSchema);

module.exports = Camp;