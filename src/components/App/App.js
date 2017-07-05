import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';

class App extends Component {
  // Initialize constructor of the class
  constructor(){
    super();
    this.state = {
      user: null
    };

    // Initialize the methods listener
    this.socialLogin = this.socialLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  //
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });
  }

  socialLogin(loginProvider) {
    var provider;

    loginProvider = loginProvider.currentTarget.dataset.id;

    switch(loginProvider){
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
      break;
    case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
      break;
    case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
      break;
    default:
      console.log('Sorry, we are out of ' + loginProvider + '.');
    }

    firebase.auth().signInWithPopup(provider)
      .then( (result) => {
        console.log(`${result.user.email} ha iniciado session`);
      }).catch( (error) => {
        console.log(`Error ${error.code}: ${error.message}`);
      });
  }

  //
  handleLogOut(){
    firebase.auth().signOut()
      .then( result => console.log(`Ha cerrado sesión`))
      .catch( error => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderUser () {
    if(this.state.user){
      return (
        <div className="card">
            <img src={this.state.user.photoURL} alt="John" width='100%' /> 
            <div className="card-container">
              <h1>{this.state.user.displayName}</h1>
              <p>
                <button className='card-button' onClick={this.handleLogOut} >
                  Logout
                </button>
              </p>
            </div>
        </div>
      );
    }else{
      return (
        <div className="container">
            <div className="fb-icon-bg"></div>
            <div className="fb-bg" data-id='facebook' onClick={this.socialLogin}></div>
            <div className="twi-icon-bg"></div>
            <div className="twi-bg" data-id='twitter' onClick={this.socialLogin}></div>
            <div className="g-icon-bg"></div>
            <div className="g-bg" data-id='google' onClick={this.socialLogin}></div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="app">
        {this.renderUser()}
      </div>
    );
  }
}

export default App;
