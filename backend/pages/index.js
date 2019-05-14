import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import * as axios from 'axios';
import Egg from '../Components/test';
import {Button} from 'reactstrap';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: ''
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

  render() {
    console.log('props', this.props.user)
    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
        </Head>
        <div className="container">
          <div className="row">
            <div className="col p-5 d-flex justify-content-center align-items-center">
              <p>Hello Next.js, {this.props.user ? this.props.user.username : ''}</p>
              <Button>Hello!</Button>
            </div>
          </div>
          <Link href="/user/test">
            <a>Test Page!</a>
          </Link>
          <h1>Testing Bootstrap</h1>
          <Egg></Egg>
        </div>
      </div>
    )
  }
}
export default Index