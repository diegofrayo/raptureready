import React, { Component } from 'react'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from  './HeaderMobile'
import './style.css'

class Header extends Component {
  state = {
    mobileMenuVisible: __SERVER__ || window.innerWidth <= 800? true: false,
  }
  componentDidMount(){
    window.addEventListener('resize', this.handleResize)
  }
  handleResize = () => {
    const visibility = __SERVER__ || window.innerWidth <= 800? true: false
    this.setState({mobileMenuVisible: visibility})
  }


  render() {
    return (
      <header className="App-Header" ref={(c) => this._header = c}>
        { this.state.mobileMenuVisible ? <HeaderMobile /> :<HeaderDesktop />}
      </header>
    );
  }
}

export default Header
