import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField'
import firebase from "firebase/app"
import Dropdown from './Dropdown'
import { Player } from 'video-react';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import "firebase/storage"
import './upload.css'
// import firebase from 'firebase'
// var cities = require('cities');

var firebaseConfig = {
    apiKey: "AIzaSyCAcJryDnBdiL7Sfn_nCEGHYowSknGddlI",
    authDomain: "fir-bbaa1.firebaseapp.com",
    databaseURL: "https://fir-bbaa1.firebaseio.com",
    projectId: "fir-bbaa1",
    storageBucket: "fir-bbaa1.appspot.com",
    messagingSenderId: "130214469410",
    appId: "1:130214469410:web:37862212d60e7a229ecf7b",
    measurementId: "G-XSFHTKMFRM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage=firebase.storage()
export default class extends React.Component{
    constructor(props){
        super(props)
        this.state={
            image:"",
            url:"",
            progress:"",
            type:"image",
            poster:"",
            date:"",
            city:"",
            hastag:"",
            title:"",
            contentType:"commercial",
            description:"",
            upload:true,
            posted:false
        }
    }
    
    handleClick=()=>{
        this.setState({upload:false})
        const {image}=this.state
        const uploadTask=storage.ref(`images/${image.name }`).put(image)
        uploadTask.on("state_changed",
        (snapshot)=>{
            //progress function
            this.setState({
                progress:(snapshot.bytesTransferred/snapshot.totalBytes)*100
            })

        },
        (error)=>{
            //error function
            console.log(error)
        },
        ()=>{
            //complete function
            storage.ref("images").child(image.name).getDownloadURL().then(url=>{
                console.log(url)
                this.setState({url:url})
            })
        }
        
        )
    }
    handlePost=()=>{
     let data={
         "title":this.state.title,
         "media-type":this.state.type,
         "media-link":this.state.url,
         "content-type":this.state.contentType,
         "hash-tag":this.state.hastag,
         "who-to-see":"all",
         "happened-at":this.state.city,
         "happened-on":this.state.date,
         "post-description":this.state.description
     }
     this.setState({posted:true})
     axios({method:"post",url:`http://127.0.0.1:5000/user-post/${localStorage.getItem("token")}` ,data:data})
     .then(res=>console.log(res))
     .catch(err=>alert(err))
    }
    handleChange=(e)=>{
        if(e.target.files[0]){
            this.setState({
                image:e.target.files[0]
            })
        }
    }
    handleCommonChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handletypeClick=(e)=>{
        console.log(e.target.name)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidUpdate(){
        console.log(this.state)
    }
    render(){
        return(
            <React.Fragment>
                <Grid container justify="center" alignItems="center" style={{marginTop:"50px"}}>
                    {this.state.posted==false?
                    <div>
                    <Grid item lg={6} md={12}>
                    {this.state.type=="image"?this.state.url!==""?<div >
                         <img className="image" src={this.state.url}/>
                        </div>:<div className="image">
                        {/* <LinearProgress className="progressBar" variant="determinate" value={this.state.progress} /> */}
                       {this.state.upload?
                       <div>
                        <input onChange={this.handleChange} type="file" id="uploader"/>
                        <Button className="upload-btn" variant="contained" color="secondary" onClick={this.handleClick}>upload</Button><br/>
                       </div>
                       : <CircularProgress  variant="static" value={this.state.progress} />}
                        </div>:
                    this.state.url!==""?<div className="cont" >
                            <Player className="image"
                            playsInline
                            poster=""
                            src={this.state.url}
                            />
                        </div>:<div className="image">
                        {/* <LinearProgress className="progressBar" variant="determinate" value={this.state.progress} /> */}
                        <CircularProgress  variant="static" value={this.state.progress} />
                        </div>}
                    </Grid>
                    &nbsp;&nbsp;&nbsp;
                    <Grid item style={{marginTop:"100px"}}>
                        <Dropdown className="dropdown" default=" " option1="image" option2="video" name="type" val={this.state.type} click={this.handletypeClick}/>
                        <input onChange={this.handleCommonChange} name="title" type="text" placeholder="Post Title"/><br/>
                        <Dropdown className="dropdown" 
                            default="--Content Type--"
                            name="contentType" 
                            option1="climate"
                            option2="places" 
                            option3="celebration" 
                            option4="emotion"
                            val={this.state.contentType} 
                            click={this.handletypeClick}/>
                        <label style={{color:"white",display:"block"}} for="date">Happened On:</label>
                        <input id="date" onChange={this.handleCommonChange} name="date" type="date" placeholder="happened on"/><br/><br/>
                        <input onChange={this.handleCommonChange} name="city" type="text" placeholder="in which city"/><br/><br/>
                        <input onChange={this.handleCommonChange} name="hastag" type="text" placeholder="#hastag it"/><br/><br/>
                        <textarea onChange={this.handleCommonChange} name="description" placeholder="Post your message"></textarea><br/><br/>
                        <Button variant="contained" onClick={this.handlePost} color="primary">Post</Button>&nbsp;&nbsp;
                        <Button variant="contained" onClick={this.handleCancel} color="secondary" style={{color:"black"}}>Cancel</Button>
                    
                    </Grid>
                    </div> :
                    <div>
                    <h1 style={{color:"white"}}>Successfully Posted !</h1>
                    </div>}
                </Grid>
            </React.Fragment>
        )
    }
}