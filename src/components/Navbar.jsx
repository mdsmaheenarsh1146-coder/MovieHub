import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <Link to="/" className="logo">

                <span className="logo-icon">
                    🎬
                </span>

                <span>
                    MovieHub
                </span>

            </Link>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/movies">
                    Movies
                </Link>

                <Link to="/theatres">
                    Theatres
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;