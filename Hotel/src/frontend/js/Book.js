import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Book.css";
import axios from "axios";

const Book = () => {
  const [rooms, setRooms] = useState([]); // State to hold room data
  const [exit, setExit] = useState(''); // State to store the ExitDate
  const [price, setPrice] = useState(0); // State to store the price of the room

  const [formData, setFormData] = useState({
    UserName: "",
    RoomNo: "",
    AdharNo: "",
    Contact: "",
    EntryDate: '',
    ExitDate: '',
    Price: 0, // Add price to form data
  });
  const username=localStorage.getItem("username");
  
  const navigate = useNavigate();
  const location = useLocation(); // Access location object to get passed state
  const room = location.state?.room; // Retrieve the room data passed as state

  // Fetch room data based on room number
  const fetchRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:3700/api/fetchbook/${formData.RoomNo}`);
      console.log("Fetched Rooms:", response.data); // Log the response data to check

      // If a valid next available entry date is found, set Entry Date and Exit Date accordingly
      if (response.data.nextAvailableEntryDate) {
        setExit(response.data.nextAvailableEntryDate); // Set the last fetched exit date
        setFormData({
          ...formData,
          EntryDate: response.data.nextAvailableEntryDate, // Set Entry Date to the last fetched Exit Date
          ExitDate: addOneDay(response.data.nextAvailableEntryDate) // Set Exit Date to Entry Date + 1
        });
      }

      setRooms(response.data.rooms); // Set room data in state
    } catch (error) {
      console.error("Error fetching rooms:", error);
      alert("Error fetching room data. Please try again.");
    }
  };

  // Fetch room price based on room number
  const fetchPrice = async () => {
    try {
      const response = await axios.get(`http://localhost:3700/api/price/${formData.RoomNo}`);
      console.log("Fetched Price:", response.data);

      // Set the fetched price
      setPrice(response.data.price); // Assuming the response contains a 'price' field
      setFormData((prevState) => ({
        ...prevState,
        Price: response.data.price, // Set the price in the form data as well
      }));
    } catch (error) {
      console.error("Error fetching price:", error);
      alert("Error fetching room price. Please try again.");
    }
  };

  // Fetch room data when RoomNo or formData is updated
  useEffect(() => {
    if (formData.RoomNo) {
      fetchRooms();
      // Fetch rooms based on room number
      fetchPrice(); // Fetch price based on room number
    }

    // If room data is available, initialize RoomNo in form data
    if (room) {
      setFormData((prevState) => ({
        ...prevState,
        RoomNo: room.roomNumber // Set RoomNo to room.roomNumber
      }));
    }
    if (username) {
      setFormData((prevState) => ({
        ...prevState,
        UserName: username // Set RoomNo to room.roomNumber
      }));}
  }, [room, formData.RoomNo]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.post("http://localhost:3700/book", formData); // Send booking data
      alert(response.data.message);

      if (response.data.success) {
        navigate("/thankyou");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Full Error:", error); // Log full error
      alert("There was an error. Please check your details!");
    }
  };

  if (!room) {
    return <p>No room data available</p>; // Handle missing room data
  }

  // Get today's date for minimum date selection
  const today = new Date().toISOString().split("T")[0];

  // Helper function to add one day to a given date
  const addOneDay = (date) => {
    if (!date) {
      return today; // If the date is invalid, default to today's date
    }

    const nextDay = new Date(date);

    if (isNaN(nextDay.getTime())) {
      return today; // If the date is invalid, return today's date
    }

    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0];  // Return in the format YYYY-MM-DD
  };

  // Handle changes to Entry Date
  const handleEntryDateChange = (e) => {
    const selectedEntryDate = e.target.value;

    // Update Entry Date and Exit Date dynamically
    setFormData(prevState => {
      const updatedFormData = {
        ...prevState,
        EntryDate: selectedEntryDate,
        ExitDate: addOneDay(selectedEntryDate), // Automatically update Exit Date to one day after Entry Date
      };

      // Calculate total price based on updated EntryDate and ExitDate
      updatedFormData.Price = calculateTotalPrice(selectedEntryDate, updatedFormData.ExitDate);
      return updatedFormData;
    });
  };

  // Handle changes to Exit Date
  const handleExitDateChange = (e) => {
    const selectedExitDate = e.target.value;

    setFormData(prevState => {
      const updatedFormData = {
        ...prevState,
        ExitDate: selectedExitDate, // Update Exit Date
      };

      // Recalculate the total price when ExitDate changes
      updatedFormData.Price = calculateTotalPrice(updatedFormData.EntryDate, selectedExitDate);
      return updatedFormData;
    });
  };

  // Calculate total price based on number of days
  const calculateTotalPrice = (entryDate, exitDate) => {
    if (!entryDate || !exitDate) return 0;

    const entry = new Date(entryDate);
    const exit = new Date(exitDate);
    const timeDiff = exit - entry;
    const days = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

    return days * price; // Total price = days * price per day
  };


  

  return (
    <div>
     
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="header">Please Enter Your Details Here!</div>
          <div className="details-class">
            <span>
              YourName:
              <input
                type="text"
                value={formData.UserName} readonly
                
                required
              />
            </span>
            <span>
              Room No:
              <input
                type="text"
                value={formData.RoomNo}
                readOnly
              />
            </span>
            <span>
              Enter Adhar No:
              <input
                type="text"
                placeholder="Enter Your Adhar Number"
                value={formData.AdharNo}
                onChange={(e) => setFormData({ ...formData, AdharNo: e.target.value })}
                required
              />
            </span>
            <span>
              Enter Contact No:
              <input
                type="text"
                placeholder="Enter Your Contact Number"
                value={formData.Contact}
                onChange={(e) => setFormData({ ...formData, Contact: e.target.value })}
                required
              />
            </span>
            <span>
              Entry Date:
              <input
                type="date"
                value={formData.EntryDate}
                onChange={handleEntryDateChange}
                required
                min={exit || today} // Set the minimum Entry Date to the last fetched Exit Date or today
              />
            </span>
            <span>
              Exit Date:
              <input
                type="date"
                value={formData.ExitDate}
                onChange={handleExitDateChange}
                required
                min={addOneDay(formData.EntryDate)} // Set Exit Date minimum to Entry Date + 1
              />
            </span>
            <br />
            <span>
              Total Price:
              <input
                type="text"
                value={formData.Price}
                readOnly
              />
            </span>
        
            <div className="btns">
              <span><button type="submit">Submit</button></span>
              <span><button onClick={() => { navigate("/acc") }}>Back</button></span>
            </div>
          </div>
        </div>
      </form>
    
    </div>
  );
};

export default Book;