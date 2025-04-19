import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/manage.css"; // Add custom CSS for styling
import { useNavigate } from "react-router-dom";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null); // Room being edited

  // Fetch all rooms
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3700/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const navigate=useNavigate();

  // Delete a room
  const deleteRoom = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3700/api/delete/${id}`);
      alert(response.data.message)

      if(response.data.success)
      {
        fetchRooms();
      }
      else{
        alert(response.data.message,"Else Block");
      }
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  // Start editing a room
  const startEditing = (room) => {
    setEditingRoom({ ...room });
  };

  // Handle form field changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingRoom({ ...editingRoom, [name]: value });
  };

  // Update a room
  const saveEdits = async () => {
    try {
      await axios.put(`http://localhost:3700/api/rooms/${editingRoom._id}`, editingRoom);
      alert("Room updated successfully");
      setEditingRoom(null); // Exit edit mode
      fetchRooms();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, []);


  const naviagtehandle = (() =>{
    navigate('/admin');
})

  return (
    <div className="room-management">
      <h1>Room Management</h1>

      {/* Room List */}
      <div className="room-list">
        <h3>Add Rooms</h3>
        <button className="add-btn" onClick={()=>{navigate("/addroom")}}>ADD ROOMS</button>
        
        <h2>Existing Rooms</h2>
        {rooms.map((room) => (
          <div key={room._id} className="room-item">
            {/* If editing this room */}
            {editingRoom && editingRoom._id === room._id ? (
              <>
                <input
                  type="number"
                  name="roomNumber"
                  value={editingRoom.roomNumber}
                  onChange={handleEditChange}
                  disabled
                />
                <input
                  type="text"
                  name="type"
                  value={editingRoom.type}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="price"
                  value={editingRoom.price}
                  onChange={handleEditChange}
                />
                <select
                  name="availability"
                  value={editingRoom.availability}
                  onChange={(e) =>
                    setEditingRoom({
                      ...editingRoom,
                      availability: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Available</option>
                  <option value="false">Booked</option>
                </select>
                <button onClick={saveEdits}>Save</button>
                <button onClick={() => setEditingRoom(null)}>Cancel</button>
              </>
            ) : (
              <>
                {/* Display room details */}
                <p>Room Number: {room.roomNumber}</p>
                <p>Type: {room.type}</p>
                <p>Price:  ₹{room.price}</p>
                <p>Availability: {room.availability ? "Available" : "Booked"}</p>
               
                <img src={room.url} alt={room.type} className="img-display"/>
                <button onClick={() => deleteRoom(room.roomNumber)}>Hold</button>
                <button className="edit-btn" onClick={() => startEditing(room)}>Edit</button>
               
              </>
            )}
          </div>
        ))}
        <button className="back-btn" onClick={ naviagtehandle}>Back</button>
      </div>
    </div>
  );
};

export default RoomManagement;
