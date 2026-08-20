import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
      {/* Mantém o layout original com Navbar e Footer */}
      <Route element={<Layout />}>

        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />

        <Route
          path="/courts"
          element={<Courts />}
        />

        <Route
          path="/courts/:id"
          element={<CourtDetail />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/sign-up"
          element={<SignUp />}
        />

        {/* Rota protegida */}
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedTypes={["JOGADOR", "ADMIN"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Confirmação de reserva também exige usuário logado */}
        <Route
          path="/booking-confirmed/:bookingId"
          element={
            <ProtectedRoute allowedTypes={["JOGADOR", "ADMIN"]}>
              <BookingConfirmed />
            </ProtectedRoute>
          }
        />

        {/* Página não encontrada */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>
    </Routes>
  );
}