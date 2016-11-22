import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getChannel } from '../reducers/channels'
import { browserHistory } from 'react-router'
import back from '../assets/img/back.gif'

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
          <div style={{margin: '0 50px', cursor: 'pointer'}}>
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

const mapStateToProps = (state, ownProps) => {
  return {
    channel: getChannel(state, ownProps.params.id)
  }
}

export default connect(mapStateToProps)(Player)
