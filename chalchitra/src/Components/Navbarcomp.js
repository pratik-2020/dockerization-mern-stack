import { Nav, NavLink, NavItem, Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input } from "reactstrap";
import { HiOutlineUpload } from 'react-icons/hi'
import { useState } from 'react';
import FormData from "form-data";
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import axios from "axios";
function Navbarcomp(){
    const [video, setVideo] = useState(null);
    const [name, setName] = useState("");
    const [caption, setCaption] = useState("");
    const [size, setSize] = useState(0);
    const [open, setOpen] = useState(false);
    const [pub, setPub] = useState("true");
    const [private_key, setPrivate_key] = useState();
    const [open2, setOpen2] = useState(false);
    const [pvt, setPvt] = useState("");
    return (
        <Nav>
            <Modal isOpen={open}>
                <ModalHeader>
                    <h3>Upload your video</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-10 col-md-3 mr-2 mt-2 ml-2 mb-2">
                            <Label><h4>Video : </h4></Label>
                        </div>
                        <div className="col-10 col-md-7 mr-2 mt-2 ml-2 mb-2">
                            <Input type="file" onChange={(e) => {
                                setVideo(e.target.files[0]);
                            }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-3 mr-2 mt-2 ml-2 mb-2">
                            <Label><h4>Name : </h4></Label>
                        </div>
                        <div className="col-10 col-md-7 mr-2 mt-2 ml-2 mb-2">
                            <Input type="text" placeholder="Name of the video" onChange={(e) => {
                                setName(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-3 mr-2 mt-2 ml-2 mb-2">
                            <Label><h4>Caption : </h4></Label>
                        </div>
                        <div className="col-10 col-md-7 mr-2 mt-2 ml-2 mb-2">
                            <Input type="text" placeholder="Caption of the video" onChange={(e) => {
                                setCaption(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-3 mr-2 mt-2 ml-2 mb-2">
                            <Label><h4>Private Key : </h4></Label>
                        </div>
                        <div className="col-10 col-md-7 mr-2 mt-2 ml-2 mb-2">
                            <Input type="text" placeholder="Private key of the video" onChange={(e) => {
                                setPrivate_key(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-3 mr-2 mt-2 ml-2 mb-2">
                            <Label><h4>Size : </h4></Label>
                        </div>
                        <div className="col-10 col-md-7 mr-2 mt-2 ml-2 mb-2">
                            <Input type="text" placeholder="Size of the video" onChange={(e) => {
                                setSize(e.target.value);
                            }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="row">
                        <div className="col-10 col-md-4">
                            <Button color="primary" onClick={ () => {
                                if(pub === 'true'){
                                    setPub('false')
                                }
                                else{
                                    setPub('true');
                                }
                            }}>{pub}</Button>
                        </div>
                        <div className="col-10 col-md-4">
                            <Button color="success" onClick={() => {
                                let form = new FormData();
                                form.append('video', video);
                                form.append('name', name);
                                form.append('caption', caption);
                                form.append('private_key', private_key);
                                form.append('size', size);
                                if(pub === 'true') setPub(true);
                                else setPub(false);

                            }}>Upload</Button>
                        </div>
                        <div className="col-10 col-md-4" >
                            <Button color="danger" onClick={() => {setOpen(false)}}>Cancel</Button>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
            <Modal isOpen={open2}>
                <ModalHeader>
                    <h2>Private Key</h2>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-10 col-md-3 mr-2 mt-2 ml-2 mb-2">
                            <Label><h4>Private Key : </h4></Label>
                        </div>
                        <div className="col-10 col-md-7 mr-2 mt-2 ml-2 mb-2">
                            <Input type="text" placeholder="Private key of the video" onChange={(e) => {
                                setPvt(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-4" >
                            <Button color="success" onClick={() => {
                                axios.get(`http://192.168.49.2:31886/video/${pvt}`).then((response) => {
                                    if(response.data.message === ''){
                                        alert(response.data.message);
                                    }
                                    else{
                                        window.location(`http://localhost:3000/private/${pvt}`);
                                    }
                                })
                            }}>Get</Button>
                        </div>
                        <div className="col-10 col-md-4" >
                            <Button color="danger" onClick={() => {setOpen2(false)}}>Cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <NavItem className="mt-4 ml-5 mr-5">
                <NavLink><h1>Chalchitra</h1></NavLink>
            </NavItem>
            <NavItem className="mt-4 ml-5 mr-5">
                <NavLink><Button color="primary" className="rounded" style={{borderRadius:'1000px', backgroundColor:'white', color:'blue', borderWidth:'0'}} onClick={() => setOpen(true)}> <h3><HiOutlineUpload /></h3> </Button></NavLink>
            </NavItem>
            <NavItem className="mt-4 ml-5 mr-5">
                <NavLink><Button color="danger" className="rounded" style={{borderRadius:'1000px', backgroundColor:'white', color:'blue', borderWidth:'0'}} onClick={() => setOpen2(true)}> <h3><RiGitRepositoryPrivateFill /></h3> </Button></NavLink>
            </NavItem>
        </Nav>
    );
}

export default Navbarcomp;