import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'

import { fetchChannel } from '../../redux/modules/channels';
import Loader from '../../components/Loader';

class Player extends Component {

  createMarkup() {
    var embedCode = this.props.channel && this.props.channel.embedCode ? this.props.channel.embedCode : '';
    return {__html: embedCode}

  }

  goBack() {
    return browserHistory.goBack();
  }

  componentWillMount() {
    this.props.fetchChannel((this.props.params || {}).channelId);
  }

  render() {

    const { isFetching } = this.props;
    if (isFetching) {
      return <Loader />;
    }
    return (
      <div>
        <div >
          <div style={{margin: '0px 50px', cursor: 'pointer'}}>
            <Link onClick={this.goBack}><img src={require('../../commonResources/back.gif')} alt="Home Button" /></Link>
          </div>
        </div>
        <div >
          <div className="playerContainer" dangerouslySetInnerHTML={this.createMarkup()} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchChannel: (id) => {dispatch(fetchChannel(id))}
});

const mapStateToProps = (state) => ({
  isFetching: state.channels.isFetchingChannel,
  channel: state.channels.channel
});

export default connect(mapStateToProps, mapDispatchToProps)(Player)