import React from 'react';
import './Loginsignup.css'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import $ from 'jquery';
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom";
class Loginsignup extends React.Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            username:"",
            dob:"",
            name:"",
            about:"",
            message:"",
            redirect:"",
            alert:true
        }
    }
    componentDidMount(){
        $(document).ready(function(){
            $('.login-info-box').fadeOut();
            $('.login-show').addClass('show-log-panel');
          });
          $('.login-reg-panel input[type="radio"]').on('change', function() {
            if
            ($('#log-login-show').is(':checked')) {
                $('.register-info-box').fadeOut(); 
                $('.login-info-box').fadeIn();
                
                $('.white-panel').addClass('right-log');
                $('.register-show').addClass('show-log-panel');
                $('.login-show').removeClass('show-log-panel');
                
            }
            else if
            ($('#log-reg-show').is(':checked')) {
                $('.register-info-box').fadeIn();
                $('.login-info-box').fadeOut();
                
                $('.white-panel').removeClass('right-log');
                
                $('.login-show').addClass('show-log-panel');
                $('.register-show').removeClass('show-log-panel');
            }
          });
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleLogin=()=>{
        let data={
            email:this.state.email,
            password:this.state.password
        }
        console.log(data)
        axios({method:"post",url:"http://127.0.0.1:5000/auth/login",data:data})
        .then(res=> {
            console.log(res.data.data.error,"My dear")
            if(res.data.data.error=="false"){
                localStorage.setItem("token",res.data.data.token )
                this.setState({redirect:true})
                console.log("wow")
            }else{
                this.setState({redirect:false,alert:false})
            } 
        })
        .catch(err=>alert(err))
    }
    handleRegister=()=>{
        let data={
            email:this.state.email,
            username:this.state.username,
            name:this.state.name,
            password:this.state.username,
            dob:this.state.dob,
            about:this.state.about,
        }
        axios({method:"post",url:"http://127.0.0.1:5000/user-data",data:data})
        .then(res=> {
            console.log(res)
            if(res.data.response.error=="false"){
            this.setState({
                message:"Registration Success"
            })
            }else{
                this.setState({
                    message:"Registration Failed"
                })
            }
        })
        .catch(err=>alert(err))
    }
    render() {
        console.log(this.state)
        console.log(localStorage.getItem("token"))
        return (
            <div className="formpage">
                <div className="login-reg-panel">
                    <div className="login-info-box">
                        <h2>Have an account?</h2>
                        <p>Lorem ipsum dolor sit amet</p>
                        <label id="label-register" for="log-reg-show">Login</label>
                        <input type="radio" name="active-log-panel" id="log-reg-show"  checked="checked"></input>
                    </div>

                    <div className="register-info-box">
                        <h2>Don't have an account?</h2>
                        <p>Lorem ipsum dolor sit amet</p>
                        <label id="label-login" for="log-login-show">Register</label>
                        <input type="radio" name="active-log-panel" id="log-login-show" ></input>
                    </div>

                    <div className="white-panel">
                        <div className="login-show">
                            <h2>LOGIN</h2>
                            <input onChange={this.handleChange} name="email" type="text" placeholder="Email"></input>
                            <input onChange={this.handleChange} name="password" type="password" placeholder="Password"></input>
                            <input onClick={this.handleLogin} type="button" value="Login"></input>
                            <Typography variant="h5">{this.state.message}</Typography>
                            {(this.state.redirect)?<Redirect to="/seeall"/>:<Redirect to="/loginsignup"/>}
                            {this.state.alert?null:<Typography variant="h5" color="secondary">Invalid Authentication!</Typography>}
                            <a href="#">Forgot password?</a>
                        </div>
                        <div className="register-show">
                        <Typography variant="h6">{this.state.message}</Typography>
                            <h2>REGISTER</h2>
                            <input onChange={this.handleChange} name="email" type="text" placeholder="Email"></input>
                            <input onChange={this.handleChange} name="username" type="text" placeholder="UserName"></input>
                            <input onChange={this.handleChange} name="name" type="text" placeholder="Name"></input>
                            <label>DOB&nbsp;&nbsp;:&nbsp;&nbsp;</label>
                            <input onChange={this.handleChange} name="dob" type="date" placeholder="D O B"></input>
                            <input onChange={this.handleChange} name="password" type="password" placeholder="Password"></input>
                            <input onClick={this.handleRegister} type="button" value="Register"></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Loginsignup