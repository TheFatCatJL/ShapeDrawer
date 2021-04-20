import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppStore from './AppStore';
import TopNavbar from './TopNavbar';
//import reportWebVitals from './reportWebVitals';
import TopWorkArea from './TopWorkArea';
import TopWorkAreaSec from './TopWorkAreaSec';
import ComponentTabs from './ComponentTabs';
import { BrowserRouter as Router } from 'react-router-dom';
import TableComponent from './TableComponent';


ReactDOM.render(    
    <Router>      
      <TopNavbar/>
      <TopWorkArea/>
      <TopWorkAreaSec/>
    </Router>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
      <ComponentTabs />
  </React.StrictMode>,
  document.getElementById('drawscreen')
);

ReactDOM.render(
      <TableComponent />,
  document.getElementById('tablearea')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
