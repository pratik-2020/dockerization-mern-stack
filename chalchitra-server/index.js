const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const uploadVideo = require('./routes/uploadVideo');
const getVideos = require('./routes/getVideo');
const getPrivateVideo = require('./routes/getPrivateVideo');
const renderVideo = require('./routes/renderVideo');
const db = "mongodb+srv://pratik:pratik@cluster0.kinp2gi.mongodb.net/?retryWrites=true&w=majority"
app.use(cors({
    origin: '*',
    methods: [
        'GET',
        'POST'
    ]
}))
app.use(express.json());
app.use(express.text());
app.use(fileUpload({
    useTempFiles: true
}));
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successful!!!');
})
.catch((err) => {
    console.log(err.message);
})
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get('/video' ,(req, res) => {
    const range = req.headers.range;
    if(!range){
        res.status(400).send('It requires range header');
    }
    const videoPath = "Shark-tank.mp4";
    const videoSize = fs.statSync(videoPath).size;
    console.log(videoSize);
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize -1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
});

app.get('/videos', (req, res) => {
    getVideos(req, res);
});
app.get('/videos/:private_key',(req, res) => {
    getPrivateVideo(req, res);
});

app.post('/video', (req, res) => {
    uploadVideo(req, res);
});

app.get('/render/:id', (req, res) => {
    renderVideo(req, res);
})

app.listen(3001, () => {
    console.log('Listening at 3001');
});
