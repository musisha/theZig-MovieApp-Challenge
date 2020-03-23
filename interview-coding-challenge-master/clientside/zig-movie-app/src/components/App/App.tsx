import * as React from 'react';
import { Header } from '../elements/Header/Header';
import { Home } from '../Home/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFound } from '../elements/NotFound/NotFound';
import { Movie } from '../Movie/Movie';



export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/movie/:movieId"  component={Movie} exact />
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    )
}