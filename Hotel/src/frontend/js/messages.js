import React, { useState, useEffect } from "react";
import { Button, Table, Container } from "react-bootstrap"; // Import Button from React-Bootstrap
import axios from "axios";
import "../css/messages.css"; // Ensure you create and include this CSS file

const MessageTable = () => {
  const [messages, setMessages] = useState([]);

  // Fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3700/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Change status of a message to "Accepted"
  const acceptMessage = async (id) => {
    try {
      // Sending PUT request to the correct endpoint with "Accepted" status
      await axios.put(`http://localhost:3700/messages/${id}`);
      fetchMessages(); // Refresh the table after status change
    } catch (error) {
      console.error("Error accepting message:", error);
    }
  };

  useEffect(() => {
    fetchMessages(); // Load messages on component mount
  }, []);

  return (
    <Container>
      <h1 className="my-4">Message Table</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={message._id}>
              <td>{index + 1}</td>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
              <td>{message.status}</td>
              <td>
          
                  <Button
                    variant="warning" // Correct usage of variant for React-Bootstrap Button
                    onClick={() => acceptMessage(message._id)} // Update status to "Accepted"
                  >
                    Accept
                  </Button>
             
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MessageTable;
