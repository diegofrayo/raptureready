import React, { Component } from 'react'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from  './HeaderMobile'
import style from './style.css'
var isMobile = () => {
  return __SERVER__ || window.innerWidth > 800 ? false: true;
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
