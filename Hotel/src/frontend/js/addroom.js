import React, { useState } from "react";
import axios from "axios";
import "../css/addroom.css"; // Add custom CSS for styling
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    type: "",
    price: "",
    availability: true,
    url: "",
    url1: [],
  });
  
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("http://localhost:3700/api/rooms", newRoom);
      alert("Room added successfully!");
      console.log("Added room:", response.data);
      // Reset the form
      setNewRoom({
        roomNumber: "",
        type: "",
        price: "",
        availability: true,
        url: "",
        url1: [],
      });
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room. Please try again.");
    }
  };

  return (
    <div className="add-room-form">
      <h2>Add New Room</h2>
      <form onSubmit={handleAddRoom}>
        <input
          type="number"
          name="roomNumber"
          placeholder="Room Number"
          value={newRoom.roomNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type (e.g., Deluxe, Standard)"
          value={newRoom.type}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newRoom.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="url"
          placeholder="Image URL"
          value={newRoom.url}
          onChange={handleChange}
          required
        />
        <textarea
          name="url1"
          placeholder="Additional Image URLs (comma-separated)"
          value={newRoom.url1.join(",")}
          onChange={(e) =>
            setNewRoom({ ...newRoom, url1: e.target.value.split(",") })
          }
        ></textarea>
        <button type="submit">Add Room</button>
        <button onClick={()=>{navigate("/manage")}}>Back</button>
      </form>
    </div>
  );
};

export default AddRoom;
