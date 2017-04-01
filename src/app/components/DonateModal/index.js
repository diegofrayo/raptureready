import React, { Component } from 'react';
import Modal from 'react-modal';

import { Link } from 'react-router';
import { connect } from 'react-redux'

import { resetDonateCounter } from '../../redux/modules/auth';

const customStyles = {
  overlay: {
    background: 'rgba(17, 17, 17, 0.80)',
    zIndex: 500
  },
  content : {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(17, 17, 17, 0.99)',
    padding: 60,
    maxWidth: '70%'
  }
};


class DonateModal extends Component {

  state = {
    isOpen: true
  };

  closeModal = () => {
    this.setState({
      isOpen: false
    });

    this.props.resetDonateCounter();
  };

  render() {

    return (
      <Modal
        isOpen={this.state.isOpen && this.props.isAuthenticated}
        onAfterOpen={() => {}}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <h1>Donate Now!</h1>
        <p> nfkdsalnfskjlan flkasjdn fkdslan fksajln fdkasj fnklasdjnf asdnf </p>
        <p> nfkdsalnfskjlan flkasjdn fkdslan fksajln fdkasj fnklasdjnf asdnf </p>

        <Link className="btn"
              to="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=C2RM2YGUT3AEL"
              target="_blank"
              style={{marginTop: 40, borderRadius: 4,
                      backgroundColor: 'aliceblue'}}
        >
          <img alt="Donate" src={require("../../commonResources/btn_donateCC_LG.gif")} />
        </Link>

      </Modal>
    )
  }
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated || false,
});

const mapDispatchToProps = (dispatch) => ({
  resetDonateCounter: () => {return dispatch(resetDonateCounter())}
});

export default connect(mapStateToProps, mapDispatchToProps)(DonateModal)
