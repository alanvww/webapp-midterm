import React from 'react';

function WeatherCard({
	cloudiness,
	currentTemp,
	highTemp,
	humidity,
	lowTemp,
	weatherDescription,
	weatherType = `Unknown`,
	windSpeed,
}) {
	return (
		<section className="WeatherCard">
			<div className="container">
				<section className="item">
					<h2>Current Weather</h2>
					<strong className="highlightedData">{weatherType}</strong>
				</section>
				<section className="item">
					<h2>Current Temperature</h2>
					<strong className="highlightedData">{currentTemp}°C</strong>
				</section>
				<section className="item">
					<h2>Low - High</h2>
					<strong className="highlightedData">
						{lowTemp}°C - {highTemp}°C
					</strong>
				</section>
				<section className="item">
					<h2>Cloudiness</h2>
					<strong className="highlightedData">{cloudiness}</strong>
				</section>
				<section className="item">
					<h2>Humidity</h2>
					<strong className="highlightedData">{humidity}</strong>
				</section>
				<section className="item">
					<h2>Description</h2>
					<strong className="highlightedData">{weatherDescription}</strong>
				</section>
				<section className="item">
					<h2>Wind Speed</h2>
					<strong className="highlightedData">{windSpeed}mph</strong>
				</section>
			</div>
		</section>
	);
}

export default WeatherCard;
