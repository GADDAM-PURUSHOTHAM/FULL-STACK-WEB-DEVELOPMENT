import React, { useEffect, useState } from "react";
import axios from "axios";

const Reserve = () => {
  const [rooms, setRooms] = useState([]);

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3700/Admin/p");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  // Approve booking
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3700/Admin/p/${id}/approved`);
      alert("Booking approved successfully");
      fetchRooms(); // Refresh the list
    } catch (error) {
      console.error("Error approving booking:", error);
      alert("Failed to approve booking");
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
              <th>User Name</th>
              <th>Room No</th>
              <th>Aadhar No</th>
              <th>Contact</th>
              <th>Price</th>
              <th>Entry Date</th>
              <th>Exit Date</th>
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
                    <button onClick={() => handleApprove(room._id)}>
                      Approve
                    </button>
                  ) : (
                    "Approved"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Reserve;
