import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AppStore from './AppStore'
import {comtabinstance} from './ComponentTabs'
import { tableinstance } from './TableComponent';

class ParamModel extends React.Component {

    state = {
        xnum:0,
        ynum:0,
        znum:0,
        angleA:0,
        shapename:"",
        basicshape:"Rectangular Block",
        isGrey:true,
        show:false
    }
    
    componentDidMount(){
        this.baseState = this.state 
    }

    resetModel = () => {
        this.setState(this.baseState)
    }

    setShow (val){
        this.resetModel()
        this.setState({
            show: val
        })
    }

    handleClose = () => this.setShow(false);
    handleShow = () => this.setShow(true);

    handleCreate = evt => { 
        evt.preventDefault();    
        let addCurrentNum = AppStore.drawShapes.size+1;  
        AppStore.addDrawShape(addCurrentNum,this.state.shapename);
        let handler = AppStore.getDrawShape(addCurrentNum);
        handler.setDimA(parseInt(this.state.xnum));
        handler.setDimB(parseInt(this.state.ynum));
        handler.setDimC(parseInt(this.state.znum));
        handler.setName(this.state.shapename);
        handler.setAngleA(parseInt(this.state.angleA));
        handler.setBasicShape(this.state.basicshape);
        handler.setIndexNum(addCurrentNum);
        comtabinstance.addMyTabs(addCurrentNum, this.state.basicshape)
        tableinstance.setDrawShapes(AppStore.drawShapes);        
        tableinstance.renderRows()
        this.handleClose();
    } 



    checkValid =() => {
        if (this.state.xnum > 0 && this.state.ynum > 0 && this.state.znum > 0 && !!this.state.shapename){
            this.setState({ isGrey: false })
        } else {
            this.setState({ isGrey: true })
        }
    }

    updateInputValue = evt => {
        switch(evt.target.id)
        {
            case "modal-x-input":
                this.setState({ xnum: evt.target.value })
                break;
            case "modal-y-input":
                this.setState({ ynum: evt.target.value })
                break;
            case "modal-z-input":
                this.setState({ znum: evt.target.value })
                break;
            case "modal-angleA-input":
                this.setState({ angleA: evt.target.value })
                break;
            case "basicshape-selector":
                this.setState({ basicshape: evt.target.value })
                break;
            case "basicshape-name":
                this.setState({ shapename: evt.target.value })
                break;    
            default:
                break;
        }
        this.checkValid();        
    };

    render(){
        return (
        <React.Fragment>
            <Form className="px-3">
                    {/* <div id="jsondiv">{JSON.stringify(AppStore)}</div> */}
                    <Button variant="primary" onClick={this.handleShow}>
                    Create New Shape
                    </Button>
            </Form>
            <Modal
            animation={false}
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Create New Shape</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="basicshape-selector">
                        <Form.Label column sm="4">
                            Choose Basic Shape
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control as="select" custom onChange={evt => this.updateInputValue(evt)}>
                                <option value="Rectangular Block">Rectangular Block</option>
                                <option value="Angled Block">Angled Block</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="basicshape-name">
                        <Form.Label column sm="3">
                            Shape Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='text'
                                placeholder=""
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="modal-x-input">
                        <Form.Label column sm="3">
                        Length
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='number'
                                placeholder={0}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="modal-y-input">
                        <Form.Label column sm="3">
                        Breadth
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='number'
                                placeholder={0}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="modal-z-input">
                        <Form.Label column sm="3">
                        Height
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='number'
                                placeholder={0}
                            />
                        </Col>
                    </Form.Group>
                    {this.state.basicshape === "Angled Block" &&
                    <Form.Group as={Row} controlId="modal-angleA-input">
                        <Form.Label column sm="3">
                            Angle A (X-Y Axis)
                            </Form.Label>
                            <Col sm="4">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='number'
                                placeholder={0}
                             />
                            </Col>
                        </Form.Group>
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                <Button disabled={this.state.isGrey} variant="primary" onClick={e=>this.handleCreate(e)}>{this.state.isGrey ? "Invalid Creation" : "Create Now"}</Button>
            </Modal.Footer>
            </Modal>
        </React.Fragment>
        );
    }
}

export default ParamModel;