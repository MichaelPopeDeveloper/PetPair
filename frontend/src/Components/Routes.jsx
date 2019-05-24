import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import * as axios from 'axios';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Private from './auth/Private';
import Profile from './Profile/Profile';
import PrivateRoute from './auth/PrivateRoute';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';
import config from '../config/config';




const mapStateToProps = state => {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: action => dispatch(logoutUser(action))
  };
}

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
    }
  }

  componentWillMount() {
    this.auth();
    this.getUserLocation();
  }

  auth = () => {
    const { CLIENT_ID, CLIENT_SECRET } = config;
    axios.post('https://api.petfinder.com/v2/oauth2/token',
      `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
      .then(result => {
        if (result.status === 200) {
          const { access_token } = result.data;
          localStorage.setItem('token', access_token);
          console.log('pet finder api response', result);
        };
        //return this.setState({ user: result.data.user });
      })
      .catch(error => console.log('petfinder api error', error)); //Display server error to user gracefully, not just keeping them logged out
  }

  getUserLocation = () => {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      console.log('geolocation works!');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position);
      });
    } else {
      /* geolocation IS NOT available */
      console.log('geolocation does not work!');
    }
  }


  render = () => {
    return (
      <Router>
        {/* <Menu /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/pets" component={Profile} />
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);