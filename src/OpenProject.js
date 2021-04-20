import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AppStore from './AppStore'
import ReactDOM from 'react-dom'
import ParamModel from './ParamModel'
import { comtabinstance } from './ComponentTabs';
import { tableinstance } from './TableComponent';

class OpenProject extends React.Component {
    state = {
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
        let myfilename= document.getElementById("filepathhandler").files[0]; 
        let reader = new FileReader();
        reader.onload = function() {
            let text = reader.result;              
            AppStore.mapModel(JSON.parse(text)) 
        };
        reader.readAsText(myfilename);
        reader.onloadend = function (){            
            document.getElementById("projectname").innerText = AppStore.getProjectname()
            ReactDOM.render(<ParamModel />,document.getElementById("editarea"))
            comtabinstance.emptyTabArray();
            Array.from(AppStore.drawShapes.values()).map((drawshape,index)=>(
                comtabinstance.addMyTabs(drawshape.indexnum,drawshape.basicshape)            
            ))
            comtabinstance.renderTabArray();
            tableinstance.setDrawShapes(AppStore.drawShapes);
            tableinstance.renderRows()
        }
        this.handleClose();
    }

    checkValid =evt => {
        this.setState({ isGrey: false })
    }

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
                <Modal.Title>Open Existing Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.File>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Project Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.File.Input id="filepathhandler" onChange={e=>this.checkValid(e)} />
                        </Col>
                    </Form.Group>                    
                </Form.File>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                <Button disabled={this.state.isGrey} variant="primary" onClick={e=>this.handleCreate(e)}>{this.state.isGrey ? "Please choose file" : "Open Project"}</Button>
            </Modal.Footer>
            </Modal>
        </React.Fragment>
        );
    }
    
}

export default OpenProject;