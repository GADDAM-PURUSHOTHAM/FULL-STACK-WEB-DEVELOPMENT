import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Accommodation.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { debounce } from "lodash";

const Accommodation = () => {
  const navigate = useNavigate();

  // States for managing data and UI
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState({ visible: false, room: null });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track the index of the selected image

  // Fetch rooms data from API
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3700/rooms");
      if (response.data.success) {
        setRooms(response.data.data);
        setFilteredRooms(response.data.data);
        // const availableRooms = response.data.data.filter(room => room.availability === true);
        // setRooms(availableRooms);
        // setFilteredRooms(availableRooms);
      } else {
        setError("Failed to fetch room data.");
      }
    } catch (err) {
      setError("Error fetching room data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    debouncedFilter(value);
  };

  const debouncedFilter = debounce((value) => {
    if (value) {
      setFilteredRooms(
        rooms.filter((room) =>
          room.type.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredRooms(rooms);
    }
  }, 300);

  // Handle image click in modal
  const handleImageClick = (index) => {
    setSelectedImageIndex(index); // Set the clicked image index to show large image
  };

  // Handle keyboard navigation for image gallery (left/right arrow keys)
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      // Navigate to next image
      setSelectedImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % showModal.room.url1.length; // Cycle back to first image
        return nextIndex;
      });
    } else if (event.key === "ArrowLeft") {
      // Navigate to previous image
      setSelectedImageIndex((prevIndex) => {
        const prevIndexValue = (prevIndex - 1 + showModal.room.url1.length) % showModal.room.url1.length; // Cycle back to last image
        return prevIndexValue;
      });
    }
  };

  // Effect to listen for arrow key presses when the modal is open
  useEffect(() => {
    if (showModal.visible) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal.visible, selectedImageIndex]);

  return (
    <div>
      {/* Filter Section */}
      <Container className="filter-container" >
        <Row >
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by room type"
              value={filter}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </Col>
          <Col md={2} >
            <button
              className="clear-filter-button"
              onClick={() => {
                setFilter("");
                setFilteredRooms(rooms);
              }}
            >
              Clear
            </button>
          </Col>
                                                    
          <Col md={2} >
            <button
              className="clear-filter-button"
              onClick={() => {
              navigate("/");
              }}
              style={{marginLeft: "40px"}}
            >
              Back
            </button>
          </Col>
        </Row>
      </Container>

      {/* Loading Indicator */}
      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <p className="error-message">{error}</p>}

      {/* Room Listings */}
      {filteredRooms.length === 0 && !loading ? (
        <p>No rooms found matching the filter.</p>
      ) : (
        filteredRooms.map((room) => (
          <Container key={room.roomNumber} className="room-container">
            <Row className="mb-4">
              <div className="top-line">
                <h3 className="room-type">{room.type}</h3>
              </div>

              <Col>
                <img
                  src={room.url}
                  alt={room.type}
                  className="room-image"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowModal({ visible: true, room })} // Open modal with room details
                />
              </Col>
              <Col className="room-details">
                <h3>{room.type}</h3>
                <p className="occupants-info">3 Occupants max</p>
                <p className="room-description">
                  {room.description ||
                    "A hotel is a commercial establishment that provides lodging accommodations, typically on a short-term basis."}
                </p>
                <p
                  className="view-details"
                  onClick={() => setShowModal({ visible: true, room })} // Show modal with room details
                >
                  <u style={{ cursor: 'pointer' }}>View Room Details</u>
                </p>
              </Col>

              <Col className="price-booking">
                <Row>
                  <Col>
                    <input
                      type="radio"
                      name={`roomType-${room.roomNumber}`}
                      value="roomOnly"
                      className="room-option"
                    />
                    Room No: {room.roomNumber}
                  </Col>
                  <Col className="price-info">
                    <del> ₹ 8560.00</del>
                    <br />
                    <span>Price : </span>
                    <span>₹ {room.price}</span>
                  </Col>
                </Row>
                <hr />
                <button
                  className="book-now-button"
                  onClick={() =>
                    navigate(`/book/${room.roomNumber}`, {
                      state: { room },
                    })
                  }
                >
                   ₹ {room.price} | Book Now
                </button>
              </Col>
            </Row>
          </Container>
        ))
      )}

      {/* Room Details Modal */}
      <Modal
        show={showModal.visible}
        onHide={() => setShowModal({ visible: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title>{showModal.room?.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Image Grid Gallery */}
          <div className="image-gallery">
            {showModal.room?.url1?.map((imageUrl, index) => (
              <div
                key={index}
                className="thumbnail-container"
                onClick={() => handleImageClick(index)} // Show large image when clicked
              >
                <img
                  src={imageUrl}
                  alt={`Room image ${index + 1}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>

          {/* Display the selected large image */}
          <div className="selected-image-container">
            {showModal.room?.url1 && (
              <img
                src={showModal.room.url1[selectedImageIndex]}
                alt="Selected room image"
                className="selected-image"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Accommodation;