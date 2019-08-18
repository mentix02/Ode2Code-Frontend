import React from 'react';

import Home from './pages/Home';
import Manage from './pages/Manage';
import Blog from './pages/blog/Blog';
import Post from './pages/blog/Post';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Author from './pages/auth/Author';
import Series from './pages/series/Series';
import NewPost from './pages/blog/NewPost';
import FourOhFour from './pages/FourOhFour';
import Contributors from './pages/Contributors';
import Timeline from './pages/tutorial/Timeline';
import Tutorial from './pages/tutorial/Tutorial';
import NewSeries from './pages/series/NewSeries';
import Algorithms from './pages/series/Algorithms';
import Tutorials from './pages/tutorial/Tutorials';
import NewTutorial from './pages/tutorial/NewTutorial';
import SeriesDetail from './pages/series/SeriesDetail';

import { Route, Switch } from 'react-router-dom';

const BaseRouter = () => (
  <Switch>
    <Route path="/blog" component={Blog} />
    <Route path="/home" component={Home} />
    <Route path="/" component={Home} exact />
    <Route path="/login" component={Login} />
    <Route path="/p/:slug" component={Post} />
    <Route path="/manage" component={Manage} />
    <Route path="/logout" component={Logout} />
    <Route path="/series" component={Series} />
    <Route path="/new/post" component={NewPost} />
    <Route path="/t/:slug" component={Tutorial} />
    <Route path="/edit/post" component={NewPost} />
    <Route path="/timeline" component={Timeline} />
    <Route path="/a/:username" component={Author} />
    <Route path="/tutorials" component={Tutorials} />
    <Route path="/s/:slug" component={SeriesDetail} />
    <Route path="/new/series" component={NewSeries} />
    <Route path="/algorithms" component={Algorithms} />
    <Route path="/new/tutorial" component={NewTutorial} />
    <Route path="/contributors" component={Contributors} />
    <Route path="/404" component={FourOhFour} status={404} />
    <Route component={FourOhFour} status={404} />
  </Switch>
);

export default BaseRouter;
