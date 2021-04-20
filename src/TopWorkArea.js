import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import React from 'react';

class TopWorkArea extends React.Component {
    state = {
        radio_check:"twa-radio-3d"
    }
    onRadioSelect = e => {
        let prevradio = this.state.radio_check;
        this.setState({
            radio_check:e.target.id
        })
        if(prevradio !== e.target.id){
            document.getElementById(prevradio).checked = false
        }
    }

    radioitems = [
            {key: "twa-radio-plan", label:"Plan"},
            {key: "twa-radio-top", label:"Top"},
            {key: "twa-radio-side", label:"Side"},
            {key: "twa-radio-3d", label:"3D View"}
            ];
    
    render() {
        return(     
        <Form inline>
            <Form.Label className="d-block" column sm="2">
                    Project Name
            </Form.Label>
            <Form.Label className="d-block font-weight-bold" column sm="3">
                <span id="projectname"></span>
            </Form.Label>            

            <Col sm={{ span: 3, offset: 4 }}>
                <Form.Group id="radiogroup">
                {}
                {this.radioitems.map(radioitem => ( 
                    <Form.Check label={radioitem.label} type="radio" id={radioitem.key} key={radioitem.key} className="mb-2 mr-sm-2" onChange={this.onRadioSelect} />
                ))}                    
                </Form.Group>
            </Col>
        </Form> 
        ) 
    }
}

export default TopWorkArea;
