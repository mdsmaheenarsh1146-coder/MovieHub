import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Theatres from "./pages/Theatres";
import Seats from "./pages/Seats";
import Booking from "./pages/Booking";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/movies"
          element={<Movies />}
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/theatres"
          element={<Theatres />}
        />

        <Route
          path="/seats"
          element={<Seats />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;