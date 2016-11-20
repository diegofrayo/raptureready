import React, { Component, PropTypes } from 'react';
import { presenter } from '../../../Adrenaline';
if (!__SERVER__) {
require('./style.styl');
}


class ChannelSliderItem extends Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
    }

    render() {
        const { channel } = this.props;

        return (
            <div className="tile">
                <div className="tile__media">
                    <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-5.jpg" alt=""  />
                </div>
                <div className="tile__details">
                    <div className="tile__title">
                        {channel.name}
                    </div>
                </div>
            </div>
        );
    }
}

export default presenter({
    fragments: {
        channel: `
      fragment on Channel {
        thumb
        title
        description
        slug
      }
    `,
    },
})(ChannelSliderItem);

var style = {
    container: {
        border: '1px solid red',
        display: 'inline-block',
        width: '250px'
    }
}