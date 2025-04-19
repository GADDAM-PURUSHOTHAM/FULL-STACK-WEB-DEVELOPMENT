import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./frontend/js/Navbar";
import Banner from "./frontend/js/Banner";

import Footer from "./frontend/js/Footer";
import Booking from "./frontend/js/Booking";
import Calendar from "./frontend/js/Calendar";
import ABC from "./frontend/js/ABC";
import Accommodation from "./frontend/js/Accommodation";
import "bootstrap/dist/css/bootstrap.min.css";
import Stripe from "./frontend/js/Stripe";
import Form from "./frontend/js/Form";
import RegisterForm from "./frontend/js/RegisterForm";
import LoginForm from "./frontend/js/LoginForm";

import Gallery from "./frontend/js/Gallery";
import Users from "./frontend/js/Users";
import ReservationList from "./frontend/js/ReservationList";
import Admin from "./frontend/js/Admin";
import Book from "./frontend/js/Book";
import ThankYou from "./frontend/js/ThankYouPage";
import Manage from "./frontend/js/manage";
import AddRoom from "./frontend/js/addroom";
import HolderRooms from "./frontend/js/HoldedRooms";
// import ContactForm from "./frontend/js/ContactForm";
import ContactForm from "./frontend/js/Contact";
import Messages from "./frontend/js/messages";
import Reserve from "./frontend/js/Reserve";
import Forget from "./frontend/js/forget";
import ContactHome from "./frontend/js/ContactHome";


import MyBookings from "./frontend/js/MyBookings";

// import Contact from "./frontend/js/Contact";

function Bookingsection() {
  return <Booking />;
}

function Calandarsection() {
  return <Calendar />;
}

function Homepage() {
  return (
    <>
      <Navbar />
      <Banner />
      <Gallery/>
     
     
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<Bookingsection />} />
        <Route path="/calendar" element={<Calandarsection />} />
        <Route path="/abc" element={<ABC />} />
        <Route path="/acc" element={<Accommodation />} />
        <Route path="/str" element={<Stripe />} />
        <Route path="/frm" element={<Form />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/reservation" element={<ReservationList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/book/:roomNumber" element={<Book />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/manage" element={<Manage/>} />
        <Route path="/addroom" element={<AddRoom/>} />
        <Route path="/holdrooms" element={<HolderRooms/>} />
        <Route path="/contact" element={<ContactForm/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/mybookings" element={<MyBookings/>} />
        <Route path="/reserve" element={<Reserve/>} />
        <Route path="/forget" element={<Forget/>} />
        <Route path="/home" element={<ContactHome/>} />
      
     
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
