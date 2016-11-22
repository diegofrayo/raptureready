/* @flow */

import React, { Component, PropTypes } from 'react';
import { presenter } from '../../../Adrenaline';
// import { Frame, Track } from 'react-view-pager'
// working
import Slider from 'react-motion-slider'

// not working with server render
// import Slider from '../Slider'

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
                        {/*<Frame
                            ref={c => this.pager = c}
                            viewsToShow="auto"
                            infinite
                            className="frame"
                        >
                            <Track className="track">
                                {category.channels.map((channel, index) => <ChannelSliderItem key={index} channel={channel} />)}
                            </Track>
                        </Frame>
                        <button onClick={() => this.refs.pager.prev()}>P</button>
                        <button onClick={() => this.refs.pager.next()}>N</button>*/}

                        <button onClick={() => this.refs.slider.prev()}>P</button>
                        <Slider {...settings} ref="slider">
                            {category.channels.map((channel, index) => <ChannelSliderItem key={index} channel={channel}/>)}
                        </Slider>
                        <button onClick={() => this.refs.slider.next()}>N</button>

                        {/* ../Slider Not working with server render
                        <Slider key={category.name} items={category.channels} sliderTitle={category.name}/>*/}
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