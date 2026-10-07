import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
    const navigate = useNavigate();

    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    function viewMovie() {
        navigate(`/movie/${movie.id}`);
    }

    return (
        <div className="movie-card">

            <img
                src={imageUrl}
                alt={movie.title}
            />

            <div className="movie-info">

                <h2>{movie.title}</h2>

                <p>⭐ {movie.vote_average.toFixed(1)}</p>

                <p>
                    Release: {movie.release_date || "N/A"}
                </p>

                <button
                    className="primary-btn"
                    onClick={viewMovie}
                >
                    View Movie
                </button>

            </div>

        </div>
    );
}

export default MovieCard;