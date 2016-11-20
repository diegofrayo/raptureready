/* @flow */

import React, { Component, PropTypes } from 'react';
import { container } from 'adrenaline';
import Slider from 'react-slick'
import Loader from './Loader';
import Browser from './Browser';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

class BrowsersList extends Component {
  static propTypes = {
    browsers: PropTypes.array,
    isFetching: PropTypes.bool.isRequired
  }
  render() {
    const settings = {
      className: 'center',
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 5,
      swipeToSlide: true
    };

    const { browsers, isFetching } = this.props;

    if (isFetching) {
      return <Loader />;
    }

    return (
      <div>
        <Slider {...settings}>
          {browsers.map((browser, index) => <Browser key={index} browser={browser}/>)}
        </Slider>
      </div>
    );
  }
}

export default container({
  query: `
    query {
      browsers {
        ${Browser.getFragment('browser')}
      }
    }
  `,
})(BrowsersList);