import React, { Component } from 'react';
import Login from '../Login/Login';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import '../../styles/app.css';
import { loginUser } from '../../actions/index';

const mapStateToProps = state => {
    return { state };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      loginUser: user => dispatch(loginUser(user))
    };
  }

class Profile extends Component {
    render() {
        return (
            <div className="row">
               
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);