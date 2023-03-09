const videoModel = require('../models/video');

const getVideos = (req, res) => {
    videoModel.find({
        public: true
    }).then((resp1) => {
        res.send(resp1);
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = getVideos;