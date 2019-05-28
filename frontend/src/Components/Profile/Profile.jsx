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
      latitude: null,
      longitude: null,
    }
  }

  componentWillMount() {
    this.getUserLocation()
      .then(() => {
        this.auth();
      })
  }

  getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        /* geolocation is available */
        console.log('geolocation works!');
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('position', position);
          const { latitude, longitude } = position.coords;
          this.setState({ latitude: latitude, longitude: longitude });
          resolve('Location Found!')
        })
      } else {
        reject('Location not available');
        /* geolocation IS NOT available */
        console.log('geolocation does not work!');
      }
    });
  }

  auth = () => {
    console.log('state', this.state);
    const { latitude, longitude } = this.state;
    const token = localStorage.getItem('token');
    axios.get(`https://api.petfinder.com/v2/animals?type=dog&page=2&location=${latitude},${longitude}`,
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

  renderAnimalPhotos = () => {
    const { animals } = this.state;
    let imageCards = [[]];
    if (animals.length > 0) {

      animals.map(animal => {
        if (animal) {

        }
        const currentImageGroup = imageCards[imageCards.length - 1];
        const image =
          <div className="col-sm d-flex flex-column justify-content-center align-items-center align-content-center">
            <div className="card shadow" style={{ width: "18rem" }}>
              <img className="card-img-top" src={animal && animal.photos && animal.photos[0] && animal.photos[0].full} />
              <div className="card-body">
                {animal && animal.photos && animal.photos[0] && animal.photos[0].full
                  ? ''
                  : <h5 className="card-title p-3 m-0 text-center"><b>No Image</b></h5>}
                <h5 className="card-title p-0 m-0"><b>Name:</b> {animal.name}</h5>
                <h5 className="card-title pt-2 m-0"><b>Breed:</b> {animal && animal.breeds && animal.breeds.primary}</h5>
                <p className="card-text">{animal.description ? animal.description : 'No Description'}</p>
                <a href="#" class="btn btn-primary">Contact Owner</a>
              </div>
            </div >
          </div >;

        if (currentImageGroup.length < 2) {
          currentImageGroup.push(image);
        } else {
          imageCards.push([]);
          currentImageGroup.push(image);
        }
      })
    }
    console.log('image cards', imageCards);
    return imageCards.map(imageGroup => {
      return (
        <div className="row p-5">
          {imageGroup}
        </div>
      );
    })

  }


  render() {
    return (
      <div>
        <div className="w-100 d-flex justify-content-center align-content-center align-items-center">
          <form className="w-75 mt-5">
            <div className="form-group">
              {/* <label for="exampleInputEmail1">Email address</label> */}
              <input type="search" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search..." />
            </div>
          </form>
        </div>
        {this.renderAnimalPhotos()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);