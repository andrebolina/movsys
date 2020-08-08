import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./store";

import MoviesList from './pages/MoviesList';
import MovieInfo from './pages/MovieInfo';

export default function Routes() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={MoviesList} />
                    <Route path="/movie/:imdbID" component={MovieInfo} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}