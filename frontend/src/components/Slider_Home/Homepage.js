import React, { Component } from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import axios from 'axios';

import "../../App.css";
import NavBar from "./NavBar";

const movies = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983"
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll"
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain"
  },
  {
    id: 4,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education"
  },
  {
    id: 5,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite"
  },
  {
    id: 6,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror"
  }
];

class Homepage extends Component {
  constructor(props){
    super(props)
    this.state={
      trending:"",
      popular:"",
      recent:""
    }
  }
  componentDidMount(){
    axios({method:"get",url:"http://127.0.0.1:5000/user-trending"})
    .then(res=>{
      console.log(res.data.status)
      this.setState({trending:res.data.status})
    })
    .catch(err=>alert(err))
    axios({method:"get",url:"http://127.0.0.1:5000/user-popular"})
    .then(res=>{
      console.log(res)
      this.setState({popular:res.data.status})
    })
    .catch(err=>alert(err))
    axios({method:"get",url:"http://127.0.0.1:5000/user-recent"})
    .then(res=>{
      console.log(res)
      this.setState({recent:res.data.status})
    })
    .catch(err=>alert(err))
  }
  componentDidUpdate(){
    console.log(this.state)
  }
  render() {
    return (
      <div className="app">
        <NavBar/>

        <br></br>
        <h1 className="head1">
          TRENDING
        </h1>
          {this.state.trending!==""? <Slider>
          {this.state.trending.map(movie => (
            <Slider.Item movie={movie} key={movie.id}>
              item1
            </Slider.Item>
          ))}
          </Slider>:null}
        
        <h1 className="head1">
          POPULAR
        </h1>

        {this.state.popular!==""?<Slider>
          {this.state.popular.map(movie => (
            <Slider.Item movie={movie} key={movie.id}>
              item1
            </Slider.Item>
          ))}
          </Slider>:null}
        
        <h1 className="head1">
          RECENT POSTS
        </h1>

        {this.state.recent!==""? <Slider>
          {this.state.recent.map(movie => (
            <Slider.Item movie={movie} key={movie.$oid}>
              item1
            </Slider.Item>
          ))}
          </Slider>:null}
        
      </div>
    );
  }
}

export default Homepage;
