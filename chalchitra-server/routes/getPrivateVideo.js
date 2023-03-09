const videoModel = require('../models/video');

const getPrivateVideo = (req, res) => {
    videoModel.find({
        public: false,
        private_key: req.params.private_key
    }).then((resp1) => {
        if(resp1.length === 0){
            res.send({
                'message': 'No private video with the key'
            });
        }
        else{
            res.send(resp1);
        }
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = getPrivateVideo;