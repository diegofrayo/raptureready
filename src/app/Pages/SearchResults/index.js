// npm libs
import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	browserHistory,
	Link
} from 'react-router'

// react components
import Loader from '../../components/Loader';

// redux
import {
	search
} from '../../redux/modules/channels';

// js utils
import getChannelUrl from '../../helpers/getChannelUrl';
import getThumbUrl from '../../helpers/getThumbUrl';

class SearchResults extends Component {

	componentWillMount() {
		this.props.search(this.props.params.query);
	}

	componentWillReceiveProps(nextProps) {
		document.body.scrollTop = 0;
		if (this.props.params.query != nextProps.params.query) {
			this.props.search(nextProps.params.query);
		}
	}

	setVisibleItems = (visibleItems) => {
		this.setState({
			visibleItems
		});
	};

	render() {

		const {
			isFetching
		} = this.props;

		if (isFetching) {
			return <Loader />;
		}

		const sliders = this.props.searchResults.map((channel, index) => {
			const thumbUrl = getThumbUrl(channel);
			return (
				<Link to={getChannelUrl(channel)} key={index}>
            <div className="search-item">
              <div className="search-background" style={{backgroundImage: `url(${thumbUrl})`}}>
              </div>
              <div className="search-caption">{channel.title}</div>
            </div>
          </Link>
			)
		});

		return (
			<div className="main">
				<div className="search-container">
					{sliders}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	search: (query) => {
		dispatch(search(query))
	}
});

const mapStateToProps = (state) => ({
	isFetching: state.channels.isFetchingSearchResults,
	searchResults: state.channels.searchResults
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);