import React, {useState,useEffect} from 'react';
import axios from "axios";
import "../css/manage.css"; // Add custom CSS for styling
import { useNavigate } from "react-router-dom";

const HoldedRooms = () => {
    const [rooms,setRooms] = useState([]);

    const navigate = useNavigate()

    const fetchRooms = async () => {
        try {
          const response = await axios.get("http://localhost:3700/api/unhold");
          setRooms(response.data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };



// UnHold The room
  const unHold = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3700/api/unhold/${id}`);
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
      console.error("Error UnHolding the room:", error);
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
      <h1>Holded Rooms</h1>

      {/* Room List */}
      <div className="room-list">
        {rooms.map((room) => (
          <div key={room._id} className="room-item">
              <>
                {/* Display room details */}
                <p>Room Number: {room.roomNumber}</p>
                <p>Type: {room.type}</p>
                <p>Price: ${room.price}</p>
                <p>Availability: {room.availability ? "Available" : "Booked"}</p>
                <p>Hold: {room.hold ? "Yes" : "No"}</p>
                <img src={room.url} alt={room.type} width="100" />
                <button onClick={() => unHold(room.roomNumber)}>unHold</button>
              </>
          </div>
          
        ))}
        <button className='back-btn' onClick={ naviagtehandle}>Back</button>
      </div>
    </div>
  );
}

export default HoldedRooms;