import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //thunk will take caare of async code

import reducer from "./store/reducer";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';




const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; //hooking up REDUX-CHROME-DEV_TOOLS

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));  

const app = (	<BrowserRouter>
				
						<App />
					
				</BrowserRouter>
				);



ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
registerServiceWorker();
