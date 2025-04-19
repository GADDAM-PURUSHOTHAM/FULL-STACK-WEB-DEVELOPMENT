import breakfast from "../../assets/breakfast.jpg";
import tea from "../../assets/tea.jpg";
import React from "react";

const Offer = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img
          className="banner-image"
          src={breakfast}
          style={{ width: 550, height: 250 }}
        />
        <div className="text-container">
          <h2>Blaze  Breakfast</h2>
          <div className="underline"></div>
          <p>
            Start your day with a delectable breakfast experience, where an
            array of fresh and flavorful options awaits to energize
          </p>
          <button> <a href="https://google.com/" style = {{textDecoration: 'none',color : 'white'}} target="__blank">More Info</a>     </button>
          <hr />
        </div>
      </div>

      <div className="image-container">
        <img
          className="banner-image"
          src={tea}
          style={{ width: 550, height: 250 }}
        />
        <div className="text-container">
          <h2>Blaze  Tea</h2>
          <div className="underline"></div>
          <p>
            "Sip serenity with our exquisite selection of teas, where each
            aromatic brew unfolds a moment of tranquility in every cup."
          </p>
          <button>
          <a href="https://google.com/" style = {{textDecoration: 'none',color : 'white'}} target="__blank">More Info</a>
          </button>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Offer;
