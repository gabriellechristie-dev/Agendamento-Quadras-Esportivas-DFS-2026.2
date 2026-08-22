import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext(null);

const BOOKINGS_KEY = "arenaplay:bookings";
const FAVORITES_KEY = "arenaplay:favorites";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function generateConfirmationCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `AP-${code}`;
}

/**
 * Manages the player's bookings and favorite courts. Since there is no
 * backend yet, everything is persisted in localStorage — the shape below
 * mirrors the suggested database model (player, court, date, start/end
 * time) so it can be swapped for real API calls later without reworking
 * the screens.
 */
export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => readJSON(BOOKINGS_KEY, []));
  const [favorites, setFavorites] = useState(() => readJSON(FAVORITES_KEY, []));

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function createBooking(data) {
    const newBooking = {
      id: crypto.randomUUID(),
      confirmationCode: generateConfirmationCode(),
      status: "confirmed",
      createdAt: new Date().toISOString(),
      ...data,
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  }

  function cancelBooking(id) {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking,
      ),
    );
  }

  function toggleFavorite(courtId) {
    setFavorites((prev) =>
      prev.includes(courtId)
        ? prev.filter((id) => id !== courtId)
        : [...prev, courtId],
    );
  }

  function isFavorite(courtId) {
    return favorites.includes(courtId);
  }

  function isSlotBooked(courtId, date, time) {
    return bookings.some(
      (booking) =>
        booking.status === "confirmed" &&
        String(booking.courtId) === String(courtId) &&
        booking.date === date &&
        booking.time === time,
    );
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        favorites,
        createBooking,
        cancelBooking,
        toggleFavorite,
        isFavorite,
        isSlotBooked,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
