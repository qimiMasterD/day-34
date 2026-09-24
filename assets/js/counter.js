const root = ReactDOM.createRoot(document.querySelector("#root"));

function CounterCard() {
    const [value, setValue] = React.useState(0);

    const textColor = value > 0 ? "green" : value < 0 ? "red" : "grey";
    const textState = value > 0 ? "Positive" : value < 0 ? "Negative" : "Zero";

    return (
        <div
            className="counter-card"
            style={{
                color: textColor,
            }}
        >
            <div class="counter-info">
                <div className="counter-value">{value}</div>
                <div class="counter-state">{textState}</div>
            </div>
            <div className="counter-controls">
                <button
                    className="btn-add"
                    onClick={() => {
                        setValue(value + 1);
                    }}
                >
                    +
                </button>
                <button
                    className="btn-reset"
                    onClick={() => {
                        setValue(0);
                    }}
                >
                    Reset
                </button>
                <button
                    className="btn-sub"
                    onClick={() => {
                        setValue(value - 1);
                    }}
                >
                    -
                </button>
            </div>
        </div>
    );
}

root.render(<CounterCard />);
