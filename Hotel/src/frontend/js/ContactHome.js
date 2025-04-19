import React from 'react';
import { useNavigate } from "react-router-dom";

const ContactHome = () => {
    const navigate=useNavigate();
  return (
    <div>
      <h1>Thanks for Your Response</h1>
      <button onClick={()=>{navigate("/")}}>Back</button>
    </div>
  );
}

export default ContactHome;
