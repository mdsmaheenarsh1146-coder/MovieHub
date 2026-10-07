function Seat({
    number,
    selected,
    booked,
    onClick
}) {

    return (
        <button
            className={`seat
        ${selected ? "selected" : ""}
        ${booked ? "booked" : ""}
      `}
            disabled={booked}
            onClick={onClick}
        >
            {number}
        </button>
    );
}

export default Seat;