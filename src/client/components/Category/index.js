/* @flow */

import React, { Component, PropTypes } from 'react';
import { presenter } from '../../../Adrenaline';
import Slider from 'react-motion-slider'

import ChannelSliderItem from '../ChannelSliderItem';
if (!__SERVER__) {
    require('./style.scss');
}
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class CarouselSlide extends React.Component {
    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }
}

class Category extends Component {
    static propTypes = {
        category: PropTypes.object
    }
    render() {
        const settings = {
            slidesToShow: 5,
            slidesToMove: 1,
        };

        const { category } = this.props;
        category.channels = category.channels ? category.channels : [];
        return (
            <div className="Category">
                {category.name}
                {category.channels.length ? (
                    <div>
                        <Slider {...settings} ref="slider">
                            {category.channels.map((channel, index) => <ChannelSliderItem key={index} channel={channel}/>)}
                        </Slider>
                        <button onClick={() => this.refs.slider.prev()} >Prev</button>
                        <button onClick={() => this.refs.slider.next()} >Next</button>
                    </div>
                ) : false }
            </div>
        );
    }
}

export default presenter({
    fragments: {
        category: `
      fragment on Category {
        name
        channels {
          ${ChannelSliderItem.getFragment('channel')}
        }
      }
    `,
    },
})(Category);