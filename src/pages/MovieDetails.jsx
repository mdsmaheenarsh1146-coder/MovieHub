import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getMovieDetails
} from "../services/movieApi";


function MovieDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        loadMovie();

    }, [id]);


    async function loadMovie() {

        try {

            setLoading(true);

            setError("");

            const data =
                await getMovieDetails(id);

            setMovie(data);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load movie details."
            );

        } finally {

            setLoading(false);

        }
    }


    if (loading) {

        return (
            <div className="page">
                <h2>Loading movie...</h2>
            </div>
        );

    }


    if (error) {

        return (
            <div className="page">
                <h2>{error}</h2>
            </div>
        );

    }


    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";


    // Find a YouTube trailer
    const trailer = movie.videos?.results?.find(
        (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
    );


    // If official trailer isn't available,
    // find any YouTube trailer
    const anyTrailer =
        trailer ||
        movie.videos?.results?.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        );


    return (

        <div className="page">

            <div className="movie-details">

                <img
                    src={poster}
                    alt={movie.title}
                />


                <div className="movie-details-info">

                    <h1>{movie.title}</h1>


                    <p>
                        ⭐ Rating:
                        {" "}
                        {movie.vote_average.toFixed(1)}
                    </p>


                    <p>
                        Release Date:
                        {" "}
                        {movie.release_date || "N/A"}
                    </p>


                    <p>
                        Runtime:
                        {" "}
                        {movie.runtime
                            ? `${movie.runtime} minutes`
                            : "N/A"}
                    </p>


                    <p>
                        Language:
                        {" "}
                        {movie.original_language}
                    </p>


                    <p>
                        {movie.overview}
                    </p>


                    {/* TRAILER BUTTON */}

                    {anyTrailer && (

                        <a
                            href={`https://www.youtube.com/watch?v=${anyTrailer.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="trailer-btn"
                        >
                            ▶ Watch Trailer
                        </a>

                    )}


                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate("/theatres", {
                                state: {
                                    movie
                                }
                            })
                        }
                    >
                        Book Tickets
                    </button>


                </div>

            </div>


            {/* TRAILER SECTION */}

            {anyTrailer && (

                <div className="trailer-section">

                    <h2>
                        Movie Trailer
                    </h2>


                    <div className="youtube-container">

                        <iframe
                            src={`https://www.youtube.com/embed/${anyTrailer.key}`}
                            title={`${movie.title} Trailer`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                    </div>

                </div>

            )}


        </div>
    );
}


export default MovieDetails;