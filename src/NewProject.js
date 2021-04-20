import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AppStore from './AppStore'
import ReactDOM from 'react-dom'
import ParamModel from './ParamModel'

class NewProject extends React.Component {
    state = {
        projname:"",
        isGrey:true,
        show:true
    }

    setShow (val){
        this.setState({
            show: val
        })
    }

    handleClose = () => this.setShow(false);
    handleShow = () => this.setShow(true);

    handleCreate = evt => { 
        evt.preventDefault();   
        AppStore.setProjectname(this.state.projname);
        this.handleClose();
        ReactDOM.render(<ParamModel />,document.getElementById("editarea"))
        document.getElementById("projectname").innerText = this.state.projname
    } 

    checkValid =() => {
        if (!!this.state.projname){
            this.setState({ isGrey: false })
        } else {
            this.setState({ isGrey: true })
        }
    }

    updateInputValue = evt => {
        this.setState({ projname: evt.target.value })
        this.checkValid();        
    };

    render(){
        return (
        <React.Fragment>    
            <Modal
            animation={false}
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Create New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="newprojname">
                        <Form.Label column sm="4">
                            Project Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='text'
                                placeholder=""
                            />
                        </Col>
                    </Form.Group>                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                <Button disabled={this.state.isGrey} variant="primary" onClick={e=>this.handleCreate(e)}>{this.state.isGrey ? "Please name your project" : "Create Project"}</Button>
            </Modal.Footer>
            </Modal>
        </React.Fragment>
        );
    }
    
}

export default NewProject;