

const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3700;

mongoose.connect("mongodb://localhost:27017/Roomprojects")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  const sChemaData = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    confirmPassword: String,
    role: String,
  });
  
  
const userModel = mongoose.model("user", sChemaData);
// const userModel1 = mongoose.model("RoomBoking", sChemaData);

// Read

app.get("/admin/users", async (req, res) => {
  try {
    const users = await userModel.find(); // Retrieve all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

// Delete a user by ID
app.delete("/admin/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id); // Delete user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Create data
app.post("/create", async (req, res) => {
  try {
    const data = new userModel(req.body);
    await data.save();
    res.send({
      success: true, // Ensure this field matches the client-side expectation
      message: "Data is successfully added",
      data: data,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error adding data", error });
  }
});

//login 

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user by email and role
    const user = await userModel.findOne({ email, role }); // Correctly refer to the userModel

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or incorrect role.",
      });
    }

    // Match the password directly (no bcrypt)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Login successful as ${role}.`,
      role: user.role,
      username: user.username, // Send the username in the response
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
});

//forget password

app.put("/resetpassword", async (req, res) => {
  const { email, password} = req.body; // Use req.body for these fields

 

  try {
    // Update the password for the user with the given email
    const result = await userModel.updateMany(
      { email:email }, // Find the user by email
      {
        $set: { 
          password:password,
          confirmPassword:password
           // Update the password
        }
      }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).send({
        success: true,
        message: "Password changed successfully.",
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No matching user found to update.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
});





// Room Schema and Model
const roomSchema = mongoose.Schema({
  roomNumber: { type: Number, required: true,unique: true},
  type: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  hold: {type: Boolean, default:false},
  url: { type: String, required: true },
  url1:{type:[String]}
  
});
const Room = mongoose.model("room", roomSchema);

// API Routes
// Fetch all rooms
app.get("/rooms", async (req, res) => {
  try {
      const rooms = await Room.find({hold:false});
      
      res.json({ success: true, data: rooms });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching rooms", error });
  }
});const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: "pending" }, // Status: Sent or Pending
});

const Message = mongoose.model("Message", messageSchema);


app.post("/submit-form", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Message({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.delete("/messages/:id", async (req, res) => {
  const { id } = req.params;
  await Message.findByIdAndDelete(id);
  res.json({ message: "Message deleted successfully" });
});

app.put("/messages/:id", async (req, res) => {
  const { id } = req.params;
  const message = await Message.findByIdAndUpdate(id, { status: "Accepted" })
  res.json(message);
});




app.post("/api/rooms", async (req, res) => {
  const { roomNumber, type, price, availability, url, url1 } = req.body;
  try {
    const newRoom = new Room({ roomNumber, type, price, availability, url, url1 });
    await newRoom.save();
    res.status(201).json({ message: "Room added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error });
  }
});
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({hold: false}); // Replace Room with your Mongoose model
    res.json(rooms);
  } catch (error) {
    console.error("Error retrieving rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

//to fetch the room price
app.get("/api/price/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Assuming Room model contains a 'price' field for each room
    const room = await Room.findOne({ roomNumber: id }); // Find one room by room number
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json({ price: room.price }); // Send back only the price of the room
  } catch (error) {
    console.error("Error fetching room price:", error);
    res.status(500).json({ error: "Failed to fetch room price" });
  }
});


// Update a room
app.put("/api/rooms/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await Room.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error });
  }
});

// Delete a room
// app.delete("/api/rooms/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Room.findByIdAndDelete(id);
//     res.status(200).json({ message: "Room deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting room", error });
//   }
// });


//Make the Rooms on Hold Because of Damages
app.put("/api/delete/:id", async (req, res) => {
  const {id} = req.params;
  // console.log(id);
  try{
    // const result = await Room.updateOne(
    //   { roomNumber: id }, // Find the room by roomNumber (data.RoomNo)
    //   { $set: { hold: true } } // Set hold to true
    // );

    const result = await Room.updateMany(
      { roomNumber: id },  // roomNumber is the reference ID you're looking for
      {
        $set: { 
          hold: true, 
          availability: false 
        }
      }
    )
    if (result.modifiedCount > 0) {
      return res.send({
        success: true,
        message: `Your Room ${id} Has Been Holded`,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: `Room ${id} not found or already Holded.`,
      });
    }

  }catch(error){
    res.status(500).json({ message: "Error Holding room", error });
  }
})


//fetch the rooms which are Hold
app.get("/api/unhold", async (req, res) => {
  try {
    const rooms = await Room.find({hold: true}); // Replace Room with your Mongoose model
    res.json(rooms);
  } catch (error) {
    console.error("Error retrieving rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});



//Remove Rooms From the Holding
app.put("/api/unhold/:id", async (req, res) => {
  const {id} = req.params;
  // console.log(id);
  try{
    const result = await Room.updateMany(
      { roomNumber: id },  // roomNumber is the reference ID you're looking for
      {
        $set: { 
          hold: false, 
          availability: true 
        }
      }
    )

    if (result.modifiedCount > 0) {
      return res.send({
        success: true,
        message: `Your Room ${id} Has Been unHolded`,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: `Room ${id} not found or already unHolded.`,
      });
    }

  }catch(error){
    res.status(500).json({ message: "Error unHolding room", error });
  }
})






// //fetch the rooms which is booked by the particular room number
// app.get("api/fetchbook/:id", async (req, res) => {
//   const {id} = req.params;
//   // console.log(id);
//   try{
//     const rooms = await Room.find({roomNumber: id}); // Replace Room with your Mongoose model
//     res.json(rooms);
    

//   }catch(error){
//     res.status(500).json({ message: "Error Holding room", error });
//   }
// })


// // Fetch rooms by room number
// app.get("/api/fetchbook/:id", async (req, res) => {
//   const { id } = req.params;  // Get the room number (id) from request parameters
  
//   try {
//     // Find rooms by roomNumber, replace Room with your actual model
//     const rooms = await Room.find({ roomNumber: id });

//     // If no rooms found, send appropriate message
//     if (rooms.length === 0) {
//       return res.status(404).json({ message: "No rooms found with this room number" });
//     }

//     // Send the fetched rooms back to the client
//     res.json(rooms);
//   } catch (error) {
//     // Send error message if the request fails
//     console.error("Error fetching rooms:", error);
//     res.status(500).json({ message: "Error fetching room data", error });
//   }
// });





// Room Schema and Model
const roomSchema1 = mongoose.Schema({
  UserName: { type: String,require:true},
  RoomNo: { type: String, required: true},
  AdharNo: { type: String, required: true },
  Contact: { type: String, required: true },
  Price: {type: String, required: true},
  status: { type: String, default: "pending" },
  EntryDate: { type: Date, default: Date.now }, // Corrected default value
  ExitDate: { type: Date, required: Date.now },
  
});
const Room1 = mongoose.model("RoomDetails", roomSchema1);

//CoustemerDetails

app.post("/book" , async (req, res) =>{
  try{
    const data = new Room1(req.body);
    await data.save();
    await Room.updateOne(
      { roomNumber: data.RoomNo }, // Find the room by roomNumber (data.RoomNo)
      { $set: { availability: false } } // Set availability to false
    );

    return res.send({
      success: true,
      // message: `Room ${data.RoomNo} has been booked successfully and its availability has been updated to false.`,
      message: `Your Room ${data.RoomNo} Has Been Booked`,
      data: data,
    });
  }
  catch (error) {
    console.error("Error during booking", error);
    res.status(500).send({
      success: false,
      message: "Error adding Booking a Room.",
      error: error.message,
    });
  }
})


app.get("/p", async (req, res) => {
  const { username } = req.query;
  try {
    const rooms = await Room1.find({
      status: { $in: ["pending", "approved"] },
      UserName: username,
    });
   
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});



app.delete("/p/:id", async (req, res) => {
  const { id } = req.params; // Get the room ID from the request parameters
  try {
    const room = await Room1.findByIdAndDelete(id); // Delete the room by ID
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Booking canceled successfully", room });
  } catch (error) {
    console.error("Error canceling room:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});


app.get("/Admin/p", async (req, res) => {
  try {
    const rooms = await Room1.find();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

// Approve a room reservation
app.put("/Admin/p/:id/approved", async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room1.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room approved successfully", room });
  } catch (error) {
    console.error("Error approving room:", error);
    res.status(500).json({ message: "Failed to approve room" });
  }
});




// app.post("/book", async (req, res) => {
//   try {
//     // Create a new room booking entry with Room1
//     const data = new Room1(req.body); // Creating the booking record
//     await data.save();  // Save the booking data

//     // Log the room number for debugging
//     // console.log("Room number to update:", data.RoomNo); // Ensure this has the correct value

//     // Update the room's availability
    // const result = await Room.updateOne(
    //   { roomNumber: data.RoomNo }, // Find the room by roomNumber (data.RoomNo)
    //   { $set: { availability: false } } // Set availability to false
    // );

//     if (result.modifiedCount > 0) {
      // return res.send({
      //   success: true,
      //   // message: `Room ${data.RoomNo} has been booked successfully and its availability has been updated to false.`,
      //   message: `Your Room ${data.RoomNo} Has Been Booked`,
      //   data: data,
      // });
//     } else {
//       return res.status(404).send({
//         success: false,
//         message: `Room ${data.RoomNo} not found or already unavailable.`,
//       });
//     }
  // } catch (error) {
  //   console.error("Error during booking and updating room:", error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Error adding Room and updating availability.",
  //     error: error.message,
  //   });
  // }
// });



// Fetch rooms by room number
app.get("/api/fetchbook/:id", async (req, res) => {
  const { id } = req.params;  // Get the room number (id) from request parameters
  
  try {
    // Find rooms by roomNumber (Replace Room1 with your actual model)
    const rooms = await Room1.find({ RoomNo: id }).sort({ ExitDate: -1 });  // Sort by ExitDate descending to get the latest booking

    // If no rooms found, return today's date as Entry Date and Exit Date as today
    if (rooms.length === 0) {
      return res.json({
        message: "No rooms found with this room number",
        nextAvailableEntryDate: getTodayDate(), // No bookings, set entry date as today
        exitDate: getTodayDate()  // Set ExitDate as today
      });
    }

    // Get the latest ExitDate from the most recent booking
    const latestExitDate = rooms[0].ExitDate;
    const nextAvailableEntryDate = addOneDay(latestExitDate);  // Entry Date will be the day after the latest ExitDate

    res.json({
      message: "Rooms found",
      nextAvailableEntryDate,
      exitDate: latestExitDate // Return the most recent ExitDate as reference
    });
  } catch (error) {
    // Send error message if the request fails
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Error fetching room data", error });
  }
});

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];  // Return in the format YYYY-MM-DD
};

// Helper function to add one day to a given date
const addOneDay = (date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toISOString().split("T")[0];  // Return in the format YYYY-MM-DD
};






// app.post("/book", async (req, res) => {
//   try {
//     const data = new Room1(req.body);
//     const data1 = new Room1(data.RoomNo);
//     alert(data1);
//     await data.save();
//     // console.log(data)
//     const result = await Room.updateOne(
//       { roomNumber: data1 }, // Find the room by its roomNumber
//       { $set: { availability: false } })

//     res.send({
//       success: true, // Ensure this field matches the client-side expectation
//       message: `Data is successfully added ${data.data.RoomNo}`,
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).send({ success: false, message: "Error adding Room", error });
//   }
// });




// Update room availability by roomNumber
// app.put("/update", async (req, res) => {
//   const { roomNumber } = req.body; // Destructure roomNumber from the request body

//   try {
//     const result = await Room.updateOne(
//       { roomNumber: roomNumber }, // Find the room by its roomNumber
//       { $set: { availability: false } } // Update availability to false
//     );

//     if (result.modifiedCount > 0) {
//       return res.status(200).json({
//         success: true,
//         message: `Room ${roomNumber} availability has been updated to false.`,
//       });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: `Room ${roomNumber} not found or already updated.`,
//       });
//     }
//   } catch (error) {
//     console.error("Error updating room availability:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error updating room availability.",
//       error: error.message,
//     });
//   }
// });



const messageSchema1 = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: "pending" }, // Status: Sent or Pending
});

// Check if the model is already defined
const Messages = mongoose.models.Message || mongoose.model("Message", messageSchema1);

// Routes
app.post("/submit-form", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Messages({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Messages.find();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

app.delete("/messages/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Messages.findByIdAndDelete(id);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

app.put("/messages/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Messages.findByIdAndUpdate(id, { status: "Accepted" }, { new: true });
    res.json(message);
  } catch (error) {
    console.error("Error updating message status:", error);
    res.status(500).json({ message: "Failed to update message status" });
  }
});






app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
