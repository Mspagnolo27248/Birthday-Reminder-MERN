import React from "react"
import Helmet from "react-helmet";
import { Navigation } from "../Nav/Nav"

import './Search.css'
import {people as data}   from '../../utils/data'
import {useState,useEffect} from  'react'
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Search(){cd
    const history = useHistory();
    const location = useLocation();


    const [searchInput,setSearchInput] = useState('')
    const [people,setPeople] = useState(data)
    const [filteredPeople,setFilteredPeople] = useState(people)


    useEffect(()=>{
        fetch("/User",{
            headers:{
                "accepts":"application/json"
            }
        })
        .then(response => response.json())
        .then(data =>{ 
            
            setPeople(data)
            console.log("Home Effect Ran")});
    },[])

   
    useEffect(()=>{
        const newFilteredPeople = people.filter((item) =>
      ((item.firstname+' '+item.lastname).toLowerCase().includes(searchInput.toLocaleLowerCase())))        
        setFilteredPeople(newFilteredPeople)       
    },[people,searchInput])


    const handleSearchChange = (e)=>{     
        setSearchInput(e.target.value)       
    }


    const handleClick = (event) => {
        event.preventDefault();   
        
        //after submit form redirect user
        history.push('/AddUser');
        
      };


    const handleEdit = (event) => {
        event.preventDefault(); 
          
        const person  = people.filter((e)=>(e._id === event.target.value))[0]
        //after submit form redirect user
        debugger
        history.push({pathname: '/EditUser',
       
        state: {
            mongoId:person._id,
            firstname:person.firstname||'',
            lastname:person.lastname||'',
            birthday:person.birthday||'',
            group:person.group||'',
            reminder:person.reminder||''
        }});
        
      };
    return (
        <div>
            <Helmet>
          <title>Birthday Reminder</title>
        </Helmet> 
        <Navigation/>
        <div className="header-margin"></div>
       
    <div>
    <input 
    className={"form-control form-control-lg search-main"} 
    type={"search"} 
    placeholder={"Search"}
    value={searchInput}
    onChange={handleSearchChange}>
    
    </input>
    </div>
    
    <div className={"btn-search"}>
    <button type={"button"} className={"btn btn-secondary btn-add"} onClick={handleClick} >Add</button>
    </div>

    

 
    <div className="card-list">
 
        {  filteredPeople.map((person)=> (
            <div className="card-container"> <h2 className="card-name">{(person.firstname+' '+person.lastname)}</h2>
             <h2 className="card-birthday"> Birthday: {person.birthday}</h2>
             <h2 className="card-group">{person.group}</h2>
             {/* Inputs */}
             <form>
             {/* <input type="hidden" id="mongoId" name="mongoId" value={person.id}/>
             <input type="hidden" id="firstname" name="firstname" value={person.firstname}/>
             <input type="hidden" id="lastname" name="lastname" value={person.lastname}/>
             <input type="hidden" id="group" name="group" value={person.group}/>
             <input type="hidden" id="reminder" name="reminder" value={person.reminder}/>
             <input type="hidden" id="birthday" name="birthday" value={person.birthday}/>              */}
             <button type={"submit"} className={"btn btn-primary "} value={person._id} onClick={handleEdit} ></button>
             </form>
           
             
             </div>))}
    </div>
        </div>
    )
}


export default Search;