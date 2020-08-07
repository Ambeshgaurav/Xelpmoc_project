import React, { Component  , Fragment} from 'react';
import { connect } from 'react-redux';
import './main.css'
import {getTopTrendingProperty} from '../../redux-container';
import LoaderIndicator from '../common/LoaderIndicator'
import Header from '../header';
import Banner from '../banner';


class Main extends Component {
   constructor(props){
      super(props);
   }
   
  render() {
   if(this.props.loading) {
      return <LoaderIndicator/>
   }

    return (
      <Fragment>
         <Header/>
         <Banner/>
      </Fragment>) ;
  }
}


const mapStateToProps = state => {
   return {
     loading : state.signup['loading'], 
   }
 }

const mapDispatchToProps = (dispatch) =>{
   return {
      //toggle: type => dispatch(toggleModal(type)),
      getTopTrendingProperty:()=>dispatch(getTopTrendingProperty())
   }
}

export default connect(mapStateToProps , mapDispatchToProps)(Main);

