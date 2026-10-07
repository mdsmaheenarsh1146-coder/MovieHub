import { Link } from "react-router-dom";

const theatreImage =
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80";

function Home() {
    return (
        <div>

            <section
                className="home-banner"
                style={{
                    backgroundImage: `url(${theatreImage})`
                }}
            >
                <div className="home-banner-content">

                    <h1>Welcome to MovieHub</h1>

                    <p>
                        Discover movies, find theatres and book your
                        favourite seats.
                    </p>

                    <div className="home-buttons">

                        <Link to="/movies">
                            <button className="primary-btn">
                                Explore Movies
                            </button>
                        </Link>

                        <Link to="/theatres">
                            <button className="secondary-btn">
                                Find Theatres
                            </button>
                        </Link>

                    </div>

                </div>
            </section>


            <section className="home-content">

                <h2>Everything You Need</h2>

                <div className="feature-grid">

                    <div className="feature-card">
                        <div className="feature-icon">
                            🎬
                        </div>

                        <h3>Movies</h3>

                        <p>
                            Explore our collection of movies.
                        </p>

                        <Link to="/movies">
                            View Movies
                        </Link>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            🏢
                        </div>

                        <h3>Theatres</h3>

                        <p>
                            Find theatres and available show timings.
                        </p>

                        <Link to="/theatres">
                            View Theatres
                        </Link>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            💺
                        </div>

                        <h3>Seats</h3>

                        <p>
                            Select your favourite seats for the show.
                        </p>

                        <Link to="/theatres">
                            Select Seats
                        </Link>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;





















































































































