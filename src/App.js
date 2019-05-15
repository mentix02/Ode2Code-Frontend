import BaseRouter from './routes';
import Footer from './components/Footer';
import React, { Component } from 'react';
import TopNavbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

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
