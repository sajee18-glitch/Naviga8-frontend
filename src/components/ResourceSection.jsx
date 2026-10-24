
import { useState } from "react";

const resources = [
  {
    id: 1,
    name: "3D Printing Facility",
    category: "Equipment",
    location: "Engineering Workshop",
    icon: "🖨️",
    description: "Explore resources for engineering prototypes and projects.",
  },
  {
    id: 2,
    name: "Computer Laboratory",
    category: "Software / Digital Resource",
    location: "Engineering Faculty",
    icon: "💻",
    description: "Discover computing resources and engineering software.",
  },
  {
    id: 3,
    name: "Electronics Laboratory",
    category: "Laboratory",
    location: "Engineering Faculty",
    icon: "🔬",
    description: "Explore facilities for electronics experiments and circuit testing.",
  },
  {
    id: 4,
    name: "Prototyping Workshop",
    category: "Workshop",
    location: "Engineering Workshop",
    icon: "🛠️",
    description: "Discover facilities for building and testing prototypes.",
  },
  {
    id: 5,
    name: "Engineering Study Space",
    category: "Shared Space",
    location: "Engineering Faculty",
    icon: "📚",
    description: "Explore shared spaces for individual and group learning.",
  },
];

const categories = [
  "All",
  "Laboratory",
  "Workshop",
  "Equipment",
  "Software / Digital Resource",
  "Shared Space",
];

function ResourceSection({
  selectedCategory = "All",
  onSelectCategory = () => {},
}) {
  const [search, setSearch] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [bookingResource, setBookingResource] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [booking, setBooking] = useState({
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  const today = new Date().toLocaleDateString("en-CA");

  const filteredResources = resources.filter((resource) => {
    const text = [
      resource.name,
      resource.category,
      resource.location,
      resource.description,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = text.includes(search.trim().toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function openBooking(resource) {
    setSelectedResource(null);
    setBookingResource(resource);
    setBookingMessage("");
    setBooking({
      date: "",
      startTime: "",
      endTime: "",
      purpose: "",
    });
  }

  function handleBookingSubmit(event) {
    event.preventDefault();

    if (booking.endTime <= booking.startTime) {
      setBookingMessage("End time must be later than start time.");
      return;
    }

    const newBooking = {
      id: `DEMO-${Date.now()}`,
      resourceName: bookingResource.name,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      purpose: booking.purpose,
      status: "Pending",
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("navig8DemoBookings") || "[]"
    );

    localStorage.setItem(
      "navig8DemoBookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    setBookingMessage(
      "Demo booking request submitted successfully! Status: Pending."
    );
  }

  return (
    <section className="resource-section" id="resources">
      <div className="resource-heading">
        <span className="section-kicker">RESOURCE DIRECTORY</span>
        <h2>Find your next resource</h2>
        <p>Search and explore engineering resources in one place.</p>
      </div>

      <div className="resource-controls">
        <label className="resource-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search resources or locations..."
            aria-label="Search resources"
          />
        </label>

        <label className="category-filter">
          <span className="visually-hidden">Filter by category</span>
          <select
            value={selectedCategory}
            onChange={(event) => onSelectCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All categories" : category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="result-count" aria-live="polite">
        Showing {filteredResources.length}{" "}
        {filteredResources.length === 1 ? "resource" : "resources"}
      </p>

      <div className="resource-grid">
        {filteredResources.map((resource) => (
          <article className="resource-card" key={resource.id}>
            <div className="resource-icon" aria-hidden="true">
              {resource.icon}
            </div>

            <span className="resource-category">
              {resource.category}
            </span>

            <h3>{resource.name}</h3>
            <p>{resource.location}</p>
            <p>{resource.description}</p>

                    <button
        className="details-button"
        type="button"
        onClick={() => {
            console.log("View Details clicked:", resource.name);
            setSelectedResource(resource);
        }}
        >
        View Details
        </button>
        
        <button
        className="details-button"
        type="button"
        onClick={() => {
            console.log("Book Now clicked:", resource.name);
            openBooking(resource);
        }}
        >
        Book Now
        </button>

          </article>
        ))}

        {filteredResources.length === 0 && (
          <p>No resources match your search. Try another keyword or category.</p>
        )}
      </div>

      {selectedResource && (
        <div
          className="details-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedResource(null);
            }
          }}
        >
          <section
            className="details-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resource-details-title"
          >
            <button
              className="close-details"
              type="button"
              onClick={() => setSelectedResource(null)}
              aria-label="Close resource details"
            >
              ×
            </button>

            <span className="section-kicker">RESOURCE DETAILS</span>
            <h2 id="resource-details-title">
              {selectedResource.icon} {selectedResource.name}
            </h2>

            <p>
              <strong>Category:</strong> {selectedResource.category}
            </p>
            <p>
              <strong>Location:</strong> {selectedResource.location}
            </p>
            <p>{selectedResource.description}</p>

            <button
              className="details-button"
              type="button"
              onClick={() => openBooking(selectedResource)}
            >
              Request Booking
            </button>
          </section>
        </div>
      )}

      {bookingResource && (
        <div className="details-overlay">
          <section
            className="details-panel booking-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-form-title"
          >
            <button
              className="close-details"
              type="button"
              onClick={() => setBookingResource(null)}
              aria-label="Close booking form"
            >
              ×
            </button>

            <span className="section-kicker">BOOKING REQUEST</span>
            <h2 id="booking-form-title">
              Book {bookingResource.name}
            </h2>
            <p>{bookingResource.location}</p>

            <form onSubmit={handleBookingSubmit}>
              <label>
                Booking date
                <input
                  type="date"
                  min={today}
                  required
                  value={booking.date}
                  onChange={(event) =>
                    setBooking({ ...booking, date: event.target.value })
                  }
                />
              </label>

              <label>
                Start time
                <input
                  type="time"
                  required
                  value={booking.startTime}
                  onChange={(event) =>
                    setBooking({ ...booking, startTime: event.target.value })
                  }
                />
              </label>

              <label>
                End time
                <input
                  type="time"
                  required
                  value={booking.endTime}
                  onChange={(event) =>
                    setBooking({ ...booking, endTime: event.target.value })
                  }
                />
              </label>

              <label>
                Purpose of booking
                <textarea
                  required
                  rows="3"
                  placeholder="Explain why you need this resource..."
                  value={booking.purpose}
                  onChange={(event) =>
                    setBooking({ ...booking, purpose: event.target.value })
                  }
                />
              </label>

              <button className="details-button" type="submit">
                Submit Booking Request
              </button>
            </form>

            {bookingMessage && (
              <p role="status" className="booking-message">
                {bookingMessage}
              </p>
            )}

            <p className="sample-notice">
              Demonstration only. This request is saved in this browser, not
              sent to the university booking system.
            </p>
          </section>
        </div>
      )}

      <p className="sample-notice">
        Demonstration resources only. Verify availability before use.
      </p>
    </section>
  );
}

export default ResourceSection;
