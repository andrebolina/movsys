import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./redux/store";

import MoviesList from './pages/MoviesList';
import MovieInfo from './pages/MovieInfo';

export default function Routes() {
    return (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={MoviesList} />
                    <Route path="/movie/:imdbID" component={MovieInfo} />
                </Switch>
            </HashRouter>
        </Provider>
    )
}