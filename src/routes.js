import React from 'react';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Series from './pages/Series';
import Timeline from './pages/Timeline';
import Tutorials from './pages/Tutorials';
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
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/series" component={Series} />
    <Route path="/timeline" component={Timeline} />
    <Route path="/tutorials" component={Tutorials} />
    <Route path="/algorithms" component={Algorithms} />
    <Route path="/detail/post/:slug" component={Post} />
    <Route path="/contributors" component={Contributors} />
    <Route path="/404" component={FourOhFour} status={404} />
    <Route path="/data_structures" component={DataStructures} />
    <Route component={FourOhFour} status={404} />
  </Switch>
);

export default BaseRouter;
