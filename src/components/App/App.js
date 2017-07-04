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
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  //
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });
  }

  //
  handleSignIn(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then( result => console.log(`${result.user.email} ha iniciado session`))
      .catch( error => console.log(`Error ${error.code}: ${error.message}`));
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
              <p className="card-title">CEO & Founder</p>
              <p>Activalab</p>
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
            <div className="fb-bg" onClick={this.handleSignIn}></div>
            <div className="twi-icon-bg"></div>
            <div className="twi-bg" onClick={this.handleSignIn}></div>
            <div className="g-icon-bg"></div>
            <div className="g-bg" onClick={this.handleSignIn}></div>
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
