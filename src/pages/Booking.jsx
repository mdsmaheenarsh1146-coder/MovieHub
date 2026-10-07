import {
    useLocation,
    useNavigate
} from "react-router-dom";

function Booking() {

    const location = useLocation();
    const navigate = useNavigate();

    const booking = location.state;

    // If booking data is missing
    if (!booking) {

        return (
            <div className="page booking-error">

                <div className="booking-card">

                    <h1>Booking Information Not Found</h1>

                    <p>
                        Please select a movie, theatre, show time,
                        and seats before opening the booking page.
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
        time,
        selectedSeats
    } = booking;


    const pricePerTicket = 200;

    const total =
        selectedSeats.length * pricePerTicket;


    function confirmBooking() {

        alert(
            `Booking confirmed for ${movie?.title || "your movie"}!`
        );

        navigate("/");
    }


    return (

        <div className="page booking-page">

            <div className="booking-card">

                <h1>Booking Summary</h1>


                {movie && (
                    <div className="booking-movie">

                        {movie.poster_path && (

                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />

                        )}

                        <div>

                            <h2>
                                {movie.title}
                            </h2>

                            <p>
                                ⭐ {movie.vote_average?.toFixed(1)}
                            </p>

                        </div>

                    </div>
                )}


                <div className="booking-details">

                    <p>
                        <b>Theatre:</b>{" "}
                        {theatre?.name || "Not selected"}
                    </p>

                    <p>
                        <b>Location:</b>{" "}
                        {theatre?.location || "Not available"}
                    </p>

                    <p>
                        <b>Show Time:</b>{" "}
                        {time || "Not selected"}
                    </p>

                    <p>
                        <b>Seats:</b>{" "}
                        {selectedSeats?.join(", ") || "None"}
                    </p>

                    <p>
                        <b>Number of Tickets:</b>{" "}
                        {selectedSeats?.length || 0}
                    </p>

                    <p>
                        <b>Price per Ticket:</b>{" "}
                        ₹{pricePerTicket}
                    </p>

                </div>


                <div className="booking-total">

                    <h2>
                        Total: ₹{total}
                    </h2>

                </div>


                <div className="booking-actions">

                    <button
                        className="secondary-btn"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>


                    <button
                        className="primary-btn"
                        onClick={confirmBooking}
                    >
                        Confirm Booking
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Booking;