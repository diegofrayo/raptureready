import React, { Component, PropTypes } from 'react'
import { container } from '../../../Adrenaline';
import { browserHistory, Link } from 'react-router'
import Loader from '../../components/Loader';
var STATIC_ASSETS_CDN = process.env.STATIC_ASSETS_CDN || '';
var WEBPACK_ASSETS = process.env.WEBPACK_ASSETS || '';
class Player extends Component {
  state = {
    channel: {}
  }
  static propTypes = {
    channel: PropTypes.object,
    isFetching: PropTypes.bool.isRequired
  }

  createMarkup() { return {__html: this.props.channel.embedCode} }

  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return <Loader />;
    }
    return (
      <div>
        <div className="row">
          <div style={{margin: '80px 50px 80px 50px', cursor: 'pointer'}}>
            <Link to={`/`}><img src={WEBPACK_ASSETS + require('../../commonResources/back.gif')} alt="Home Button" /></Link>
          </div>
        </div>
        <div className="row">
          <div className="playerContainer" dangerouslySetInnerHTML={this.createMarkup()} />
        </div>
      </div>
    )
  }
}
export default container({
  query: `
    query getChannel($channelId: String){
      channel(channelId: $channelId) {
        embedCode
      }
    }
  `, variables: (props) => ({'channelId': props.params.channelId})
})(Player);
