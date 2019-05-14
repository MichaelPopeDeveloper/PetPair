import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import * as axios from 'axios';
import Egg from '../Components/test';
import { Button } from 'reactstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  static async getInitialProps({ req, res }) {
    // const user = await axios.post('http://localhost:3001/user/login', { username: 'eggs', password: 'eggs' })
    //   .then(result => {
    //     console.log(result.data);
    //     return result.data.user;
    //   })
    //   .catch(error => console.log('error', error));
    return { user: null };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log('username: ', username);
    console.log('password: ', password);
     axios.post('http://localhost:3001/user/login', { username, password })
      .then(result => {
        console.log(result.data);
        return result.data.user;
      })
      .catch(error => console.log('error', error));
  }
  handleUsernameChange = (username) => this.setState({ username });
  handlePasswordChange = (password) => this.setState({ password });

  render() {
    const { username, password } = this.state;
    console.log('props', this.props.user)
    return (
      <div>
        <Head>
          <title>Login</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
        </Head>
        <div className="container">
          <div className="row">
            <div className="col p-5 d-flex flex-column justify-content-center align-items-center">
              <p>Sorry, you need to login.</p>

              <form className="shadow p-5" onSubmit={e => {
                e.preventDefault();
              }}>
                {/* Add link to signup component */}
                <p>Not a member? <Link href="user/signup"><a className="text-secondary">Sign Up</a></Link></p>
                <div className="form-group">
                  <label for="exampleInputEmail1">Username</label>
                  <input value={username} onChange={this.handleUsernameChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input value={password} onChange={this.handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;