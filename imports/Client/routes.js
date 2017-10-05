import React, {Component} from "react";
import {Router, Route} from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';
const browserHistory = createBrowserHistory();

//Components

import mainPage from "./Components/mainPage";
import Task from "./Components/task/App";
import Book from "./Components/book/App"


export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" component={mainPage}/>
            <Route path="/holi" component={Task}/>
            <Route path="/uiBooks" component={Book}/>

        </div>
    </Router>
);

