import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AppStore from './AppStore'
import CanvasSection from './CanvasSection'
import {comtabinstance} from './ComponentTabs'
import { tableinstance } from './TableComponent';

class RenderAngledBlockModel extends React.Component {

    state = {
        drawshapeNum:this.props.shapenum,
        xnum:0,
        ynum:0,
        znum:0,
        angleA:0,
        shapename:"",
        basicshape:"Angled Block",
        isGrey:true,
        show:false
    }

    setShow (val){
        this.setState({
            show: val
        })
    }

    handleClose = () => this.setShow(false);

    handleShow = () => {
        let CurrentNum = this.state.drawshapeNum;
        let handler = AppStore.getDrawShape(CurrentNum);
        this.setState({
            xnum : handler.dimA,
            ynum : handler.dimB,
            znum : handler.dimC,
            angleA: handler.dimAngleA,
            shapename: handler.shapename,
            basicshape: handler.basicshape
        })
        this.setShow(true)
    }

    handleEdit = evt => {
        evt.preventDefault();   
        let CurrentNum = this.state.drawshapeNum;
        let handler = AppStore.getDrawShape(CurrentNum);
        handler.setDimA(parseInt(this.state.xnum));
        handler.setDimB(parseInt(this.state.ynum));
        handler.setDimC(parseInt(this.state.znum));
        handler.setAngleA(parseInt(this.state.angleA));
        handler.setBasicShape(this.state.basicshape);
        handler.setName(this.state.shapename); 
        comtabinstance.setKey(this.state.shapename); 
        tableinstance.setDrawShapes(AppStore.drawShapes);
        tableinstance.renderRows()      
        this.handleClose();
    } 



    checkValid =() => {
        if (this.state.xnum > 0 && this.state.ynum > 0 && this.state.znum > 0 && this.state.angleA> 0 && !!this.state.shapename){
            this.setState({ isGrey: false })
        } else {
            this.setState({ isGrey: true })
        }
    }

    updateInputValue = evt => {
        switch(evt.target.id)
        {
            case "angmodal-x-input":
                this.setState({ xnum: evt.target.value })
                break;
            case "angmodal-y-input":
                this.setState({ ynum: evt.target.value })
                break;
            case "angmodal-z-input":
                this.setState({ znum: evt.target.value })
                break;
            case "angmodal-anglea-input":
                this.setState({ angleA: evt.target.value })
                break;
            case "angmodal-basicshape-name":
                this.setState({ shapename: evt.target.value })
                break;    
            default:
                break;
        }
        this.checkValid();        
    };

    render(){
        return (
        <>
            <Form className="px-3">
                <Button variant="primary" onClick={this.handleShow}>
                    Edit {this.state.shapename}
                </Button>
            </Form>
            <CanvasSection myshapenum={this.state.drawshapeNum}/>
            <Modal
            animation={false}
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Edit {this.state.shapename}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="basicshape-selector">
                        <Form.Label column sm="4">
                            Basic Shape
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control defaultValue={this.state.basicshape} as="select">
                                <option>Angled Block</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="angmodal-basicshape-name">
                        <Form.Label column sm="3">
                            Shape Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='text'
                                placeholder={this.state.shapename}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="angmodal-x-input">
                        <Form.Label column sm="3">
                        Length
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='number'
                                value={this.state.xnum}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="angmodal-y-input">
                        <Form.Label column sm="3">
                        Breadth
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='number'
                                value={this.state.ynum}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="angmodal-z-input">
                        <Form.Label column sm="3">
                        Height
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='number'
                                value={this.state.znum}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="angmodal-anglea-input">
                        <Form.Label column sm="3">
                        Angle A (X-Y Axis)
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                onChange={evt => this.updateInputValue(evt)}
                                type='number'
                                value={this.state.angleA}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Cancel
                </Button>
                <Button disabled={this.state.isGrey} variant="primary" onClick={e=>this.handleEdit(e)}>{this.state.isGrey ? "Invalid Edit" : "Edit"}</Button>
            </Modal.Footer>
            </Modal>
        </>
        );
    }
}

export default RenderAngledBlockModel;