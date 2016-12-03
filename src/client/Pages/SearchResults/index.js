import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { getVisibleChannels } from '../reducers/channels'
import { container } from '../../../Adrenaline';
import { browserHistory, Link } from 'react-router'
import Loader from '../../components/Loader';
import getChannelUrl from '../../helpers/getChannelUrl';
// import './style.css'

class SearchResults extends Component {

  static propTypes = {
    channelSearch: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  static defaultProps = {
    channels: [],
  }
  constructor(props) {
    super(props);
    const { search, query, setQuery } = this.props
    if(search !== query){
      setQuery(query)
    }
  }

  setVisibleItems = (visibleItems)=> {
    this.setState({
      visibleItems: visibleItems
    })
  }

  render() {
    // debugger;
    const { isFetching } = this.props;
    if (isFetching) {
      return <Loader />;
    }

    const sliders = this.props.channelSearch.map((channel, index) => {
        return (
          <Link to={`/watch/${getChannelUrl(channel)}`} key={index}>
            <div className="search-item">
              <div className="search-background" style={{backgroundImage: `url(${channel.thumb})`}}>
              </div>
              <div className="search-caption">{channel.title}</div>
            </div>
          </Link>
        )
    })

    return (
      <div className="main">
        <div className="search-container">
         {sliders}
       </div>
      </div>
    )
  }
}

export default container({
  query: `
    query getChannels($query: String){
      channelSearch(query: $query) {
        title
        thumb
        slug
        uniqueId
      }
    }
  `, variables: (props) => ({'query': props.params.query})
})(SearchResults);

// const mapStateToProps = (state, ownProps) => {
//   return {
//     channels: getVisibleChannels(state, ownProps.params.query),
//     search: state.search.query,
//     query: ownProps.params.query,
//   }
// }
//
// export default connect(mapStateToProps, {setQuery})(SearchResults)
