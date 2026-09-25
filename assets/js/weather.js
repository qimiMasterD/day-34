function rand(l, r) {
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

const weatherData = {
    hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
    hcm: { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
    danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
};
const getInfo = {
    Nắng: { icon: "☀️", cssClass: "sunny" },
    "Có mây": { icon: "🌤️", cssClass: "cloudy" },
    "Mưa nhẹ": { icon: "🌧️", cssClass: "rainy" },
};

function Weather() {
    const [cityData, setCityData] = React.useState(weatherData["hanoi"]);

    const cityInfo = getInfo[cityData.weather];

    const changeCity = (e) => {
        const cityData = weatherData[e.target.value];
        setCityData(cityData);
    };

    const randomStats = () => {
        const updatedCityData = {
            ...cityData,
            temp: cityData.temp + rand(-5, 5),
            humidity: cityData.humidity + rand(-5, 5),
        };
        setCityData(updatedCityData);
    };

    return (
        <>
            <div className="weather-widget">
                <div className="weather-controls">
                    <select
                        name="city"
                        id="citySelect"
                        className="city-dropdown"
                        onChange={changeCity}
                    >
                        <option value="hanoi">Hà Nội</option>
                        <option value="hcm">TP.HCM</option>
                        <option value="danang">Đà Nẵng</option>
                    </select>
                </div>

                <div className={`weather-card ${cityInfo.cssClass}`}>
                    <div className="weather-header">
                        <div className="weather-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <span className="location-name">
                                {cityData.city}
                            </span>
                        </div>
                        <div className="weather-status">{cityData.weather}</div>
                    </div>

                    <div className="weather-body">
                        <div className="weather-icon">{cityInfo.icon}</div>
                        <div className="weather-temp">
                            {cityData.temp}
                            <span className="temp-unit">°C</span>
                        </div>
                    </div>

                    <div className="weather-footer">
                        <div className="weather-detail">
                            <span className="detail-label">Humidity</span>
                            <span className="detail-value">
                                {cityData.humidity}%
                            </span>
                        </div>
                    </div>
                </div>

                <button className="random" onClick={randomStats}>
                    Random
                </button>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Weather />);
