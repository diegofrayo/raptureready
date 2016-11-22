import React from 'react'
import './style.css'

const Footer = () =>(
  <footer>
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
)
export default Footer
