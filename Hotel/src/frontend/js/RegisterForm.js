import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import img4 from "../../assets/bed5.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [formData, setDataList] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3700/create", formData);
      console.log(response.data);
      if (response.data.success) {
        alert(response.data.message);
        navigate("/login"); // After successful registration, redirect to login
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          color: "white",
          textAlign: "left",
        }}
      >
        <h1>User Registration Form</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setDataList({ ...formData, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setDataList({ ...formData, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setDataList({ ...formData, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setDataList({ ...formData, confirmPassword: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>User Role</Form.Label>
            <Form.Control
              as="select"
              value={formData.role}
              onChange={(e) => setDataList({ ...formData, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>

          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" type="submit" style={{ borderRadius: "0", marginRight: 10 }}>
              Register
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate("/login")} // Use navigate here
              style={{ borderRadius: "0" }}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${img4})`,
          backgroundSize: "cover",
          filter: "blur(5px)", // Apply blur to the background image
        }}
      ></div>
    </div>
  );
}