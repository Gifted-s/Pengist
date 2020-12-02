import React, { Component, Suspense } from 'react';
import { Spinner } from 'reactstrap'
import Home from './Components/Home';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './Components/Login';
import Dashboard from './Components/Dashboard/Dashboard'
import Article from './Components/Article';
import Category from './Components/Category';
import About from './Components/About';
import Contact from './Components/Contact';
import Tweeter from './Components/Tweets';
import Updated from './Components/Updated';
import Trending from './Components/Trending';
import Episode from './Components/Episode';
import firebase from 'firebase'
import Forums from './Components/Forums';
import Starter from './Components/Starter';
// import './firebaseConfig'
export default class App extends Component {
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCFWiWBzLrovTeIrOgGVM2gmQWdnd56Fyc",
      authDomain: "test-project-34def.firebaseapp.com",
      databaseURL: "https://test-project-34def.firebaseio.com",
      projectId: "test-project-34def",
      storageBucket: "test-project-34def.appspot.com",
      messagingSenderId: "13998930621",
      appId: "1:13998930621:web:7a6d2d62554fb3213655d4",
      measurementId: "G-C42343XHF9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/forums" component={Forums} />
          <Route path="/signup" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/updated" component={Updated} />
          <Route path="/trending" component={Trending} />
          <Route path="/getstarted" component={Starter} />
          <Route path="/contact" component={Contact} />
          <Route path="/article/:id" component={Article} />
          <Route path="/episode/:id/:episode" component={Episode} />
          <Route path="/category/:category" component={Category} />
          <Route path="/tweeter" component={Tweeter} />

        </Switch>

      </BrowserRouter>


    )
  }
}
