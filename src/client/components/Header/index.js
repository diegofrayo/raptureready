import React, { Component } from 'react'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from  './HeaderMobile'
import style from './style.css'
var isMobile = () => {
  if (__SERVER__) {
    return false;
  }
  if (window && window.navigator) {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
  }
  return false; //__SERVER__  || window.innerWidth > 800 ? false: true;
}
class Header extends Component {
  state = {
    mobileMenuVisible: isMobile()
  }
  componentDidMount(){
    window.addEventListener('resize', this.handleResize.bind(this))
  }
  handleResize() {
    this.setState({
      mobileMenuVisible: isMobile()
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
