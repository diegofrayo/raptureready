import React, { Component, PropTypes } from 'react'
import { container } from '../../../Adrenaline';
import { browserHistory } from 'react-router'
import back from '../../commonResources/back.gif'

class Player extends Component {
  state = {
    channel: {}
  }
  static propTypes = {
    channel: PropTypes.object.isRequired,
  }
  static defaultProps = {
    channel: {},
  }

  createMarkup() { return {__html: this.props.channel.embedCode} }

  handleGoBack = ()=> {
    browserHistory.goBack()
  }

  render() {
    return (
      <div>
        <div className="row">
          <div style={{margin: '80px 50px 80px 50px', cursor: 'pointer'}}>
            <div onClick={this.handleGoBack}><img src={back} alt="Back Button" /></div>
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
