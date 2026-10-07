import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Seat from "../components/Seat";

function Seats() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get data sent from Theatres page
    const bookingData = location.state;

    // If user opens /seats directly
    if (!bookingData) {
        return (
            <div className="page booking-error">
                <div className="booking-card">
                    <h1>Show Not Selected</h1>

                    <p>
                        Please select a movie, theatre and show time
                        before selecting seats.
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

    // Select / deselect seat
    function selectSeat(seat) {
        if (bookedSeats.includes(seat)) {
            return;
        }

        if (selectedSeats.includes(seat)) {
            // Remove seat
            setSelectedSeats(
                selectedSeats.filter(
                    (item) => item !== seat
                )
            );
        } else {
            // Add seat
            setSelectedSeats([
                ...selectedSeats,
                seat
            ]);
        }
    }

    // Continue to booking page
    function continueBooking() {
        if (selectedSeats.length === 0) {
            return;
        }

        navigate("/booking", {
            state: {
                movie,
                theatre,
                time,
                selectedSeats
            }
        });
    }

    return (
        <div className="page seats-page">

            {/* Page heading */}
            <div className="seats-header">

                <h1>Select Your Seats</h1>

                <p>
                    {theatre?.name || "Theatre"}{" "}
                    |{" "}
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

            {/* Seat layout */}
            <div className="seat-layout">

                {rows.map((row) => (
                    <div
                        className="seat-row"
                        key={row}
                    >

                        {/* Row name */}
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

            {/* Seat legend */}
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
                    Number of tickets:{" "}
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
                    onClick={continueBooking}
                >
                    Continue to Booking
                </button>

            </div>

        </div>
    );
}

export default Seats;