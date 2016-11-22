import React, {Component} from 'react'
import './style.css';
class GoogleAd extends Component{
  static defaultProps = {
    style: { display: 'inline-block' }
  }

  static PropTypes = {
    style: React.PropTypes.object,
    client: React.PropTypes.string.isRequired,
    slot: React.PropTypes.string.isRequired,
    format: React.PropTypes.string,
    classNames: React.PropTypes.string
  }

  componentDidMount = () => {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <ins className={ "adsbygoogle " + this.props.classNames } 
        style={this.props.style} 
        data-ad-client={this.props.client} 
        data-ad-slot={this.props.slot}></ins>
    );
  }
}

export default GoogleAd