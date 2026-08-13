import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Courts from "./pages/Courts.jsx";
import CourtDetail from "./pages/CourtDetail.jsx";
import BookingConfirmed from "./pages/BookingConfirmed.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/courts/:id" element={<CourtDetail />} />
        <Route path="/booking-confirmed/:bookingId" element={<BookingConfirmed />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
