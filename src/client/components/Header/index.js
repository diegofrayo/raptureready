import React, { Component } from 'react'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from  './HeaderMobile'
import isUserAgentMobile from '../../helpers/isUserAgentMobile'
import style from './style.css'

class Header extends Component {
  state = {
    mobileMenuVisible: isUserAgentMobile()
  }
  componentDidMount(){
    window.addEventListener('resize', this.handleResize.bind(this))
  }
  handleResize() {
    this.setState({
      mobileMenuVisible: isUserAgentMobile()
    })
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
