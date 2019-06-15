import 'react-toastify/dist/ReactToastify.css';

import BaseRouter from './routes';
import { toast } from 'react-toastify';
import Footer from './components/Footer';
import React, { Component } from 'react';
import TopNavbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

toast.configure();

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <TopNavbar />
            <BaseRouter />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
