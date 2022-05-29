
import React from 'react'

function Card(props){
return(
    <div className='card'>
        <h1>  {props.name}  </h1>
        <p>Email: {props.email}</p>
        <p>Password: {props.password}</p>
    </div>
)
}


export default Card;