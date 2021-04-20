import React from 'react';
import AppStore from './AppStore'

class TableComponent extends React.Component{

    state = { 
        drawshapes:[]
    }

    setDrawShapes (val){
        this.setState({
            drawshapes: val
        })
    }


    componentDidMount=()=>{
        tableinstance=this
    }

    renderSingleRow(drawshape){
        return(
            <>
            <tr>
            <th scope="row">{drawshape.shapename}</th>
            <td></td>
            <td></td>
            <td></td>
            <td>{drawshape.basicshape}</td>
            <td></td>
            <td>{drawshape.dimA}</td>
            <td>{drawshape.dimB}</td>
            <td>{drawshape.dimAngleA}</td>
            <td>{drawshape.dimC}</td>
            <td>{drawshape.dimAngleB}</td>
            <td>{drawshape.D}</td>
            <td></td>
            </tr>
            </>
        )
    }

    renderRows(){
        let tablearray = AppStore.drawShapes;
        console.log(tablearray)
        console.log(this.state.drawshapes)
        if(tablearray !== null){             
            return (
                Array.from(this.state.drawshapes.values()).map((drawshape,index)=>(
                    this.renderSingleRow(drawshape)
                ))
            )
        }
        return null        
      }


    render(){
        return(
            <>
            <table className="table table-bordered table-responsive-sm">
            <thead>
                <tr>
                <th rowSpan="2" scope="col">Name</th>
                <th rowSpan="2" scope="col">Overall (x) mm</th>
                <th rowSpan="2" scope="col">Overall (y) mm</th>
                <th rowSpan="2" scope="col">Overall (z) mm</th>
                <th rowSpan="2" scope="col">shape</th>
                <th rowSpan="2" scope="col">view</th>
                <th colSpan="6">Dimensions</th>
                <th rowSpan="2" scope="col">Remarks</th>
                </tr>
                <tr>
                <th scope="col">A</th>
                <th scope="col">B</th>
                <th scope="col">AG</th>
                <th scope="col">C</th>
                <th scope="col">AG</th>
                <th scope="col">D</th>
                </tr>
            </thead>
            <tbody>
                {this.renderRows()}                 
            </tbody>
            </table>
            </>
        )
    }
}

export let tableinstance=null;
export default TableComponent;