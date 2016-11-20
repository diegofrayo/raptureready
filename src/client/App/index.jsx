import React, { Component } from 'react';
// import stylesImporter from '../helpers/stylesImporter'

(__SERVER__) ? false : require('./style.scss');

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>MAIN APP HEADER</h1>
        {this.props.children}
      </div>
    );
  }
}
