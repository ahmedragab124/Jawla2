import { useEffect, useState } from "react";
import "./InfoPanel.css";
import { FaSun } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { PiScrollFill } from "react-icons/pi";
function InfoPanel({ destination }) {
  const [temperature, setTemperature] = useState(null);
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${destination.latitude}&longitude=${destination.longitude}&current=temperature_2m`,
    )
      .then((response) => response.json())
      .then((data) => {
        setTemperature(data.current.temperature_2m);
      })
      .catch((error) => console.log(error));
  }, [destination.latitude, destination.longitude]);
  return (
    <div className="info-panel">
      <div className="info-row">
        <div className="info-item">
          <div className="icon-box">
            <MdLocationCity />
          </div>
          <div className="info-text">
            <p>{destination.capital}</p>
          </div>
        </div>

        <div className="info-item">
          <div className="icon-box orange">
            <FaSun />
          </div>
          <div className="info-text">
            <h6>Weather</h6>
            <p>{destination.weatherLabel}</p>
          </div>
          <h2 className="value">
            {temperature !== null ? `${temperature.toFixed(1)}°C` : "Loading"}
          </h2>
        </div>

        <div className="info-item">
          <div className="icon-box">
          <PiScrollFill />
          </div>
          <div className="info-text">
            <h6>History</h6>
            <p>Ancient Heritage</p>
          </div>
          <h2 className="value">{destination.history}</h2>
        </div>
      </div>
    </div>
  );
}
export default InfoPanel;
