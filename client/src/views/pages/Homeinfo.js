import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CButton,
   
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
   
   
    CForm,
    CFormGroup,
   
    CInput,
   
    CLabel,
   
} from '@coreui/react'

import { Link } from 'react-router-dom';
const Homeinfo = () => {
    const [data, setdata] = useState([])
    const [title, settitle] = useState("")
    const [text, settext] = useState("")
    const [myImage, setimage] = useState(null)
    const [effect, seteffect] = useState(false);
    
    const [large, setLarge] = useState(false)
    const [courseLink, setUrl] = useState("");
    const [id, setId] = useState("");
    const [primary, setPrimary] = useState(false)



    const deletefn = async (id) => {
      
        await axios.delete(`http://localhost:5000/deletecourse/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth':localStorage.getItem('auth')
            }
        }).then(data => {
            
            seteffect(data)
            alert('Course Deleted')
        }).catch(err => {
            console.log(err);
        })

    }

    const setedit = async (id,title,text,link,image) => {
        setUrl(link);
        setimage(image);
        settitle(title);
        settext(text);
        setId(id);
        setPrimary(!primary)
    }
   

    const addcourse = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', myImage);
        formData.append('title', title);
        formData.append('text', text);
        formData.append('courseLink', courseLink);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'auth':localStorage.getItem('auth')
            }
        };

        axios.post("/addcourse", formData, config).then(data => {
           
            setUrl("");
            setimage("");
            settitle("");
            settext("");
            setId("");
            setLarge(!large);
             seteffect(data);


        }).catch(err => {
            console.log(err);
        })

    }
    const editcourse = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', myImage);
        formData.append('title', title);
        formData.append('text', text);
        formData.append('courseLink', courseLink);
        


        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'auth':localStorage.getItem('auth')
            }
        };

        axios.post(`/editcourse/${id}`, formData, config).then(data => {
            setUrl("");
            setimage("");
            settitle("");
            settext("");
            setId("");
            setPrimary(!primary);
             seteffect(data);


        }).catch(err => {
            console.log(err);
        })

    }


    useEffect(() => {
        axios.get(`http://localhost:5000/getcourse`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth':localStorage.getItem('auth')
            }
        }).then(data => {
            console.log(data.data);
            setdata(data.data);

        }).catch(err => {
            console.log(err);
        })

    }, [effect])
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
                    <ul id="portfolio-flters nav-item">
                        <li className="filter-active nav-link d-inline-flex"><Link to="/Supperadmintables">Home</Link></li>
                        <li className="filter-active nav-link d-inline-flex"><Link to="/superadminforms">Forms</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link to="/Topicstable">Topics Table</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link to="/getcomment">Comments and Releted Posts</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link to="/usersinfo">User's Info</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link to="/PostQuestion">Add A Question</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link to="/AllQuestion">All Question</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link to="/homeinfo">Home Info</Link></li>

                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
                    <ul id="portfolio-flters nav-item">
                        <li className="filter-active nav-link d-inline-flex"><Link to="/homeinfo">Features List</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link to="/teachers">Teachers</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="p-2"> <Link to="/">Back to Home</Link></div>
                    <div className="p-2"><button type="submit" className="btn btn-primary" onClick={() => setLarge(!large)} className="mr-1">Add Course</button></div>
                </div>

                <div className="col-md-12 ">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Text</th>
                                <th>Link</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                            {data.map((item, index) => {
                                return(
                                <tr key={index}>
                                    <td>{item.title}
                                    </td>
                                    <td>{item.text}
                                    </td>
                                    <td><a href={`${item.courseLink}`} target="_blank">Check it</a>
                                    </td>
                                    <td><img src={`./uploads/${item.image}`} width="50" height="50"alt="" /></td>
                                    <td> <button type="submit" className="btn btn-primary"onClick={()=>setedit(item._id,item.title,item.text,item.courseLink,item.image)} className="mr-1">Edit</button><button type="button" className="mr-1" onClick={()=>deletefn(item._id)}>Delete</button> </td>


                                </tr>
                                )
                            })}


                        </tbody>
                    </table>

                </div>
            </div>

            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size="lg"
            >
                <CForm encType="multipart/form-data" onSubmit={addcourse}>
                    <CModalHeader closeButton>
                        <CModalTitle>Add a course</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup>
                            <CLabel htmlFor="vat">Add a Title</CLabel>
                            <CInput id="vat" name="title" value={title} placeholder="Title" onChange={(e) => settitle(e.target.value)} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="vat">Add a Text</CLabel>
                            <CInput id="vat" name="text" value={text} placeholder="Simple Intro" onChange={(e) => settext(e.target.value)} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="vat">Add Course Link</CLabel>
                            <CInput name="courseLink" value={courseLink} placeholder="Add Youtube Url" onChange={(e) => setUrl(e.target.value)} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="vat">Add a Image</CLabel>
                            <CInput name="myImage" type="file" onChange={(e) => setimage(e.target.files[0])} />
                        </CFormGroup>

                    </CModalBody>
                    <CModalFooter>
                        <CButton color="primary" type="submit">ADD</CButton>{' '}
                        <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
            <CModal 
              show={primary} 
              onClose={() => setPrimary(!primary)}
              color="primary"
            >
              <CForm encType="multipart/form-data" onSubmit={editcourse}>
                    <CModalHeader closeButton>
                        <CModalTitle>Add a course</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup>
                            <CLabel htmlFor="vat">Add a Title</CLabel>
                            <CInput id="vat" name="title" value={title} placeholder="Title" onChange={(e) => settitle(e.target.value)} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="vat">Add a Text</CLabel>
                            <CInput id="vat" name="text" value={text} placeholder="Simple Intro" onChange={(e) => settext(e.target.value)} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="vat">Add Course Link</CLabel>
                            <CInput name="courseLink" value={courseLink} placeholder="Add Youtube Url" onChange={(e) => setUrl(e.target.value)} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="vat">Add a Image</CLabel>
                            <CInput name="myImage" type="file" onChange={(e) => setimage(e.target.files[0])} />
                        </CFormGroup>

                    </CModalBody>
                    <CModalFooter>
                        <CButton color="primary" type="submit">Save Edit</CButton>{' '}
                        <CButton color="secondary" onClick={() =>setPrimary(!primary)}>Cancel</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>

        </div>
    );

}

export default Homeinfo;