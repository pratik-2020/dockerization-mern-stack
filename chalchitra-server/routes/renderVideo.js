const videoModel = require('../models/video');
const fs = require('fs');
// const got = require('got')
const http = require('http');
const request = require('request');
const renderVideo = (req, res) => {
    const id = req.params.id;
    videoModel.find({
        _id: id
    }).then((resp1) => {
        if(resp1.length === 0){
            res.send({
                'message': 'No video with id found'
            })
        }
        else{
            // const range = req.headers.range;
            // if(!range){
            //     res.status(400).send('It requires range header');
            // }
            // const videoPath = resp1[0].video_url;
            // const videoSize = resp1[0].size;
            // console.log(videoSize);
            // const CHUNK_SIZE = 10 ** 6;
            // const start = Number(range.replace(/\D/g, ""));
            // const end = Math.min(start + CHUNK_SIZE, videoSize -1);
            // const contentLength = end - start + 1;
            // const headers = {
            //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            //     "Accept-Ranges": "bytes",
            //     "Content-Length": contentLength,
            //     "Content-Type": "video/mp4",
            // };
            // res.writeHead(206, headers);
            // const videoWriter = fs.createWriteStream(videoPath);
            // videoWriter.write(videoPath);
            // const videoStream = fs.createReadStream(videoPath, { start, end });
            
            // videoStream.pipe(res);
            // got.stream(videoPath).pipe(res);
            // http.get(videoPath, (stream) => {
            //     stream.pipe(res);
            // });
            // request(videoPath).pipe(res);
            // res.send(resp1[0].video_url);
            // http.request(videoPath, function(res) {
            //     res.pipe(writeStream);
            // });
            res.send(resp1[0]);
        }
    })
}

module.exports = renderVideo;