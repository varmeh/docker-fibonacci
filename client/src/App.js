import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Fib from './components/Fib'
import OtherPage from './components/OtherPage'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<Link to="/">Home</Link>
						<Link to="/otherpage">Other Page</Link>
					</header>
					<div>
						<Route exact path="/" component={Fib} />
						<Route path="/otherpage" component={OtherPage} />
					</div>
				</div>
			</Router>
		)
	}
}

export default App
