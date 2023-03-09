import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarcomp from './Navbarcomp';
import { useParams } from 'react-router';

function Video(){
    const [vid, setVid] = useState({});
    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://192.168.49.2:31886/videos/${id}`).then((response) => {
            setVid(response.data);
        })
    }, []);
    return (
        <div>
            <Navbarcomp />
            <div className='container'>
                <div className='row'>
                    <div className='col-10 mr-5 mt-5 ml-5 mb-5'>
                        <video src={vid.video_url} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-10'>
                        <h3>{vid.name}</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-10'>
                        <h3>{vid.caption}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;