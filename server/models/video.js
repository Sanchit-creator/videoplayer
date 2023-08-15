const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    path: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    thumbnail : {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


const Video = mongoose.model('Video', videoSchema);
module.exports = Video;