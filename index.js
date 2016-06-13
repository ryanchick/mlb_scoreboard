import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import DailyScores from './modules/DailyScores'
import Scoreboard from './modules/Scoreboard'
import GameDetails from './modules/GameDetails'
import Home from './modules/Home'

render((
	<Router history={browserHistory}>
		<Route path="/" component={Scoreboard}>
			<Route path="/:year/:month/:day" component={DailyScores}/>
			<Route path="/:year/:month/:day/:gameId" component={GameDetails}/>
		</Route>
  </Router>
), document.getElementById('app'))
