import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCloud,
	faSun,
	faCloudRain,
	faSnowflake,
} from '@fortawesome/free-solid-svg-icons';

function WeatherImage({ weatherType }) {
	switch (weatherType) {
		case 'Clouds':
			return <FontAwesomeIcon icon={faCloud} />;
		case 'Clear':
			return <FontAwesomeIcon icon={faSun} />;
		case 'Rain' || 'Thunderstorm':
			return <FontAwesomeIcon icon={faCloudRain} />;
		case 'Snow':
			return <FontAwesomeIcon icon={faSnowflake} />;
		default:
			return <FontAwesomeIcon icon={faCloud} />;
	}
}

export default WeatherImage;
