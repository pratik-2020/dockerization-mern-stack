import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardHeader, CardTitle, CardText, Button } from 'reactstrap';
import Navbarcomp from './Navbarcomp';
import axios from 'axios';
function PrivateVideoGallery(){
    let { pvt } = useParams();
    const [video, setVideo] = useState([]);

    useEffect(() => {
        axios.get(`http://192.168.49.2:31886/videos/${pvt}`).then((response) => {
            let f = [];
            response.data.map((e,key) => {
                f.push(e);
            });
            console.log(f[0].video_url);
            setVideo(f);
        })
    }, [])
    const renderVideo = () => {
        if(video.length === 0){
            return(
                <div></div>
            );
        }
        else{
            return(
                video.map((e,key) => {
                    return(
                        <div className='col-10 col-md-3' key={key}>
                            <Card>
                                <CardHeader>
                                    <video src={e.video_url} />
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                        <Button style={{backgroundColor:'white', borderWidth:0, color:'black'}}>
                                            <h3>{e.name}</h3>
                                        </Button>
                                    </CardTitle>
                                    <CardText>
                                        {e.caption}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    );
                })
            );
        }
    }
    return(
        <div>
            <Navbarcomp />
            <div className='container'>
                <div className='row'>
                    {renderVideo()}
                </div>
            </div>
        </div>
    );
}

export default PrivateVideoGallery;