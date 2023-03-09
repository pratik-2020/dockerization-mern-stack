import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardHeader, CardTitle, CardText, Nav, NavItem, NavLink, Button } from "reactstrap";
import Navbarcomp from "./Navbarcomp";
import axios from "axios";
function VideoGallery(){
    const [videos, setVideo] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.49.2:31886/videos').then((response) => {
            if(response.data.length === 0){
                setVideo([]);
            }
            else{
                let f = [];
                response.data.map((e,key) => {
                    f.push(e);
                });
                setVideo(f);
            }
        }).catch((error1) => {
            alert(error1);
        })
    },[]);

    const renderGallery = () => {
        if(videos.length === 0){
            return(
                <div></div>
            );
        }
        else{
            return (
                videos.map((e,key) => {
                    return(
                        <div key={key} style={{marginLeft:'40px'}} className="col-10 col-md-3 mr-3 ml-3 mt-3 mb-3 shadow">
                            <Card style={{ cursor: "pointer" }} className="mb-2 mt-2 mr-2 ml-2" onClick={() => {
                                window.location(`http:localhost:3000/video/${e._id}`)
                            }}>
                                <CardHeader>
                                    <video style={{width: '100%', height: '100%'}} className="mt-2 mb-2" src={e.video_url} />
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                        <Button style={{backgroundColor:'white', borderWidth:0, color:'black'}}>
                                            <h3>{e.name}</h3>
                                        </Button>
                                    </CardTitle>
                                    <CardText>
                                        <h4>{e.caption}</h4>
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
            <div className="container">
                <div className="row mt-5 mb-3">
                    {renderGallery()}
                </div>
            </div>
        </div>
    );
}

export default VideoGallery;