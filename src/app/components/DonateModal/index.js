import React, {
	Component
} from 'react';
import Modal from 'react-modal';

import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux'

import {
	resetDonateCounter
} from '../../redux/modules/auth';

const customStyles = {
	overlay: {
		background: 'rgba(17, 17, 17, 0.80)',
		zIndex: 500
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		background: 'rgba(17, 17, 17, 0.99)',
		padding: 60,
		maxWidth: '70%',
		maxWidth: 450,
		textAlign: 'center'
	}
};

const closeButton = {
	fontSize: 25,
	color: '#fff',
	position: 'absolute',
	top: 10,
	right: 15,
	cursor: 'pointer'
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
        <div style={closeButton} onClick={this.closeModal}>X</div>

        <img src={require("../../commonResources/logo.png")}
             style={{width: 150, marginBottom: 30}}
             alt="Enternity Ready Logo"
             />

        {/*<h2>Partner / Donate</h2>*/}

        <p>Rapture Ready TV needs your help. We operate on a Limited Budget. Our costs are expensive. Our Service is Free. We have 270,000 Customers from 150+ Countries. Our Mission is to offer a Message of Hope and Love. Become a TV Missionary Today. Give a Monthly or One Time Pledge. Your Donation goes to Missions. To Provide better Quality. Create Roku-Mobile APPS. Offer More Features. Hire more People. Thanks for your Support!</p>

        <Link className="btn"
              to="https://www.paypal.me/eternityready"
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
	resetDonateCounter: () => {
		return dispatch(resetDonateCounter())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DonateModal);