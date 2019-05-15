import React from 'react';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Algorithms from './pages/Algorithms';
import Contributors from "./pages/Contributors";
import DataStructures from './pages/DataStructures';

import { Route } from 'react-router-dom';

const BaseRouter = () => (
  <div>
    <Route path="/blog" component={Blog} />
    <Route path="/" exact component={Home} />
    <Route path="/algorithms" component={Algorithms} />
    <Route path="/contributors" component={Contributors} />
    <Route path="/data_structures" component={DataStructures} />
  </div>
);

export default BaseRouter;
