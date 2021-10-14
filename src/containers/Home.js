import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { WEATHER_API_KEY, MAPBOX_API_KEY } from '../components/API_KEY';
import WeatherImage from '../components/WeatherImage';

mapboxgl.accessToken = MAPBOX_API_KEY;

// URL Search Params... localhost:3000/?city=paris
//abstract away URL Search Params here to make it easier to use
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Home() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return;
		// initialize map only once
		if (weatherData) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/light-v10',
				center: [weatherData.coord.lon, weatherData.coord.lat],
				zoom: zoom,
			});
		}
	});

	/*
	useEffect(() => {
		if (!map.current || !weatherData) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(weatherData.coord.lon);
			setLat(weatherData.coord.lat);
			setZoom(map.current.getZoom().toFixed(2));
		});
	}); */

	const [city, setCity] = useState();
	const [weatherData, setWeatherData] = useState();

	let query = useQuery();

	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`;

	useEffect(() => {
		if (query.get('city')) {
			const cityValue = query.get('city');
			setCity(cityValue);
		} else {
			setCity('osaka');
		}
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
		weahterLng,
		weatherLat,
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
			weahterLng: weatherData.coord.lon,
			weatherLat: weatherData.coord.lat,
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
				<div>
					<div ref={mapContainer} className="map-container" />
				</div>
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
