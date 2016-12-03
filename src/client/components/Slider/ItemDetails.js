import React from 'react'
import { Link } from 'react-router'
import { presenter } from '../../../Adrenaline';

var ItemDetails = React.createClass({

  componentDidMount() {
    this.checkScroll();
  },

  componentWillReceiveProps(nextProps) {
    if(this.props.activeSlide !== nextProps.activeSlide) {
      this.refs.detailsContent.classList.add("reflow");
      var self = this;
      setTimeout(function() {
        self.refs.detailsContent.classList.remove("reflow");
      }, 100)
    }
  },

  checkScroll() {

  },

  render: function() {
    var className = 'slider-item-details';
    if(this.props.activeSlide) {
      className += ' slider-item-details-active';
    } else {
      className += ' slider-item-details-inactive';
    }

    var test = this.props.sliderHeight / 4 - 12;

    var detailsStyle = {
      'transform': 'translateY(-' + test + 'px)'
    };
    const thumbUrl = this.props.activeSlide.thumb || ('http://www.eternityready.com/uploads/' + this.props.activeSlide.picture);
    return (
      <div className='slider-item-details-container' ref="details" style={detailsStyle}>
        <div className={className} ref="detailsContent">
          <div className='slider-details-left'>
            <h2>{this.props.activeSlide ? this.props.activeSlide.title : ''}</h2>
            <span className="stars">{ this.props.activeSlide && '★'.repeat(this.props.activeSlide.rating)}</span>
            {
              this.props.activeSlide ?
                this.props.activeSlide.age ?
                  <span className="slider-details-age">{this.props.activeSlide ?
                    this.props.activeSlide.age : ''}</span> :
                  '' :
                ''
            }

            <span className="year">{ this.props.activeSlide ? this.props.activeSlide.year : '' }</span>
            <span className="slider-details-info">{this.props.activeSlide ? this.props.activeSlide.description : ''}</span>
          </div>
          <div className='slider-details-right'>
            {this.props.activeSlide ?  <img src={thumbUrl} className='slider-details-image' role='presentation' /> : ''}
            <div className="slider-item-details-close" onClick={this.props.closeDetails}>X</div>
            <div className="gradient"></div>

            {
              this.props.activeSlide && this.props.activeSlide.uniqueId ?
                <Link to={`/watch/${this.props.activeSlide.uniqueId}`}>
                  <div className="play"></div>
                </Link> :
                <a href={this.props.activeSlide.href}>
                  <div className="play"></div>
                </a>
            }
          </div>
        </div>
      </div>
    );
  }
});

export default presenter({
  fragments: {
    channel: `
      fragment on Channel {
        uniqueId
        thumb
        title
        description
        slug
      }
    `,
  },
})(ItemDetails);
