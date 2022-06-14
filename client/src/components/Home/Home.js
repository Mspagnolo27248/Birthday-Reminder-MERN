import React from "react"
import './Home.css'
import Helmet from "react-helmet";
import { Navigation } from "../Navigation/Navigation"

import {people as data}   from '../../utils/data'
import {useState,useEffect} from  'react'
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const monthNames = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"]

function Home(){
    const history = useHistory();
    const location = useLocation();


    const [people,setPeople] = useState(data)
    const [monthDict,setMonthDict] = useState({})


useEffect(()=>{
    fetch("http://localhost:5000/User",{
    headers:{
        "accepts":"application/json"
    }
    })
    .then(response => response.json())
    .then(data =>{ 
        
    setPeople(data)
     const mydict = {}
    //Create people dict
    data.map((item)=>{
        const itemDate = new Date(item.birthday)
        const itemMonth = itemDate.getMonth();
        if(mydict.hasOwnProperty(itemMonth)){
            mydict[itemMonth].push(item)
        }else{
            mydict[itemMonth] = [item]
        }
       
    })
    setMonthDict(mydict)
    console.log(mydict)
    console.log("Home Effect Ran")});
    },[])

   
    // const nth = function(d) {
    //     if (d > 3 && d < 21) return 'th';
    //     switch (d % 10) {
    //       case 1:  return "st";
    //       case 2:  return "nd";
    //       case 3:  return "rd";
    //       default: return "th";
    //     }
    //   }
      

 



       
      
    return (
        <div>
            <Helmet>
          <title>Birthday Reminder</title>
        </Helmet>   
     
        <Navigation/>

     

        <div className="header-margin"></div>
       
        
  <div className="list-home">

 
       {
        Object.keys(monthDict).map((key)=>{
            
            return (
                   <div> 
                   <h1>{monthNames[key]}</h1>
                   { console.log(key)}
                   {console.log(monthDict[key])}
                   {
                     
                       monthDict[key]
                       .sort((a,b) => (a.birthday.slice(-2) > b.birthday.slice(-2)) ? 1 : ((b.birthday.slice(-2) > a.birthday.slice(-2)) ? -1 : 0))
                       .map((item)=>{return (<h2>{item.firstname+' '+item.lastname+' '+item.birthday.slice(-2)}</h2>)})
                   }

                   </div>
                   )
                   })
       }
       </div>
          


     
           
             
    </div>
    )}



export default Home;