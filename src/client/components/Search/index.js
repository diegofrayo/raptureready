import React, {Component, PropTypes} from 'react'
import  { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { setQuery, activateSearch, deactivateSearch } from '../../actions/'
import './style.css';
class Search extends Component{
  static defaultProps = {
    query: '',
    isActive: false,
  }

  static PropTypes = {
    query: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }

  /*
  deactivateSearch = (e) => {
    if(e.target !== this.refs.label && e.target !== this.refs.close && e.target !== this.refs.input && this._input.value === '') {
      this.props.deactivateSearch()
      browserHistory.push(`/browse`)
    }
  }*/

  activateSearch = () => {
    this.props.activateSearch()
    this._input.focus()
  }

  clearSearch = () => {
    this.props.setQuery('')
    this.props.deactivateSearch()
    this._input.value = ''
    browserHistory.push(`/browse`)
  }

  updateSearch = (e) => {
    if(this.props.query !== null && this.props.query !== '' && this.props.isActive) {
      browserHistory.push(`/search/${e.target.value}`)
    }else{
      browserHistory.push(`/browse`)
    }
  }

  handleChange = (e) => {
    this.props.setQuery(e.target.value)

    if(e.target.value === '')
      browserHistory.push(`/browse`)
  }

  render() {
    const labelStyle = {
      'display': !this.props.isActive ? 'block' : 'none'
    };

    const closeSearchStyle = {
      'display': this.props.isActive ? 'block' : 'none'
    };

    var inputClass = this.props.isActive ? 'active' : 'inactive'

    return (
      <div className="search-input">
        <a href="#" id="search-en" onClick={this.activateSearch} style={labelStyle} ref="label">Search</a>
        <input
          type="text"
          id="inpsearch"
          className={inputClass}
          placeholder="Search..."
          onKeyUp={this.updateSearch}
          onChange={this.handleChange}
          value={this.props.query}
          ref={(c) => this._input = c}
        />
        <span href="" style={closeSearchStyle} id="closesearch" onClick={this.clearSearch} ref="close">x</span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  query: "",
  isActive: false,
})

export default connect(mapStateToProps, {
  // setQuery,
  // activateSearch,
  // deactivateSearch
}
)(Search)


