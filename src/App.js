import 'react-toastify/dist/ReactToastify.css';

import React, { Component } from 'react';

import { toast } from 'react-toastify';
import BaseRouter from './routes';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

import { BrowserRouter as Router } from 'react-router-dom';

toast.configure();

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Navigation />
            <BaseRouter />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
