import React, {Component} from 'react';
import { Route, IndexRoute  } from 'react-router';
import App from './App';
import Browse from './Pages/Browse';
import Player from './Pages/Player';
import { Adrenaline } from '../Adrenaline';


class AdrenalineContainer extends Component {
    render() {
        console.log('this.props');
        console.log(this.props);
        var ChildComponent = this.props.handle;
        return (

            <Adrenaline {...this.props}>
                <ChildComponent />
            </Adrenaline>

        );
        // <Adrenaline {...adrenalineProps}>
        // </Adrenaline>
    }
}

export default (aProps) => (
  <Route path="/" component={App}>
      {/*<IndexRoute components={(props) => <Adrenaline  {...aProps}><Browse {...aProps} {...props} /></Adrenaline>} />*/}

      <Route path='watch/:channelId' component={(props) => <Adrenaline {...aProps}><Player {...props} /></Adrenaline>}/>
  </Route>
);


