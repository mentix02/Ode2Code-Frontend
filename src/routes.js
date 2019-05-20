import React from 'react';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import FourOhFour from './pages/FourOhFour';
import Algorithms from './pages/Algorithms';
import Contributors from './pages/Contributors';
import DataStructures from './pages/DataStructures';

import { Route, Switch } from 'react-router-dom';

const BaseRouter = () => (
  <Switch>
    <Route path="/blog" component={Blog} />
    <Route path="/home" component={Home} />
    <Route path="/" exact component={Home} />
    <Route path="/detail/:slug" component={Post} />
    <Route path="/algorithms" component={Algorithms} />
    <Route path="/contributors" component={Contributors} />
    <Route path="/404" component={FourOhFour} status={404} />
    <Route path="/data_structures" component={DataStructures} />
    <Route component={FourOhFour} status={404} />
  </Switch>
);

export default BaseRouter;
