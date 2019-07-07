import React from 'react';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Series from './pages/Series';
import Timeline from './pages/Timeline';
import Tutorials from './pages/Tutorials';
import NewSeries from './pages/NewSeries';
import FourOhFour from './pages/FourOhFour';
import Algorithms from './pages/Algorithms';
import SeriesType from './pages/SeriesType';
import NewTutorial from './pages/NewTutorial';
import SeriesDetail from './pages/SeriesDetail';
import Contributors from './pages/Contributors';
import TutorialDetail from './pages/TutorialDetail';
import DataStructures from './pages/DataStructures';

import { Route, Switch } from 'react-router-dom';

const BaseRouter = () => (
  <Switch>
    <Route path="/blog" component={Blog} />
    <Route path="/home" component={Home} />
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/p/:slug" component={Post} />
    <Route path="/logout" component={Logout} />
    <Route path="/timeline" component={Timeline} />
    <Route path="/series" exact component={Series} />
    <Route path="/new/series" component={NewSeries} />
    <Route path="/tutorials" component={Tutorials} />
    <Route path="/st/:slug" component={SeriesType} />
    <Route path="/s/:slug" component={SeriesDetail} />
    <Route path="/algorithms" component={Algorithms} />
    <Route path="/t/:slug" component={TutorialDetail} />
    <Route path="/new/tutorial" component={NewTutorial} />
    <Route path="/contributors" component={Contributors} />
    <Route path="/404" component={FourOhFour} status={404} />
    <Route path="/data_structures" component={DataStructures} />
    <Route component={FourOhFour} status={404} />
  </Switch>
);

export default BaseRouter;
