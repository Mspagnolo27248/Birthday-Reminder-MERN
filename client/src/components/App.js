import React from "react"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from "./Home/Home"
import Search from "./Search/Search"
import Card from "./Card"
import './App.css'
import './AddUser/AddUser'
import { AddUser } from "./AddUser/AddUser"
import {EditUser} from "./EditUser/EditUser"
function App(){
    return (

<Router>
    <div>
        <Switch>
            <Route exact path ="/">
                <Home/>
            </Route>
            <Route exact path ="/AddUser">
                <AddUser/>
            </Route>
             <Route exact path ="/EditUser">
                <EditUser/>
            </Route>
            <Route exact path ="/Search">
                <Search/>
            </Route>
            <Route exact path ="/cards">
                <Card name="Mike" email="mspagnolo@gmail.com" password="passwords1235!"/>
            </Route>
        </Switch>
    </div>
</Router>

    )
}


export default App;