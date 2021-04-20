import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
//import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import React from 'react';
import ReactDOM from 'react-dom'
import NewProject from './NewProject';
import SaveLocal from './SaveLocal';
import AppStore from './AppStore';
import OpenProject from './OpenProject';

export default class TopNavbar extends React.Component{

    popNewModal = evt =>{
        ReactDOM.render(<NewProject/>,document.getElementById("editarea"))
    }

    exportProject = evt =>{
        SaveLocal(AppStore)
    }

    openProject = evt =>{
        ReactDOM.render(<OpenProject />,document.getElementById("editarea"))
    }

    render(){
        return(   
            <>     
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">NatSteel</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">            
                <NavDropdown title="File" id="collasible-nav-dropdown">
                    <NavDropdown.Item eventKey="newproj" onClick={evt=>this.popNewModal(evt)}>
                        New
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="openproj" onClick={evt=>this.openProject(evt)}>Open</NavDropdown.Item>
                    <NavDropdown.Item eventKey="exportproj" onClick={evt=>this.exportProject(evt)}>Export</NavDropdown.Item>                
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/file.exit">Exit</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#details">Details</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <Routes />
            </>
        )
    }    
};