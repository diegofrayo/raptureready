/* @flow */

import React, { Component, PropTypes } from 'react';
import { container } from '../../../Adrenaline';
import Loader from '../../components/Loader';
import Category from '../../components/Category';

class Browse extends Component {
    static propTypes = {
        homepageCategories: PropTypes.array,
        isFetching: PropTypes.bool.isRequired
    }
    render() {

        const { homepageCategories, isFetching } = this.props;

        if (isFetching) {
            return <Loader />;
        }

        return (
            <div className="Browse">
                {homepageCategories.map((category, index) => <Category key={index} category={category} />)}
            </div>
        );
    }
}

export default container({
    query: `
    query {
      homepageCategories {
        ${Category.getFragment('category')}
      }
    }
  `,
})(Browse);