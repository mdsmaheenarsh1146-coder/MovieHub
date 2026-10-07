import {
    useLocation,
    useNavigate
} from "react-router-dom";

import TheatreCard from "../components/TheatreCard";

function Theatres() {

    const navigate = useNavigate();
    const location = useLocation();

    const movie = location.state?.movie;

    const theatres = [
        {
            id: 1,
            name: "PVR Cinemas",
            location: "City Mall",
            rating: 4.5,
            shows: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
        },

        {
            id: 2,
            name: "INOX",
            location: "Central Mall",
            rating: 4.3,
            shows: ["11:00 AM", "2:30 PM", "6:00 PM", "9:00 PM"]
        },

        {
            id: 3,
            name: "Cinepolis",
            location: "Metro Mall",
            rating: 4.4,
            shows: ["10:30 AM", "1:00 PM", "4:30 PM", "8:00 PM"]
        },

        {
            id: 4,
            name: "AMB Cinemas",
            location: "Gachibowli",
            rating: 4.7,
            shows: ["10:00 AM", "2:00 PM", "5:30 PM", "9:00 PM"]
        },

        {
            id: 5,
            name: "Miraj Cinemas",
            location: "Forum Mall",
            rating: 4.2,
            shows: ["11:30 AM", "3:00 PM", "6:30 PM", "9:30 PM"]
        },

        {
            id: 6,
            name: "Asian Cinemas",
            location: "City Centre",
            rating: 4.4,
            shows: ["10:30 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
        },

        {
            id: 7,
            name: "Prasads Multiplex",
            location: "Necklace Road",
            rating: 4.6,
            shows: ["9:30 AM", "12:30 PM", "4:00 PM", "7:30 PM"]
        },

        {
            id: 8,
            name: "INOX Megaplex",
            location: "Inorbit Mall",
            rating: 4.5,
            shows: ["10:00 AM", "1:00 PM", "4:30 PM", "8:00 PM"]
        },

        {
            id: 9,
            name: "AAA Cinemas",
            location: "Ameerpet",
            rating: 4.3,
            shows: ["11:00 AM", "2:00 PM", "5:30 PM", "9:00 PM"]
        },

        {
            id: 10,
            name: "Platinum Cinemas",
            location: "Banjara Hills",
            rating: 4.1,
            shows: ["10:30 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
        }
    ];


    function selectShow(theatre, time) {

        navigate("/seats", {
            state: {
                movie,
                theatre,
                time
            }
        });

    }


    return (

        <div className="page theatres-page">

            <h1>Available Theatres</h1>

            {movie && (
                <p className="selected-movie">
                    Booking tickets for:
                    <b> {movie.title}</b>
                </p>
            )}

            <div className="theatre-grid">

                {theatres.map((theatre) => (

                    <TheatreCard
                        key={theatre.id}
                        theatre={theatre}
                        onSelect={selectShow}
                    />

                ))}

            </div>

        </div>
    );
}

export default Theatres;