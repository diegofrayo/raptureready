import React, { Component, PropTypes } from 'react'
import ForgotPasswordComponent from '../../components/ForgotPassword/ForgotPassword'

class ForgotPassword extends Component {

  render() {
    return (
      <ForgotPasswordComponent {...this.props} />
    )
  }
}

export default ForgotPassword