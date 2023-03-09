const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: true
    },
    comment: {
        type: Array
    },
    public: {
        type: Boolean,
        required: true
    },
    private_key: {
        type: String
    },
    size: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const videoModel = mongoose.model('Video', videoSchema);

module.exports = videoModel;