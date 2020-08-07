import React, { Component, Fragment } from 'react';
import Header from '../header';
import Banner from '../banner';

class Home extends Component {
  render() {
    return( 
    <Fragment>
      <Header/>
      <Banner></Banner>
    </Fragment>)
  }
}

export default Home;
