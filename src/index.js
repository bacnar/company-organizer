/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { logger } from "redux-logger";
import rootSaga from "./sagas";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const sagaMiddleware = createSagaMiddleware();

const hist = createBrowserHistory();

const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
