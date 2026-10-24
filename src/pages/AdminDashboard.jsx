
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function AdminDashboard() {
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("navig8DemoBookings") || "[]"
      );
    } catch {
      return [];
    }
  });

  const updateStatus = (id, status) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking
    );

    localStorage.setItem(
      "navig8DemoBookings",
      JSON.stringify(updatedBookings)
    );

    setBookings(updatedBookings);
  };

  const pending = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-top">
          <div>
            <span className="section-kicker">ADMINISTRATION</span>
            <h1>Admin Dashboard</h1>
            <p>Manage student resource booking requests.</p>
          </div>
          <LogoutButton />
          <Link to="/" className="dashboard-home">
            Back to Home
          </Link>
        </div>

        <section className="dashboard-bookings">
          <h2>Booking Requests</h2>
          <p>Total bookings: {bookings.length}</p>
          <p>Pending requests: {pending}</p>

          {bookings.length === 0 ? (
            <p>No booking requests yet. Create a test booking as a student.</p>
          ) : (
            bookings.map((booking) => (
              <article
                key={booking.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "14px",
                }}
              >
                <h3>{booking.resourceName || booking.resource}</h3>
                <p>Date: {booking.date}</p>
                <p>
                  Time: {booking.startTime} – {booking.endTime}
                </p>
                <p>Purpose: {booking.purpose || "Not specified"}</p>
                <p>
                  Status: <strong>{booking.status}</strong>
                </p>

                {booking.status === "Pending" && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => updateStatus(booking.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </article>
            ))
          )}

          <Link to="/dashboard" className="dashboard-home">
            View Student Dashboard
          </Link>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
