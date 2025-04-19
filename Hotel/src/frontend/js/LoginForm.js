import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import img4 from "../../assets/bed5.jpg";  // Image for the background
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });

  const navigate = useNavigate(); // Initialize navigate for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    
    try {
      const response = await axios.post("http://localhost:3700/login", formData); // Login route
      console.log(response.data); // Log the response data for debugging
  
      if (response.data.success) {
        const { role, message, username } = response.data; // Extract role, message, and username from response
        
        // Display login success message
        alert(message);
  
        // Store authentication details in localStorage
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("username", username); // Save username
        localStorage.setItem("role", role); // Save role
  
        // Redirect based on role
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "staff") {
          navigate("/admin");
        } else {
          navigate("/"); // Redirect to home page for regular users
        }
      } else {
        alert(response.data.message); // Backend response error
      }
    } catch (error) {
      console.error("Full Error:", error); // Log the full error
      alert("Please Enter the Correct details!...");
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
        <h1>Login</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Select Role</Form.Label>
            <Form.Control
              as="select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <a href="/forget" style={{backgroundColor:"white"}}>forget password</a>

          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" type="submit" style={{ borderRadius: "0", marginRight: 10 }}>
              Login
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate("/register")} // Redirect to registration page
              style={{ borderRadius: "0" }}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>

      {/* Background image and styling */}
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