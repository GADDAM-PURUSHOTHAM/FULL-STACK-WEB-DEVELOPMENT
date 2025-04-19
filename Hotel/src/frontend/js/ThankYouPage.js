import React from 'react';
import { useNavigate } from 'react-router-dom';
const ThankYouPage = () => {
  const navigate=useNavigate();

  return (
    <div>
      <center>
      <h1>Thanks For Booking Our Hotel Enjoy Your Day!...</h1>
    
      <button onClick={()=>{navigate("/mybookings")}}>Check Your Room Status</button>
      </center>
    </div>
  );
}

export default ThankYouPage;
