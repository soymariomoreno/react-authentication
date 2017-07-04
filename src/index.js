import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import './index.css';

import App from './components/App/App';

import registerServiceWorker from './registerServiceWorker';

//Integration to firebase with key and domain in initialize
firebase.initializeApp({
	apiKey: "AIzaSyAdXfejXsqKbY3KuPpWtYqOma9PfdTC3mo",
    authDomain: "projects-3ad0a.firebaseapp.com",
    databaseURL: "https://projects-3ad0a.firebaseio.com",
    projectId: "projects-3ad0a",
    storageBucket: "projects-3ad0a.appspot.com",
    messagingSenderId: "210947315353"
});


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
