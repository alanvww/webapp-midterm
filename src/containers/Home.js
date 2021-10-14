import React, { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { API_KEY } from '../components/API_KEY';
import WeatherImage from '../components/WeatherImage';

// URL Search Params... localhost:3000/?city=paris
//abstract away URL Search Params here to make it easier to use
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Home() {
	const [city, setCity] = useState();
	const [weatherData, setWeatherData] = useState();

	let query = useQuery();

	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

	useEffect(() => {
		const cityValue = query.get('city');
		setCity(cityValue);
	}, [query]);

	useEffect(() => {
		// Get weather data from weather API
		if (city) {
			// Make a request for a user with a given ID
			axios
				.get(URL)
				.then(function (response) {
					// handle success
					setWeatherData(response.data);
					console.log(response);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				});
		}
	}, [URL, city]);

	const {
		cloudiness,
		currentTemp,
		highTemp,
		humidity,
		lowTemp,
		weatherDescription,
		weatherType,
		windSpeed,
	} = useMemo(() => {
		// This is where we process data
		if (!weatherData) return {};
		return {
			cloudiness: weatherData.clouds.all,
			currentTemp: Math.round(weatherData.main.temp - 273.15),
			highTemp: Math.round(weatherData.main.temp_max - 273.15),
			humidity: weatherData.main.humidity,
			lowTemp: Math.round(weatherData.main.temp_min - 273.15),
			weatherDescription: weatherData.weather[0].description,
			weatherType: weatherData.weather[0].main,
			windSpeed: weatherData.wind.speed,
		};
	}, [weatherData]);

	if (document.getElementById('copyright')) {
		const copyright =
			`Made by <a href="mailto:alan.ren@pm.me">@Alan Ren</a> &copy;` +
			new Date().getFullYear();
		document.getElementById('copyright').innerHTML = copyright;
	}

	return (
		<main className="App">
			<header>
				<nav>
					<ul className="cityList">
						<li>
							<a href="/?city=osaka" className={city === 'osaka' && 'Active'}>
								Osaka
							</a>
						</li>
						<li>
							<a
								href="/?city=chicago"
								className={city === 'chicago' && 'Active'}
							>
								Chicago
							</a>
						</li>
						<li>
							<a
								href="/?city=hongkong"
								className={city === 'hongkong' && 'Active'}
							>
								Hongkong
							</a>
						</li>
						<li>
							<a href="/?city=London" className={city === 'London' && 'Active'}>
								London
							</a>
						</li>
						<li>
							<a
								href="/?city=Chengdu"
								className={city === 'Chengdu' && 'Active'}
							>
								Chengdu
							</a>
						</li>
					</ul>
				</nav>
				<h1
					className="Location"
					style={{
						textShadow: `0 0 10px rgb(${255 - cloudiness},${255 - cloudiness},${
							255 - cloudiness
						})`,
					}}
				>
					{city}
				</h1>
				<section
					className="WeatherIcon"
					style={{
						color: `rgba(${255 - cloudiness / 2},${255 - cloudiness / 2},${
							255 - cloudiness / 2
						},1`,
					}}
				>
					<WeatherImage weatherType={weatherType} />
				</section>
			</header>
			<WeatherCard
				cloudiness={cloudiness}
				currentTemp={currentTemp}
				highTemp={highTemp}
				humidity={humidity}
				lowTemp={lowTemp}
				weatherDescription={weatherDescription}
				weatherType={weatherType}
				windSpeed={windSpeed}
			/>

			<footer id="copyright"></footer>
		</main>
	);
}

export default Home;
