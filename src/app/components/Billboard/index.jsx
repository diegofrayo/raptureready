import React from 'react'
import { Link } from 'react-router'
import style from './style.css'

const Billboard = () => (
<div>
  <div className="billboard">
      <div className="container">
          <div className="intro-text">
              <div className="intro-heading">LIVE TV</div>
              <div className="intro-lead-in">On-Demand</div>
              <Link className="btn btn-light" to="/watch/578558ae73de2089121b6b1a">Watch Now</Link>
          </div>
      </div>
  </div>
</div>
)

export default Billboard

