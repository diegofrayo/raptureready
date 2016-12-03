import React, {Component} from 'react';
import { Route, IndexRoute  } from 'react-router';
import App from './App';
import Browse from './Pages/Browse';
import Player from './Pages/Player';
import SearchResults from './Pages/SearchResults';
import { Adrenaline } from '../Adrenaline';


class AdrenalineContainer extends Component {
    render() {

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
  <Route component={App}>
      <Route path="/" component={(props) => {

      var aaProps = props.aProps ? props.aProps : aProps;
      console.log(props.aProps)
        console.log(props.location.pathname)

      if (aaProps && aaProps.initialDataRoute && (aaProps.initialDataRoute != props.location.pathname)) {
        aaProps = {}
      }
      return <Adrenaline {...aaProps}><Browse {...props} /></Adrenaline>
      }} />

      <Route path="/browse" component={(props) => {

      var aaProps = props.aProps ? props.aProps : aProps;
      console.log(props.aProps)
        console.log(props.location.pathname)

      if (aaProps && aaProps.initialDataRoute && (aaProps.initialDataRoute != props.location.pathname)) {
        aaProps = {}
      }
      return <Adrenaline {...aaProps}><Browse {...props} /></Adrenaline>
      }} />

      <Route path="/watch/:channelId" component={(props) => {

      var aaProps = props.aProps ? props.aProps : aProps;
      if (aaProps && aaProps.initialDataRoute && (aaProps.initialDataRoute != props.location.pathname)) {
        aaProps = {}
      }
      return <Adrenaline {...aaProps}><Player {...props} /></Adrenaline>
      }}/>

      <Route path="/search/:query" component={(props) => {

      var aaProps = props.aProps ? props.aProps : aProps;
      if (aaProps && aaProps.initialDataRoute && (aaProps.initialDataRoute != props.location.pathname)) {
        aaProps = {}
      }
      return <Adrenaline {...aaProps}><SearchResults {...props} /></Adrenaline>
      }}/>

  </Route>
);

// <Route path="/" component={Browse} />
// <Route path="/watch/:channelId" component={Player}/>
//
// <Route path="/" component={App}>
//     {/*<IndexRoute components={(props) => <Adrenaline  {...aProps}><Browse {...aProps} {...props} /></Adrenaline>} />*/}
//
//     <Route path='watch/:channelId' component={(props) => <Adrenaline {...aProps}><Player {...props} /></Adrenaline>}/>
