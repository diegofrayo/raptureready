import React, { Component, PropTypes } from 'react'
import classNames from  'classnames'
import isUserAgentMobile from '../../helpers/isUserAgentMobile'
import style from './style.css'

class Footer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    hideFooter() {
        try {
            return /\/watch\//.test(this.context.router.location.pathname)
        } catch (e) {
            return false;
        }

    }

    render() {
        return (
            <footer className={classNames({hideFooter: this.hideFooter()})}>
                <div className="footer sepparator"></div>
                <div className="footer FooterLinks">
                    <a className="active section">ABOUT US</a>
                    <div className="sepparator"> / </div>
                    <a className="active section">BROADCAST</a>
                    <div className="sepparator"> / </div>
                    <div className="active section">T-ADVERTISE</div>
                </div>
                <p>© 2016 Copyright Eternity Ready<br /></p>
            </footer>
        );
    }
}

export default Footer
