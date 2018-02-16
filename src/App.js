import React, { Component } from 'react';
import csS from './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';

import Joinus from './containers/JoinUs';
import Game from './containers/Game/Game';


class App extends Component {

  render() {
let routes = (
	<Switch>
		<Route path="/" exact component={Joinus} />
    <Route path="/game" exact component={Game} />
		<Redirect to="/" />
	</Switch>
	);

    return (
      <div className={csS.App}>
      	{routes}
      </div>
    );
  }
}


export default App;
