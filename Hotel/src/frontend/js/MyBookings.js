import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomBookings = () => {
  const [rooms, setRooms] = useState([]);
  const username = localStorage.getItem("username");

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:3700/p?username=${username}`);
      console.log("Response from backend:", response.data); // Log the response
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
  

  // Cancel booking
  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:3700/p/${id}`);
      alert("Booking canceled successfully");
      fetchRooms(); // Refresh the list
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Room Bookings</h1>
      {rooms.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>UserName</th>
              <th>RoomNo</th>
              <th>AdharNo</th>
              <th>Contact</th>
              <th>Price</th>
              <th>EntryDate</th>
              <th>ExitDate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.UserName}</td>
                <td>{room.RoomNo}</td>
                <td>{room.AdharNo}</td>
                <td>{room.Contact}</td>
                <td>{room.Price}</td>
                <td>{new Date(room.EntryDate).toLocaleDateString()}</td>
                <td>{new Date(room.ExitDate).toLocaleDateString()}</td>
                <td>{room.status}</td>
                <td>
                  {room.status === "pending" ? (
                    <button onClick={() => handleCancel(room._id)}>Cancel</button>
                  ) : (
                    "Approved"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found for {username}.</p>
      )}
    </div>
  );
};

export default RoomBookings;
