import { useState } from "react";
import { Link } from "react-router-dom";
import logoutButton from "../components/LogoutButton";
import LogoutButton from "../components/LogoutButton";

function StudentDashboard() {
  const [bookings] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("navig8DemoBookings") || "[]"
      );
    } catch {
      return [];
    }
  });

  const approvedCount = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const recentBookings = [...bookings].reverse().slice(0, 3);

  function formatDate(date) {
    if (!date) return "Date not provided";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  function formatTime(time) {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-top">
          <div>
            <span className="section-kicker">STUDENT PORTAL</span>
            <h1>My Dashboard</h1>
            <p>Manage your engineering resources and bookings.</p>
          </div>
          <LogoutButton />

          <Link to="/" className="dashboard-home">
            Back to Home
          </Link>
        </div>

        <section className="dashboard-stats">
          <article className="stat-card">
            <span>Total Bookings</span>
            <strong>{bookings.length}</strong>
          </article>

          <article className="stat-card">
            <span>Approved</span>
            <strong>{approvedCount}</strong>
          </article>

          <article className="stat-card">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </article>
        </section>

        <section className="dashboard-actions">
          <Link to="/#resources" className="dashboard-action">
            <span>🔎</span>
            <div>
              <h3>Explore Resources</h3>
              <p>Find laboratories, equipment and shared spaces.</p>
            </div>
            <span>↗</span>
          </Link>

          <Link to="/bookings" className="dashboard-action">
            <span>📅</span>
            <div>
              <h3>My Bookings</h3>
              <p>Review your booking requests and their statuses.</p>
            </div>
            <span>↗</span>
          </Link>
        </section>

        <section className="dashboard-bookings">
          <div className="dashboard-section-heading">
            <div>
              <h2>Recent Bookings</h2>
              <p>Your latest resource booking requests.</p>
            </div>

            <Link to="/bookings">View all</Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="empty-state">
              <span>📅</span>
              <h3>No bookings yet</h3>
              <p>
                Browse the resource directory to submit your first
                booking request.
              </p>
              <Link to="/#resources" className="dashboard-home">
                Explore Resources
              </Link>
            </div>
          ) : (
            <div className="booking-list">
              {recentBookings.map((booking) => (
                <article className="booking-row" key={booking.id}>
                  <div className="booking-icon">📅</div>

                  <div className="booking-info">
                    <h3>
                      {booking.resourceName || booking.resource}
                    </h3>

                    <p>{formatDate(booking.date)}</p>

                    <p>
                      {booking.startTime && booking.endTime
                        ? `${formatTime(booking.startTime)} - ${formatTime(
                            booking.endTime
                          )}`
                        : booking.time || "Time not provided"}
                    </p>

                    {booking.purpose && (
                      <p>Purpose: {booking.purpose}</p>
                    )}
                  </div>

                  <span
                    className={`booking-status ${
                      (booking.status || "Pending").toLowerCase()
                    }`}
                  >
                    {booking.status || "Pending"}
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="sample-notice">
          Demonstration only. Booking information is stored in this
          browser and is not connected to the university backend yet.
        </p>
      </div>
    </main>
  );
}

export default StudentDashboard;
