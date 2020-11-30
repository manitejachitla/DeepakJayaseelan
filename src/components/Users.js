import React, {useEffect, useState} from 'react';
import '../css/User.css'
import Modal from 'react-modal';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Axios from "../Auth/Axios";
function Users()
{
    const [modal,setmodal]=useState(false)
    const [users,setusers]=useState([])
    const [start,setstart]=useState(0)
    const [end,setend]=useState(10)
    const [val,setval]=useState(0)
    const [tot,settot]=useState(0)
    const [pages,setpages]=useState([])
    const [user,setuser]=useState({
        firstName:"",
        lastName:"",
        email:"",
    })
    useEffect(()=>
    {
        Axios.patch('testUser/getMembers',{start,end})
            .then(res=>
            {
                console.log(res.data)
                setusers(res.data.data)
                settot(Math.ceil(res.data.count/10))
                setpages(new Array(Math.ceil(res.data.count/10)).fill(0))
            })
    },[val,end])
    useEffect(()=>
    {
        setend(start+10)
    },[start])
    const handleUserChange  =(name, value)=> {
        setuser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const addMember=async ()=>
    {
        if (user.firstName==="")
        {
            alert("Enter FirstName")
        }
        else
        {
            await Axios.post('testUser/addMember',user)
                .then(res=>
                {
                    console.log(res.data)
                    if (res.data.message==="Successful")
                    {
                        alert("Added")
                        setval(prevState => prevState+1)
                        setmodal(false)

                    }
                })
        }
        // console.log(user)
    }
    return(
        <div className={"U_main_cont"}>
            <div className="U_add_btn_cont">
                <button onClick={()=>setmodal(true)}>Add User</button>
            </div>
            <div className="U_pages_cont">
                <span>Pages</span>
                {
                    pages.map((item,index)=>
                        <span className={index*10===start?"U_selected_page":""} onClick={()=>
                        {
                            setstart(index*10)
                        }}>{index+item+1}</span>
                    )
                }
            </div>
            <table id="customers">
                <tr>
                    <th>S.No</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Active</th>
                    <th>Edit</th>
                </tr>
                {
                    users.map((item,index)=>
                        <tr>
                            <td>{index+1}</td>
                            <td>{item?.firstName}</td>
                            <td>{item?.lastName}</td>
                            <td>{item?.email}</td>
                            <td>{item?.username}</td>
                            <td className={"U_active_td"}><div className={item.isActive?"U_active":"U_n_active"}></div></td>
                            <td>
                                <Link to={`/user/${item._id}`}>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    )
                }
            </table>
            <Modal
                isOpen={modal}
                onRequestClose={()=>setmodal(false)}
                className={"Modal"}
                overlayClassName="Overlay"
            >
                <div className={"modal_cont"}>
                    <TextField id="standard-basic" style={{marginTop:20}} label="First Name" onChange={e=>handleUserChange("firstName",e.target.value)}  value={user.firstName}/>
                    <TextField id="standard-basic" style={{marginTop:20}} label="Last Name" onChange={e=>handleUserChange("lastName",e.target.value)} value={user.lastName}/>
                    <TextField id="standard-basic" style={{marginTop:20}} label="Email" onChange={e=>handleUserChange("email",e.target.value)} value={user.email}/>
                    <button className={"U_add_btn"} onClick={addMember}>Add</button>
                </div>
            </Modal>
        </div>
    )

}
export default Users;
