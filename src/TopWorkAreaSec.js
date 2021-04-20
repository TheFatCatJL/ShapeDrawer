import React from 'react';
import Form from 'react-bootstrap/Form'

function TopWorkAreaSec () {
    return (
        <Form inline>
                <Form.Label className="d-block" column sm="2">
                    Shape Name
                </Form.Label>
                <Form.Control as="select">
                        <option>Cube</option>
                        <option>Rectangle Block</option>
                        <option>Angled Block</option>
                </Form.Control>
                <Form.Label column sm="2">
                    Canvas Dimension
                </Form.Label>
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id="twa-length-input"
                    placeholder="X"
                />
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id="twa-breadth-input"
                    placeholder="Y"
                />
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id="twa-height-input"
                    placeholder="Z"
                />
            </Form>
    )
};

export default TopWorkAreaSec;