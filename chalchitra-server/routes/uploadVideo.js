const cloudinary = require('cloudinary').v2;
const videoModel = require('../models/video');
cloudinary.config({ 
    cloud_name: 'dnhhoqki8', 
    api_key: '718595217981748', 
    api_secret: 'ysR1P309Avqmun_boisN0rJsJ_I',
    secure: true
});

const uploadVideo = (req, res) => {
    const video = req.files.video;

    cloudinary.uploader.upload(video.tempFilePath, { resource_type: "video", 
    public_id: "myfolder/mysubfolder/dog_closeup",
    chunk_size: req.body.size,
    eager: [
      { width: 650, height: 650, crop: "pad", audio_codec: "none" }, 
      { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
    eager_async: true,
    eager_notification_url: "https://mysite.example.com/notify_endpoint" }, (err, data) => {
        if(err){
            res.send(err);
        }
        else{
            let videom = new videoModel();
            videom.name = req.body.name;
            videom.caption = req.body.caption;
            videom.video_url = data.url;
            videom.comment = [];
            videom.public = req.body.public;
            videom.size = req.body.size
            videom.private_key = req.body.private_key
            videom.save().then((resp1) => {
                res.send({
                    'message': 'Video uploaded successfully'
                })
            }).catch((er1) => {
                res.send(er1);
            })
        }
    })
}

module.exports = uploadVideo;