import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import {
    getPopularMovies,
    searchMovies
} from "../services/movieApi";

function Movies() {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPopularMovies();
    }, []);

    async function loadPopularMovies() {
        try {
            setLoading(true);
            setError("");

            const data = await getPopularMovies();

            setMovies(data);
        } catch (error) {
            console.error(error);
            setError("Unable to load movies.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(event) {
        event.preventDefault();

        if (!search.trim()) {
            loadPopularMovies();
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await searchMovies(search);

            setMovies(data);
        } catch (error) {
            console.error(error);
            setError("Unable to search movies.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page">

            <h1>Movies</h1>

            <form
                className="search-box"
                onSubmit={handleSearch}
            >

                <input
                    type="text"
                    placeholder="Search movies..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <button
                    type="submit"
                    className="primary-btn"
                >
                    Search
                </button>

            </form>

            {loading && (
                <h2 className="status">
                    Loading movies...
                </h2>
            )}

            {error && (
                <h2 className="status">
                    {error}
                </h2>
            )}

            {!loading && !error && (
                <div className="movie-grid">

                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                            />
                        ))
                    ) : (
                        <p>No movies found.</p>
                    )}

                </div>
            )}

        </div>
    );
}

export default Movies;