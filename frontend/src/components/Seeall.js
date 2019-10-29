import React from 'react';
import Upload from './Upload'
import './Seeall.css' 
import Button from '@material-ui/core/Button'
import {Route,Link} from 'react-router-dom'
import NavBar from './Slider_Home/NavBar'
import axios from 'axios';


class Seeall extends React.Component {
    constructor(props){
        super(props)
        this.state={
            username:""
        }
    }
    componentDidMount(){
        axios({method:"post",url:"http://127.0.0.1:5000/users",data:{token:localStorage.getItem("token")}})
        .then(res=>{
            localStorage.setItem("username",res.data.result[0].name)
            this.setState({username:res.data.result[0].name})
        })
        .catch(err=>alert(err))
        console.log(localStorage.getItem("token"))
        console.log(localStorage.getItem("username"),"helhelooooo")
    }
    render() {
        console.log(localStorage.getItem("username"))
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <h1 className="navbarone text-center" >
                    <Link to="/"><i className="fa fa-fw fa-home" aria-selected="true"></i> </Link>
                        <a href="#"><i className="fa fa-fw fa-eye" aria-selected="false"></i> </a>
                        <a href="#"><i className="fa fa-fw fa-search"aria-selected="false"></i></a>
                        <Link to="/uploads"><i className="fa fa-fw fa-plus"aria-selected="false"></i></Link>
                    </h1>
                </div>
                <br></br>
                <nav class="nav nav-pills" style={{ justifyContent: "center" }}>
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item" style={{ color: "white" }}>
                            <a class="nav-link active" style={{ color: "wheat" }} id="pills-all-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">ALL</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{ color: "wheat" }} id="pills-celebration-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">CELEBRATION</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{ color: "wheat" }} id="pills-places-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">PLACES</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{ color: "wheat" }} id="pills-climate-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">CLIMATE</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{ color: "wheat" }} id="pills-saved-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">SAVED</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Seeall;