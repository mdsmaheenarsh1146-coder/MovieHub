function TheatreCard({ theatre, onSelect }) {

    return (

        <div className="theatre-card">

            <div className="theatre-icon">
                🎬
            </div>

            <h2>
                {theatre.name}
            </h2>

            <p className="theatre-location">
                📍 {theatre.location}
            </p>

            <p className="theatre-rating">
                ⭐ {theatre.rating}
            </p>

            <h3>
                Available Shows
            </h3>

            <div className="show-times">

                {theatre.shows.map((time) => (

                    <button
                        key={time}
                        onClick={() =>
                            onSelect(theatre, time)
                        }
                    >
                        {time}
                    </button>

                ))}

            </div>

        </div>
    );
}

export default TheatreCard;