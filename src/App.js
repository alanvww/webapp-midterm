import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
