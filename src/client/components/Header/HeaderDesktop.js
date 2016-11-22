import React, { Component } from 'react'
import Search from '../Search'
// import logo from '../../commonResources/logo.png'

class HeaderDesktop extends Component {
  state = {
    dropDownVisible: false,
    hideDropDownTimer: null,
    isDark: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
   window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    if (window.scrollY > 50) {
      this.setState({isDark: true})
    } else {
      this.setState({isDark: false})
    }
  }

  showDropDown = () => {
    this.cancelHideTimer();
    this.setState({
      dropDownVisible: true
    });
  }

  timerHide = () => {
    var self = this;
    this.setState({
      hideDropDownTimer: setTimeout(function() {
        if(self.state.hideDropDownTimer !== null) {
          self.hideDropDown();
        }
      }, 1000)
    })
  }

  dropDownTouch(e) {
    this.toggleDropDownMenu();
  }

  toggleDropDownMenu = () => {
    this.setState({
      dropDownVisible: !this.state.dropDownVisible
    })
  }

  cancelHideTimer = () => {
    this.setState({
      hideDropDownTimer: null
    })
  }

  hideDropDown = () => {
    this.setState({
      dropDownVisible: false
    });
  }


  openRadio() {
    window.open("http://www.eternityready.com/player");
  }

  openTv() {
    window.open("http://www.vertizontalmedia.com/topvideos.php");
  }

  render() {

    const dropDownStyle = {
      'display': this.state.dropDownVisible ? 'block' : 'none'
    };

    const headerStyle = this.state.isDark ? 'headerDesktop headerDesktopOpaque' : 'headerDesktop'
    return (
        <div className={headerStyle} ref={(c) => this._header = c} >
          <img src="http://www.eternityready.com/images/logo.png" style={{width: 105}} alt="Enternity Ready Logo" />
          <span>
            <span className="dropdown mainMenuLink" onTouchStart={this.dropDownTouch} onMouseEnter={this.showDropDown} onMouseLeave={this.timerHide}></span>
            <div className="dropdiv" style={dropDownStyle} onMouseEnter={this.cancelHideTimer} onMouseLeave={this.timerHide}>
              <ul className="sectiondrop">
                <li><a href=""></a></li>
                <li><a href="#">All Channels</a></li>
                <li><a href=""></a></li>
                <li><a href="#">TV Line Up</a></li>
              </ul>
              <ul className="sectiondrop">
                <li><a href="#">Faith &amp; Ministry</a></li>
                <li><a href="#">Kids &amp; Family</a></li>
                <li><a href="#">Bible Prophecy</a></li>
                <li><a href="#">News &amp; Politics</a></li>
                <li><a href="#">Movies &amp; Music</a></li>
              </ul>
              <ul className="sectiondrop">
                <li><a href="#">Gaming &amp; Technology</a></li>
                <li><a href="#">Health &amp; Sports</a></li>
                <li><a href="#">International Networks</a></li>
                <li><a href="#">Premium Channels</a></li>
                <li><a href="#">All Channnels</a></li>
              </ul>
            </div>
            <Search device="desktop"/>
            <span className="mainMenuLink" onClick={this.openRadio}>Radio</span>
            <span className="mainMenuLink" onClick={this.openTv}>Music Videos</span>
          </span>
        </div>
    );
  }
}

export default HeaderDesktop
