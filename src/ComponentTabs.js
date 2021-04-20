import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import AppStore from './AppStore';
import RenderRegBlockModel from './RenderRegBlockModal';
import RenderAngledBlockModel from './RenderAngledBlockModal';

class ComponentTabs extends React.Component {
    
    state = { 
      key:'hmmm',
      TabArray:[]
    }

    componentDidMount=()=>{
      comtabinstance = this
    }

    setKey (val){
      this.setState({
          key: val
      })
    }

    emptyTabArray(){
        this.setState({
            TabArray: []
        })
    }

    renderTabArray(){
      let tabarray = this.state.TabArray;
      return (
        <Tabs id="componenttab" activeKey={this.state.key} onSelect={(k) => this.setKey(k)}>           
        {tabarray.map((drawshape,index)=>(
          this.renderTab(drawshape,index)
        ))}                   
        </Tabs> 
      )
    }

    renderRectTab(drawshapenum){
      return <RenderRegBlockModel shapenum={drawshapenum}/>
    }

    renderAngleTab(drawshapenum){
      return <RenderAngledBlockModel shapenum={drawshapenum}/>
    }

    renderTab(drawshape,index){
      let handler = AppStore.getDrawShape(drawshape.shapenum);
      return(
      <Tab key={index} shapenum={drawshape.shapenum} eventKey={handler.shapename} title={handler.shapename}> 
        {drawshape.baseshape === "Rectangular Block" 
        ? this.renderRectTab(drawshape.shapenum) 
        : this.renderAngleTab(drawshape.shapenum) 
        }
      </Tab> 
      )     
    }



    addMyTabs(key,baseshape){
      let handler = AppStore.getDrawShape(key);
      let pendingtab = {name: handler.shapename, baseshape:baseshape, shapenum: key};
      this.state.TabArray.push(pendingtab);
      this.setKey(pendingtab.name);
    }

    render(){
      return (      
            <>
              {this.renderTabArray()} 
            </>
      );
    }
  }

export let comtabinstance=null;
export default ComponentTabs;