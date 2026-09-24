const root = ReactDOM.createRoot(document.querySelector("#root"));

function CounterCard() {
    const [value, setValue] = React.useState(0);

    return (
        <div className="counter-card">
            <div className="counter-value">{value}</div>
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
