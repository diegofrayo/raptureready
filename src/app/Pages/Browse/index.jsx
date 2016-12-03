/* @flow */

import React, { Component, PropTypes } from 'react';
import { container } from '../../../Adrenaline';
import Loader from '../../components/Loader';
import Category from '../../components/Category';
import Billboard from '../../components/Billboard';
import GoogleAd from '../../components/GoogleAd';
import Slider from '../../components/Slider'

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
                <Billboard />
                <div style={{display: 'flex', justifyContent: 'center', padding: '30px 15%'}} >
                    <div style={{flex: 1}} >
                        <GoogleAd
                            classNames="adslot_1"
                            client="ca-pub-8022147088754346"
                            slot="4861967110"
                        />
                    </div>
                </div>
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