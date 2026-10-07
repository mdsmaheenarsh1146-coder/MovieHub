import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Seat from "../components/Seat";

function Seats() {
  const location = useLocation();
  const navigate = useNavigate();

  // Booking information received from Theatres page
  const bookingData = location.state;

  // Selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Already booked seats
  const bookedSeats = [
    "A3",
    "B5",
    "C2",
    "D7"
  ];

  // Seat rows
  const rows = ["A", "B", "C", "D"];

  // Select or deselect a seat
  function selectSeat(seat) {
    if (bookedSeats.includes(seat)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter(
          (item) => item !== seat
        )
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seat
      ]);
    }
  }

  // Go to snacks page
  function continueToSnacks() {
    if (selectedSeats.length === 0) {
      return;
    }

    navigate("/snacks", {
      state: {
        movie: bookingData?.movie,
        theatre: bookingData?.theatre,
        time: bookingData?.time,
        selectedSeats: selectedSeats
      }
    });
  }

  // If page is opened directly
  if (!bookingData) {
    return (
      <div className="page booking-error">
        <div className="booking-card">
          <h1>Show Not Selected</h1>

          <p>
            Please select a movie, theatre and show
            time before selecting seats.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/movies")}
          >
            Go to Movies
          </button>
        </div>
      </div>
    );
  }

  const {
    movie,
    theatre,
    time
  } = bookingData;

  return (
    <div className="page seats-page">

      {/* Heading */}
      <div className="seats-header">

        <h1>Select Your Seats</h1>

        <p>
          {theatre?.name || "Theatre"}
          {" | "}
          {time || "Show Time"}
        </p>

        {movie && (
          <h3>
            🎬 {movie.title}
          </h3>
        )}

      </div>

      {/* Screen */}
      <div className="screen">
        SCREEN
      </div>

      <p className="screen-note">
        All eyes this way
      </p>

      {/* Seats */}
      <div className="seat-layout">

        {rows.map((row) => (
          <div
            className="seat-row"
            key={row}
          >

            <span className="row-label">
              {row}
            </span>

            {Array.from(
              { length: 8 },
              (_, index) => {

                const seat =
                  `${row}${index + 1}`;

                return (
                  <Seat
                    key={seat}
                    number={seat}
                    selected={selectedSeats.includes(
                      seat
                    )}
                    booked={bookedSeats.includes(
                      seat
                    )}
                    onClick={() =>
                      selectSeat(seat)
                    }
                  />
                );
              }
            )}

          </div>
        ))}

      </div>

      {/* Legend */}
      <div className="seat-legend">

        <div className="legend-item">
          <span className="legend-box available"></span>
          Available
        </div>

        <div className="legend-item">
          <span className="legend-box selected"></span>
          Selected
        </div>

        <div className="legend-item">
          <span className="legend-box booked"></span>
          Booked
        </div>

      </div>

      {/* Selected seats */}
      <div className="selected-seat-box">

        <h2>
          Selected Seats
        </h2>

        <p>
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "No seats selected"}
        </p>

        <p>
          Number of Tickets:{" "}
          <b>{selectedSeats.length}</b>
        </p>

      </div>

      {/* Buttons */}
      <div className="seat-actions">

        <button
          className="secondary-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button
          className="primary-btn"
          disabled={
            selectedSeats.length === 0
          }
          onClick={continueToSnacks}
        >
          Continue to Snacks 🍿
        </button>

      </div>

    </div>
  );
}

export default Seats;