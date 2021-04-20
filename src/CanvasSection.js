import React, { useRef, useEffect } from 'react'
import AppStore from './AppStore';

const handleDrawingBlock = (ctx,dimension) =>{
    let canvasX = dimension.canvaswt;
    let canvasY = dimension.canvasht;
    //let canvasZ = 1000;
    let detail_offset = 20;
    //let isoangle = 45;
    let xvector = dimension.length;
    let yvector = dimension.height;
    let zvector = dimension.breadth;

    // position for Z axis, efffectively (x 1st origin + cos 30 x height, y 1st origin + sin 30 x height)
    // sin 30 = y point / height => y point = sin 30 x height
    // cos 30 = x point / height => x point = cos 30 x height
       
    let max_xvector = xvector + Math.abs(Math.cos(-Math.PI/4) * zvector);
    let max_yvector = yvector + Math.abs(Math.sin(-Math.PI/4) * zvector);
    let scaling = 1;
    if (max_xvector >= canvasX / 2 || max_yvector >= canvasY / 2 ){
      scaling = Math.round(Math.max((max_xvector,max_yvector)) / canvasX) + 1;
    }
    if (scaling > 1){
      xvector = dimension.length / scaling;
      yvector = dimension.height / scaling;
      zvector = dimension.breadth / scaling;
    }
    let iso_offset_x = Math.cos(-Math.PI/4) * zvector; 
    let iso_offset_y = Math.sin(-Math.PI/4) * zvector; 
    let first_origin_x = canvasX/2- xvector/2;
    let first_origin_y = canvasY/2;
    let second_origin_x = first_origin_x + iso_offset_x;
    let second_origin_y = first_origin_y + iso_offset_y;
    ctx.strokeStyle = "black";

    // position x-y centre
    ctx.moveTo(first_origin_x, first_origin_y);
    // first move along x-axis
    ctx.lineTo(first_origin_x + xvector, first_origin_y)
    // move along y axis 
    ctx.lineTo(first_origin_x + xvector, first_origin_y + yvector);
    // move back to x origin point
    ctx.lineTo(first_origin_x, first_origin_y + yvector);
    // move back to x-y origin, first 4 points complete
    ctx.lineTo(first_origin_x, first_origin_y);


    // first line to 2nd set
    ctx.lineTo(second_origin_x, second_origin_y);
    // first move along x-axis
    ctx.lineTo(second_origin_x + xvector, second_origin_y);
    //link back and return
    ctx.lineTo(first_origin_x + xvector, first_origin_y);
    ctx.moveTo(second_origin_x + xvector, second_origin_y);
    // move along y axis
    ctx.lineTo(second_origin_x + xvector, second_origin_y + yvector);
    //link back and return
    ctx.lineTo(first_origin_x + xvector, first_origin_y + yvector);
    ctx.moveTo(second_origin_x + xvector, second_origin_y + yvector);
    // move back to x origin point    
    ctx.lineTo(second_origin_x, second_origin_y + yvector);
    //link back and return
    ctx.lineTo(first_origin_x, first_origin_y + yvector);
    ctx.moveTo(second_origin_x, second_origin_y + yvector);
    // last line
    ctx.lineTo(second_origin_x, second_origin_y);
    ctx.stroke();

    // detail Scaling
    ctx.fillStyle = '#000000'
    ctx.font = "16px Arial Bold";
    ctx.fillText("Scaling at " + scaling + ":1",canvasX/2, 25);

    ctx.fillStyle = '#000000'
    ctx.font = "10px Arial";
    // detail Length
    ctx.fillText("L="+xvector*scaling, first_origin_x + xvector/2 - (detail_offset >= 20 ? detail_offset : 20) , first_origin_y + yvector + (detail_offset >= 20 ? detail_offset : 20));
    // detail Breadth
    ctx.fillText("H="+yvector*scaling, second_origin_x + xvector + (detail_offset >= 20 ? detail_offset : 20) ,second_origin_y + yvector/2);
    // detail Height
    ctx.fillText("B="+zvector*scaling, first_origin_x + xvector + iso_offset_x/2 + (detail_offset >= 20 ? detail_offset : 20) ,second_origin_y + yvector - iso_offset_y/2 + detail_offset);
}

const handleDrawingAngledBlock = (ctx,dimension) =>{
  let canvasX = dimension.canvaswt;
  let canvasY = dimension.canvasht;
  //let canvasZ = 1000;
  let detail_offset = 10;
  let isoangle = 45;
  let xvector = dimension.length;
  let yvector = dimension.breadth;
  let zvector = dimension.height;
  let angleA = dimension.angleA




  // position for Z axis, efffectively (x 1st origin + cos 30 x height, y 1st origin + sin 30 x height)
  // sin 30 = y point / height => y point = sin 30 x height
  // cos 30 = x point / height => x point = cos 30 x height
     
  let max_xvector = xvector + Math.abs(Math.cos(Math.PI * angleA/180) * zvector) + Math.abs(Math.cos(Math.PI * isoangle/180) * zvector);
  let max_yvector = yvector + Math.abs(Math.sin(Math.PI * angleA/180) * zvector) + Math.abs(Math.sin(Math.PI * isoangle/180) * zvector);
  let scaling = 1;
  if (max_xvector >= canvasX || max_yvector >= canvasY ){
    scaling = Math.round(Math.max((max_xvector,max_yvector)) / canvasX) + 1;
  }
  if (scaling > 1){
    xvector = dimension.length / scaling;
    yvector = dimension.breadth/ scaling;
    zvector = dimension.height / scaling;
  }

    // AngleA is the xz angle
  // Assume ABC unchanged, then result shape will be parallelogram
  // assume x to be x-axis aligned, then z will bend and increase x units (but decrease z)
  let angleA_offset_x = Math.abs(Math.cos(Math.PI * (angleA)/180)) * yvector;
  let angleA_offset_y = Math.abs(Math.sin(Math.PI * (angleA)/180)) * yvector;

  let iso_offset_x = Math.abs(Math.cos(Math.PI*(Math.abs(isoangle-angleA)+15)/180)) * zvector; 
  let iso_offset_y = Math.abs(Math.sin(Math.PI*(Math.abs(isoangle-angleA)+15)/180)) * zvector; 
  let first_origin_x = canvasX/2 - (max_xvector/scaling)/2;
  let first_origin_y = canvasY/2 + (max_yvector/scaling)/2;
  let second_origin_x = first_origin_x + iso_offset_x;
  let second_origin_y = first_origin_y - iso_offset_y;

  // position x-y centre
  ctx.moveTo(first_origin_x, first_origin_y);
  // first move along x-axis
  ctx.lineTo(first_origin_x + xvector, first_origin_y)  
 
  ctx.moveTo(first_origin_x + xvector, first_origin_y);
  // move along y axis using angleA offset
  ctx.lineTo(first_origin_x + xvector + angleA_offset_x, first_origin_y - angleA_offset_y);
  // move back to x origin point + angle offset
  ctx.lineTo(first_origin_x+ angleA_offset_x, first_origin_y - angleA_offset_y);
  // move back to x-y origin, first 4 points complete
  ctx.lineTo(first_origin_x, first_origin_y);


  // first line to 2nd set
 ctx.lineTo(second_origin_x, second_origin_y);
 ctx.lineTo(second_origin_x + xvector , second_origin_y);
  // detail Breadth
  ctx.fillText("H="+zvector*scaling,first_origin_x/2 + xvector + second_origin_x/2, first_origin_y/2 + second_origin_y/2);
  ctx.moveTo(second_origin_x + xvector , second_origin_y); 
  ctx.lineTo(first_origin_x + xvector, first_origin_y)
  
  // detail Breadth
  ctx.moveTo(second_origin_x + xvector , second_origin_y);
  ctx.fillText("B="+yvector*scaling, second_origin_x + xvector + angleA_offset_x/2, second_origin_y - angleA_offset_y/2);  
  
  ctx.moveTo(second_origin_x + xvector , second_origin_y);
  ctx.lineTo(second_origin_x + xvector + angleA_offset_x, second_origin_y - angleA_offset_y);
  ctx.lineTo(first_origin_x + xvector + angleA_offset_x, first_origin_y - angleA_offset_y);
  ctx.moveTo(second_origin_x + xvector + angleA_offset_x, second_origin_y - angleA_offset_y);
  ctx.lineTo(second_origin_x + angleA_offset_x, second_origin_y - angleA_offset_y);
  ctx.lineTo(first_origin_x+ angleA_offset_x, first_origin_y - angleA_offset_y);
  ctx.moveTo(second_origin_x + angleA_offset_x, second_origin_y - angleA_offset_y);
  ctx.lineTo(second_origin_x, second_origin_y);
  ctx.stroke();

  // detail Scaling
  ctx.fillStyle = '#000000'
  ctx.font = "16px Arial Bold";
  ctx.fillText("Scaling at " + scaling + ":1",canvasX/2, 25);

  ctx.fillStyle = '#000000'
  ctx.font = "10px Arial";
  // detail Length
  ctx.fillText("L="+xvector*scaling, first_origin_x + xvector/2, first_origin_y + (detail_offset/scaling >= 20 ? detail_offset/scaling : 15));
  
  
  ctx.moveTo(first_origin_x, first_origin_y);
  ctx.arc(first_origin_x, first_origin_y, 40/scaling, 0, -angleA/180 * Math.PI,true)
  ctx.fillText("A°="+angleA, first_origin_x +100/scaling, first_origin_y -20/scaling);
  ctx.stroke();
}

const CanvasSection = props => {
  const canvasRef = useRef(null)
  
  const draw = (ctx, dims) => {
    dims.angleA > 0 
    ? handleDrawingAngledBlock(ctx,dims)
    : handleDrawingBlock(ctx,dims)
  }

  useEffect(() => {    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')    
    let myhandler = AppStore.getDrawShape(props.myshapenum)
    let dims = { length: myhandler.dimA, breadth: myhandler.dimB, height: myhandler.dimC, angleA:myhandler.dimAngleA, canvasht :600,canvaswt: 600}
    canvas.width = dims.canvaswt
    canvas.height = dims.canvasht
    draw(context,dims)
  },[draw,props.myshapenum])  
  
  return (
    <>
    <canvas ref={canvasRef} {...props}/>
    </>
  )
}

export default CanvasSection