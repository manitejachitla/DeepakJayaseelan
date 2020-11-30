import React, {useEffect, useState} from 'react';
import { withRouter ,Link} from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../css/EditUser.css';
import Axios from "../Auth/Axios";
import TextField from "@material-ui/core/TextField";
import Modal from "react-modal";
function EditUser(props)
{
    const [user,setuser]=useState(null)
    const [modal,setmodal]=useState(false)
    const [val,setval]=useState(0)
    const [newuser,setnewuser]=useState({
        email: "",
        firstName: "",
        isActive: true,
        lastName: ""
    })
    useEffect(()=>
    {
        Axios.get(`/testUser/getMembers/${props.match.params.id}`)
            .then(res=>
            {
                console.log(res.data)
                setuser(res.data)
                let newobj=
                    {
                        email:res.data.email ,
                        firstName:res.data.firstName,
                        isActive: res.data.isActive,
                        lastName:res.data.lastName
                    }
                    setnewuser(newobj)
            })
    },[props.match.params.id, val])
    const handleChange = (event) => {
        setnewuser(prevState => ({
            ...prevState,
            isActive: event.target.value
        }));
    };
    const edituser=()=>
    {
        Axios.post(`testUser/editMembers/${props.match.params.id}`,newuser)
            .then(res=>
            {
                console.log(res.data)
                alert("Updated")
                setval(prevState => prevState+1)
                setmodal(false)
            })
    }
    const handleUserChange  =(name, value)=> {
        setnewuser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return(
        <div className={"EU_main_cont"}>
            <h2>EditUser</h2>
            {/*<h4>{user?._id}</h4>*/}
            <h4><span>First name:</span> {user?.firstName}</h4>
            <h4><span>Last name:</span>  {user?.lastName}</h4>
            <h4><span>Email:</span> {user?.email}</h4>
            <h4><span>Username:</span> {user?.username}</h4>
            <h4><span>isActive:</span> {user?.isActive?"True":"False"}</h4>
            <h4><span>created At:</span> {new Date(user?.createdAt).toString()}</h4>
            <h4><span>updated At:</span>  {new Date(user?.updatedAt).toString()}</h4>
            <div className={"EU_btn_cont"}>
                <Link to={"/"}>
                    <button className={"U_add_btn"} >Back</button>
                </Link>
                <button className={"U_add_btn"} onClick={()=>setmodal(true)}>Edit</button>
            </div>
            <Modal
                isOpen={modal}
                onRequestClose={()=>setmodal(false)}
                className={"Modal"}
                overlayClassName="Overlay"
            >
                <div className={"modal_cont"}>
                    <TextField id="standard-basic" style={{marginTop:20}} label="First Name" onChange={e=>handleUserChange("firstName",e.target.value)}  value={newuser.firstName}/>
                    <TextField id="standard-basic" style={{marginTop:20}} label="Last Name" onChange={e=>handleUserChange("lastName",e.target.value)} value={newuser.lastName}/>
                    <TextField id="standard-basic" style={{marginTop:20}} label="Email" onChange={e=>handleUserChange("email",e.target.value)} value={newuser.email}/>
                    <InputLabel id="demo-simple-select-helper-label" style={{marginTop:20,width: 250}}>Active</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={newuser.isActive}
                        onChange={handleChange}
                        style={{width: 250}}

                    >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                    </Select>
                    <button className={"U_add_btn"} onClick={edituser}>Update</button>
                </div>
            </Modal>
        </div>
    )

}
export default withRouter(EditUser);
