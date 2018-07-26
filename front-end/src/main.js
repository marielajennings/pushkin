/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import FastClick from 'fastclick';
import { Route, Switch, BrowserRouter as Router, browserHistory } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import Sktc from './quizzes/sktc/index';
const ErrorPage = () => (<h1>404</h1>);

const App = () => (
			<Router>
				<Switch>
					<Route exact path='/' component={Sktc} />
					<Route path="*" component={ErrorPage} />
				</Switch>
			</Router>
	//		</Provider>
);

/************** go *************/
(function() {
	FastClick.attach(document.body);
	ReactDOM.render(<App />, document.getElementById('container'));
})();
