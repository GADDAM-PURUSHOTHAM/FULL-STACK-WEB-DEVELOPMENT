import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Admin.css"; // Import the custom CSS

const Admin = () => {
  const cardStyle = {
    borderRadius: "0", // Set border radius to 0
    height: "250px", // Set the height of the card
  };

  const buttonStyle = {
    borderRadius: "0", // Set border radius to 0 for buttons
    display: "block", // Make the button a block element
    margin: "auto", // Center align the button
    color: "white", // Set button text color to white
  };

  const navigate = useNavigate();

  return (
    <Container className="admin-dashboard">
      <Row className="justify-content-md-center">
        <Col md={3}>
          <Card style={cardStyle} className="shadow-sm mb-4 admin-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Check Users</Card.Title>
              <Card.Text>View and manage users.</Card.Text>
              <Button
                variant="primary"
                style={buttonStyle}
                onClick={() => navigate("/users")}
              >
                Click Here
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={cardStyle} className="shadow-sm mb-4 admin-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Check Messages</Card.Title>
              <Card.Text>View and Messages:</Card.Text>
              <Button
                variant="primary"
                style={buttonStyle}
                onClick={() => navigate("/messages")}
              >
                Click Here
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card style={cardStyle} className="shadow-sm mb-4 admin-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Check Reservations</Card.Title>
              <Card.Text>Access and review reservations.</Card.Text>
              <Button
                variant="primary"
                style={buttonStyle}
                onClick={() => navigate("/reserve")}
              >
                Click Here
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card style={cardStyle} className="shadow-sm mb-4 admin-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Manage Rooms</Card.Title>
              <Card.Text>Add, update, or delete rooms.</Card.Text>
              <Button
                variant="primary"
                style={buttonStyle}
                onClick={() => navigate("/manage")}
              >
                Click Here
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={cardStyle} className="shadow-sm mb-4 admin-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Check Holded Rooms</Card.Title>
              <Card.Text>View And Make the Rooms Available!.</Card.Text>
              <Button
                variant="primary"
                style={buttonStyle}
                onClick={() => navigate("/holdrooms")}
              >
                Click Here
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card style={cardStyle} className="shadow-sm mb-4 admin-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Log Out</Card.Title>
              <Card.Text>Log out of the system.</Card.Text>
              <Button
                variant="primary"
                style={buttonStyle}
                onClick={() => navigate("/login")}
              >
                Click Here
              </Button>
            </Card.Body>
          </Card>
        </Col>

       
      </Row>
    </Container>
    

    
  );
};

export default Admin;
