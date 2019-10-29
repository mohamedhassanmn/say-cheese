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
            contentType:"",
            description:""
        }
    }
    
    handleClick=()=>{
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
            type:e.target.value
        })
    }
    componentDidUpdate(){
        console.log(this.state)
    }
    render(){
        return(
            <React.Fragment>
                <Grid container justify="center" alignItems="center" style={{marginTop:"50px"}}>
                    <Grid item style={{marginTop:"100px"}}>
                        <input onChange={this.handleChange} type="file" id="uploader"/>
                        <Button className="upload-btn" variant="contained" color="secondary" onClick={this.handleClick}>upload</Button><br/><br/>                    
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}