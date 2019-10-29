import React, { Component } from 'react';
import Slider from './components/Slider_Home'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from './components/Slider_Home/Homepage'
import Seeall from './components/Seeall'
import Loginsignup from './components/Loginsignup'
import Cards from './components/Cards'
import './App.css'
import Upload from './components/Upload';
import "../node_modules/video-react/dist/video-react.css";


class App extends React.Component {
  render() {
    return (
      <div className="app">
      <Router>
        <Route path = "/" exact component={Homepage} />
        <Route path ="/seeall" render={()=>{
          return(
            <>
              <Seeall/>
              <Cards style={{display:"flex"}}/>
            </>
          )
        }}/>
        <Route path ="/loginsignup" component={Loginsignup}/>
        <Route path="/uploads" render={()=>{
          return(
            <>
              <Seeall/>
              <Upload/>
            </>
          )
        }}/>
      </Router>

      </div> 
    );
  }
}

export default App;
