import React, { Component } from 'react';
import Login from './Login';
import Home from './Home';
import { auth } from './config/Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : {},
      userID : null
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user : user, userID : user.uid});
      }
      else {
        this.setState({ user : null });
      }
    });

  }
  
  render() {
    return (
      <div className='App'>
        {this.state.user ? ( <Home userID = {this.state.userID}/> ) : ( <Login/> ) }
      </div>
    );
  }
}

export default App;
