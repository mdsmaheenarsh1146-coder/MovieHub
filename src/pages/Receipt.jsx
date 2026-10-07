import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Receipt() {
    const location = useLocation();
    const navigate = useNavigate();

    const bookingData = location.state || {};

    const movie = bookingData.movie;
    const theatre = bookingData.theatre;
    const time = bookingData.time;

    const selectedSeats =
        bookingData.selectedSeats || [];

    const selectedSnacks =
        bookingData.selectedSnacks || [];

    const snackTotal =
        bookingData.snackTotal || 0;

    const [bookingId] = useState(() => {
        return (
            "MH" +
            Math.floor(
                100000 + Math.random() * 900000
            )
        );
    });

    const ticketPrice = 200;

    const ticketTotal =
        selectedSeats.length * ticketPrice;

    const grandTotal =
        ticketTotal + snackTotal;

    useEffect(() => {

        const receipt = {
            bookingId,

            movie: movie?.title || "Unknown Movie",

            theatre:
                theatre?.name || "Unknown Theatre",

            location:
                theatre?.location || "",

            time: time || "",

            seats: selectedSeats,

            snacks: selectedSnacks,

            ticketPrice,

            ticketTotal,

            snackTotal,

            grandTotal,

            bookingDate:
                new Date().toLocaleString()
        };

        localStorage.setItem(
            "movieHubLatestReceipt",
            JSON.stringify(receipt)
        );

        const previousReceipts =
            JSON.parse(
                localStorage.getItem(
                    "movieHubReceipts"
                )
            ) || [];

        previousReceipts.push(receipt);

        localStorage.setItem(
            "movieHubReceipts",
            JSON.stringify(previousReceipts)
        );

    }, []);

    function printReceipt() {
        window.print();
    }

    async function saveAsPDF() {
        const receipt =
            document.getElementById("receipt");

        if (!receipt) {
            return;
        }

        const canvas =
            await html2canvas(receipt, {
                scale: 2,

                useCORS: true,

                backgroundColor: "#ffffff"
            });

        const imageData =
            canvas.toDataURL("image/png");

        const pdf =
            new jsPDF("p", "mm", "a4");

        const pdfWidth = 190;

        const pdfHeight =
            (canvas.height * pdfWidth) /
            canvas.width;

        pdf.addImage(
            imageData,
            "PNG",
            10,
            10,
            pdfWidth,
            pdfHeight
        );

        pdf.save(
            `MovieHub-Receipt-${bookingId}.pdf`
        );
    }

    if (!movie || !theatre || !time) {

        return (
            <div className="page booking-error">

                <div className="booking-card">

                    <h1>Receipt Not Found</h1>

                    <p>
                        Please complete a booking first.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate("/movies")
                        }
                    >
                        Go to Movies
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="page receipt-page">

            <div
                className="receipt-card"
                id="receipt"
            >

                <div className="receipt-header">

                    <h1>🎬 MovieHub</h1>

                    <p>
                        Booking Confirmation
                    </p>

                </div>

                <div className="booking-id">

                    <strong>
                        Booking ID:
                    </strong>{" "}

                    {bookingId}

                </div>

                <hr />

                <div className="receipt-section">

                    <h2>
                        Movie Details
                    </h2>

                    <p>
                        <strong>Movie:</strong>{" "}
                        {movie.title}
                    </p>

                    <p>
                        <strong>Theatre:</strong>{" "}
                        {theatre.name}
                    </p>

                    <p>
                        <strong>Location:</strong>{" "}
                        {theatre.location}
                    </p>

                    <p>
                        <strong>Show Time:</strong>{" "}
                        {time}
                    </p>

                </div>


                <div className="receipt-section">

                    <h2>
                        Seats
                    </h2>

                    <p>
                        {selectedSeats.join(", ")}
                    </p>

                    <p>
                        {selectedSeats.length} × ₹
                        {ticketPrice}
                    </p>

                    <p className="amount">
                        ₹{ticketTotal}
                    </p>

                </div>


                <div className="receipt-section">

                    <h2>
                        Snacks & Drinks
                    </h2>

                    {selectedSnacks.length > 0 ? (

                        selectedSnacks.map((snack) => (

                            <div
                                className="receipt-snack"
                                key={snack.id}
                            >

                                <span>
                                    {snack.name}
                                    {" × "}
                                    {snack.quantity}
                                </span>

                                <strong>
                                    ₹{snack.total}
                                </strong>

                            </div>

                        ))

                    ) : (

                        <p>
                            No snacks selected.
                        </p>

                    )}

                    <p className="amount">
                        Snacks: ₹{snackTotal}
                    </p>

                </div>


                <hr />


                <div className="total-section">

                    <span>
                        Total Amount
                    </span>

                    <strong>
                        ₹{grandTotal}
                    </strong>

                </div>


                <p className="booking-date">

                    Booked on:{" "}
                    {new Date().toLocaleString()}

                </p>


                <p className="thank-you">

                    Thank you for booking
                    with MovieHub! 🎉

                </p>

            </div>


            <div className="receipt-actions">

                <button
                    className="print-receipt-btn"
                    onClick={printReceipt}
                >
                    🖨️ Print Receipt
                </button>

                <button
                    className="pdf-receipt-btn"
                    onClick={saveAsPDF}
                >
                    📄 Save as PDF
                </button>

                <button
                    className="secondary-btn"
                    onClick={() =>
                        navigate("/movies")
                    }
                >
                    Book Another Movie
                </button>

            </div>

        </div>
    );
}

export default Receipt;