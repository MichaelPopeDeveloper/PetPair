import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoURL: 'https://player.vimeo.com/external/276547742.sd.mp4?s=069d4ce8015fee598ba71ae6bfbab699432606e6&profile_id=164&oauth2_token_id=57447761',
        }
    }
    render() {
        return (
            <div className="App">
            <video id="background-video" loop autoPlay>
                <source src={this.state.videoURL} type="video/mp4" />
                <source src={this.state.videoURL} type="video/ogg" />
                Your browser does not support the video tag.
            </video>
               <h1 className="display-1 pt-5 mt-5 mb-0 pb-0">Pet Pair</h1>
               <p className="text-secondary mt-0 pt-0">Pairing people, with their favorite animals.</p>

               <button className="btn btn-primary mt-5"> <i class="fas fa-map-marker-alt pr-2"></i> Find Animals In Your Area</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);