import React, { Component } from 'react';
import Login from '../Login/Login';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import '../../styles/app.css';
import { loginUser } from '../../actions/index';
import * as axios from 'axios';

const mapStateToProps = state => {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    loginUser: user => dispatch(loginUser(user))
  };
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: [],
    }
  }

  componentWillMount() {
    this.auth();
  }

  auth = () => {
    const token = localStorage.getItem('token');
    axios.get('https://api.petfinder.com/v2/animals?type=dog&page=2',
      {
        headers: {
          Authorization: "Bearer " + token,
          // "Access-Control-Allow-Origin": "*",
        }
      })
      .then(result => {
        const { animals } = result.data;
        this.setState({ animals });
        console.log('Animals From State', this.state.animals);
      })
      .catch(error => console.log('error', error));
  }

  searchForUserInput() {

    axios.post('', {})
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }


  render() {
    return (
      <div className="row">
        <div className="col d-flex flex-column justify-content-center align-items-center align-content-center">
          <div class="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={"https://images.pexels.com/photos/2313393/pexels-photo-2313393.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center align-content-center">
          <div class="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={"https://images.pexels.com/photos/2313393/pexels-photo-2313393.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center align-content-center">
          <div class="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={"https://images.pexels.com/photos/2313393/pexels-photo-2313393.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);