import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Snacks() {
    const location = useLocation();
    const navigate = useNavigate();

    const bookingData = location.state;

    const [quantities, setQuantities] = useState({});

    const snacks = [
        {
            id: 1,
            name: "Classic Popcorn",
            icon: "🍿",
            price: 150,
            description: "Fresh salted popcorn"
        },
        {
            id: 2,
            name: "Large Popcorn",
            icon: "🍿",
            price: 220,
            description: "Large cinema popcorn"
        },
        {
            id: 3,
            name: "Coca-Cola",
            icon: "🥤",
            price: 100,
            description: "Chilled soft drink"
        },
        {
            id: 4,
            name: "Pepsi",
            icon: "🥤",
            price: 100,
            description: "Chilled soft drink"
        },
        {
            id: 5,
            name: "Hot Dog",
            icon: "🌭",
            price: 180,
            description: "Classic cinema hot dog"
        },
        {
            id: 6,
            name: "Pizza",
            icon: "🍕",
            price: 250,
            description: "Cheesy personal pizza"
        },
        {
            id: 7,
            name: "Chocolate",
            icon: "🍫",
            price: 120,
            description: "Milk chocolate bar"
        },
        {
            id: 8,
            name: "Mineral Water",
            icon: "💧",
            price: 50,
            description: "500 ml water bottle"
        }
    ];

    // Increase quantity
    function increaseSnack(id) {
        setQuantities((previous) => ({
            ...previous,
            [id]: (previous[id] || 0) + 1
        }));
    }

    // Decrease quantity
    function decreaseSnack(id) {
        setQuantities((previous) => {
            const currentQuantity =
                previous[id] || 0;

            if (currentQuantity <= 1) {
                const updated = {
                    ...previous
                };

                delete updated[id];

                return updated;
            }

            return {
                ...previous,
                [id]: currentQuantity - 1
            };
        });
    }

    // Calculate snack total
    function calculateSnackTotal() {
        return snacks.reduce(
            (total, snack) => {
                const quantity =
                    quantities[snack.id] || 0;

                return total + snack.price * quantity;
            },
            0
        );
    }

    // Prepare selected snacks
    function getSelectedSnacks() {
        return snacks
            .filter(
                (snack) =>
                    (quantities[snack.id] || 0) > 0
            )
            .map((snack) => ({
                ...snack,
                quantity: quantities[snack.id]
            }));
    }

    // Continue to receipt
    function continueToReceipt() {
        const selectedSnacks =
            getSelectedSnacks();

        navigate("/receipt", {
            state: {
                movie: bookingData?.movie,
                theatre: bookingData?.theatre,
                time: bookingData?.time,
                selectedSeats:
                    bookingData?.selectedSeats || [],
                snacks: selectedSnacks
            }
        });
    }

    // Skip snacks
    function skipSnacks() {
        navigate("/receipt", {
            state: {
                movie: bookingData?.movie,
                theatre: bookingData?.theatre,
                time: bookingData?.time,
                selectedSeats:
                    bookingData?.selectedSeats || [],
                snacks: []
            }
        });
    }

    // Direct access protection
    if (!bookingData) {
        return (
            <div className="page booking-error">
                <div className="booking-card">
                    <h1>Booking Information Not Found</h1>

                    <p>
                        Please select your movie, theatre,
                        show time and seats first.
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

    const snackTotal =
        calculateSnackTotal();

    return (
        <div className="page snacks-page">

            {/* Header */}
            <div className="snacks-header">

                <h1>
                    🍿 Choose Your Snacks
                </h1>

                <p>
                    Make your movie experience
                    even better!
                </p>

                {bookingData.movie && (
                    <h3>
                        🎬 {bookingData.movie.title}
                    </h3>
                )}

                <p>
                    {bookingData.theatre?.name}
                    {" | "}
                    {bookingData.time}
                </p>

            </div>

            {/* Snacks */}
            <div className="snacks-grid">

                {snacks.map((snack) => {

                    const quantity =
                        quantities[snack.id] || 0;

                    return (
                        <div
                            className="snack-card"
                            key={snack.id}
                        >

                            <div className="snack-icon">
                                {snack.icon}
                            </div>

                            <div className="snack-info">

                                <h2>
                                    {snack.name}
                                </h2>

                                <p>
                                    {snack.description}
                                </p>

                                <h3>
                                    ₹{snack.price}
                                </h3>

                            </div>

                            <div className="quantity-control">

                                <button
                                    onClick={() =>
                                        decreaseSnack(
                                            snack.id
                                        )
                                    }
                                    disabled={quantity === 0}
                                >
                                    −
                                </button>

                                <span>
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseSnack(
                                            snack.id
                                        )
                                    }
                                >
                                    +
                                </button>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* Summary */}
            <div className="snacks-summary">

                <div>
                    <span>
                        Selected Snacks
                    </span>

                    <b>
                        {Object.values(quantities).reduce(
                            (total, value) =>
                                total + value,
                            0
                        )}
                    </b>
                </div>

                <div>
                    <span>
                        Snacks Total
                    </span>

                    <b>
                        ₹{snackTotal}
                    </b>
                </div>

            </div>

            {/* Actions */}
            <div className="snacks-actions">

                <button
                    className="secondary-btn"
                    onClick={() => navigate(-1)}
                >
                    Back to Seats
                </button>

                <button
                    className="skip-btn"
                    onClick={skipSnacks}
                >
                    Skip Snacks
                </button>

                <button
                    className="primary-btn"
                    onClick={continueToReceipt}
                >
                    Continue to Receipt
                </button>

            </div>

        </div>
    );
}

export default Snacks;