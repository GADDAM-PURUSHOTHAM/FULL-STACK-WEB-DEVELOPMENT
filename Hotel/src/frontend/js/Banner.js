import bannerImage from "../../assets/banner5.jpg";
import "../css/Banner.css";
import React from "react";

import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate=useNavigate();
  const username = localStorage.getItem("username"); 
  
 
  return (
    <div>
      <img className="banner-image" src={bannerImage} />
      <div className="text-overlay">
        <h1>Welcome to Team Blaze </h1>
        <p>Explore and discover amazing things!</p>
        <div className="button-container">
          {/* <button className="book-now-button-1"><Link to="/booking" style={{textDecoration:'none',color:'white'}}>Book Now</Link></button> */}
          <button className="book-now-button-1" onClick={()=>{username===null?navigate("/login"):navigate("/acc")}}>Book Now</button>
          <button className="explore-button" ><a href="https://google.com/" style = {{textDecoration: 'none',color : 'white'}} target="__blank">Explore More</a></button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
