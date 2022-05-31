import {useState} from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export const EditUser = () => {
    const history = useHistory();
    const location = useLocation();

const [newUser,setNewUser] = useState({
    firstname:location.state.firstname,
    lastname:location.state.lastname,
    birthday:location.state.birthday,
    group:location.state.group,
    reminder:location.state.reminder,
    mongoId: location.state.mongoId
});




const handleSubmit = (event) => {
    
    event.preventDefault();
    async function editUser(){
    const res = await
    fetch("/User",{
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: 
            JSON.stringify(newUser)
    })
    }
    //after submit form redirect user
    editUser().then(res=>{
        console.log("Edit Then")
        history.push({pathname: '/',           
        state: {fromPath:'EditUser'}
        });
    });
};

const handleDelete = (event)=>{
      
    event.preventDefault();

    async function delUser(){
    const res = await
    fetch("http://localhost:5000/User",{
        method: 'delete',
        headers: {'Content-Type':'application/json'},
        body: 
            JSON.stringify(newUser) 
        })
    }
    
    delUser().then(res=>{
        console.log(newUser)
        history.push('/');  
    });
};
  


const handleFormChange = (e)=>{
const currentUser = newUser
const key = e.target.name
const value = e.target.value
currentUser[key]=value
setNewUser(currentUser)
}


  return (
    <div>
    <div className='form-add'>

    
    <div className='form-add-header'>Edit Contact</div>
    <div>
        <form  onSubmit={handleSubmit}>
            <div className=''>
                <label>First Name</label>
                <input name={"firstname"}
                    className={'input-txt'} 
                    type={'text'}
                    placeholder={'First Name'}
                    onChange={handleFormChange}
                    defaultValue={location.state.firstname}>
                </input>
            </div>    

            <div className=''>
                <label>Last Name</label>
                <input 
                    name={"lastname"}
                    className={'input-txt'} 
                    type={'text'}
                    placeholder={'Last Name'}
                    defaultValue={location.state.lastname}
                    onChange={handleFormChange}>
                </input>
            </div>

            <div className='select'>
                <div>
                <label className=''>Group</label>
                </div>
                
                <select 
                name={"group"}
                class="form-control select" 
                id="drp-group"
                select={location.state.group}
                onChange={handleFormChange}>
                    
                    <option value='family'>Family</option>
                    <option value='friend'>Friend</option>
                    <option value='work'>Work</option>
                </select>
            </div>

            <div className=''>
                <label>Birthday</label>
                <input 
                    name={'birthday'}
                    className={'input-txt'} 
                    type={'date'}

                    defaultValue={location.state.birthday}
                    onChange={handleFormChange}>
                </input>
            </div>

            <div className=''>
                <label>Remind Me Days Before</label>
                <input 
                    name={"reminder"}
                    className={'input-txt'} 
                    type={'text'}
                    placeholder={'Days before'}
                    defaultValue={location.state.reminder}
                    onChange={handleFormChange}>
                </input>
            </div>
            <div>
                <button id='btn-adduser' className="btn btn-secondary" type='submit'>Update</button>
            </div>
        </form>
    </div>
 
   
    </div>
    <div>
        <button className='btn btn-primary' onClick={handleDelete}>Delete</button>
    </div>
    </div>
  )
}
