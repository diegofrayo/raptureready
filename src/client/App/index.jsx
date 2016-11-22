import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export default class App extends Component {
  render() {
    return (
      <div>
          {/*<h1>MAIN APP HEADER</h1>*/}
          <Header />
            {this.props.children}
          <Footer />
      </div>
    );
  }
}
