
import { useState } from "react";
import { Link } from "react-router-dom";

function MyBookingsPage() {
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("navig8DemoBookings") || "[]"
      );
    } catch {
      return [];
    }
  });

  function cancelBooking(id) {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== id
    );

    localStorage.setItem(
      "navig8DemoBookings",
      JSON.stringify(updatedBookings)
    );

    setBookings(updatedBookings);
  }

  const approvedCount = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

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
        <Link to="/dashboard" className="dashboard-home">
          Back to Dashboard
        </Link>

        <div className="dashboard-top">
          <div>
            <span className="section-kicker">STUDENT PORTAL</span>
            <h1>My Bookings</h1>
            <p>
              View your resource booking requests and their statuses.
            </p>
          </div>

          <Link to="/" className="dashboard-home">
            Browse Resources
          </Link>
        </div>

        <section className="dashboard-stats">
          <article className="stat-card">
            <span>Total Requests</span>
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

        <section className="dashboard-bookings">
          <h2>Booking History</h2>

          {bookings.length === 0 ? (
            <div className="empty-state">
              <span>📅</span>
              <h3>No bookings yet</h3>
              <p>
                Browse the resource directory and submit your first
                booking request.
              </p>
              <Link to="/" className="dashboard-home">
                Find Resources
              </Link>
            </div>
          ) : (
            <div className="booking-list">
              {bookings.map((booking) => (
                <article className="booking-row" key={booking.id}>
                  <div className="booking-icon">📅</div>

                  <div className="booking-info">
                    <h3>{booking.resourceName || booking.resource}</h3>
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

                  {booking.status === "Pending" && (
                    <button
                      className="reset-button"
                      type="button"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Request
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="sample-notice">
          Demonstration only. Bookings are stored in this browser and
          are not sent to the university booking system.
        </p>
      </div>
    </main>
  );
}

export default MyBookingsPage;
