import React from 'react'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import Avatars from './Avatar'
import { Typography } from '@material-ui/core'
export default class NavBar extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    console.log("entry")
    this.forceUpdate() 
  }
  handleLogout=()=>{
    console.log(localStorage.getItem("token"))
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    console.log(localStorage.getItem("token"))
    this.forceUpdate() 
}
  render(){
    console.log(localStorage.getItem("username"))
    return(
      <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
          <a className="navbar-brand " style={{ color: "red" }} href="#"><strong>SAYCHEESE</strong></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                  <Link to="/"><a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a></Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/seeall"><a className="nav-link" href="#">Your Feed</a></Link>
                  </li>
                  {localStorage.getItem("username")!==null?<li className="nav-item">
                      <a className="nav-link" href="#"><Avatars name={localStorage.getItem("username")}/></a>
                  </li>:null}
                  <li className="nav-item">
                      {localStorage.getItem("token")==null?<Link to="/loginsignup"><Button>login</Button></Link>:<Link to="/"><Button onClick={this.handleLogout}>logout</Button></Link>}
                  </li>
              </ul>
          </div>
      </div>
  </nav>
    )
  }
}