

import React from 'react'
import { Navbar,Nav } from 'react-bootstrap'


export const Navigation = () => {
  return (
    <div>

<Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand> Birthday Reminders</Navbar.Brand>
            <Navbar.Toggle/>

            <Navbar.Collapse>
            <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Search">Search</Nav.Link>
                <Nav.Link href="/AddUser">Add</Nav.Link>
            </Nav>
            </Navbar.Collapse>
         
        </Navbar>
    </div>
  )
}