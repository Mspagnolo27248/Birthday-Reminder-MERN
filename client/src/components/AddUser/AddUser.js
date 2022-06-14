import {useState} from 'react'
import Helmet from "react-helmet";
import { Navigation } from "../Navigation/Navigation"
import { useHistory } from "react-router-dom";
import './AddUser.css'

export const AddUser = () => {
    const history = useHistory();

const [newUser,setNewUser] = useState({
    firstname:'',
    lastname:'',
    birthday:'',
    group:'',
    reminder:''
});

const handleSubmit = (event) => {

    
    event.preventDefault();
    async function addUser() {
    await fetch("/User",{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: 
            JSON.stringify(newUser)
        })
    }
 
    addUser().then(res=> {
        console.log(res) 
        console.log(newUser)
        history.push({pathname: '/',
            state: {fromPath:'AddUser'}
        });
    })
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
       <Helmet>
          <title>Birthday Reminder</title>
        </Helmet>   
     
        <Navigation/>
    <div className='form-add'>

    
    <div className='form-add-header'>Create Contact</div>
    <div>
        <form  onSubmit={handleSubmit}>
            <div className=''>
                <label>First Name</label>
                <input name={"firstname"}
                    className={'input-txt'} 
                    type={'text'}
                    placeholder={'First Name'}
                    onChange={handleFormChange}>
                </input>
            </div>    

            <div className=''>
                <label>Last Name</label>
                <input 
                    name={"lastname"}
                    className={'input-txt'} 
                    type={'text'}
                    placeholder={'Last Name'}
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
                    onChange={handleFormChange}>
                </input>
            </div>
            <div>
                <button id='btn-adduser' className="btn btn-secondary" type='submit'>Add User</button>
            </div>
        </form>
    </div>
 
   
    </div>
    </div>
  )
}
