import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./css/homepage.css";
import { db, auth, provider } from "../firebase/firebase";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: "",
      username: "",
      items: [],
      user: null,
      redirect: false,
      redirectLoc: ""
    };
    this.login = this.login.bind(this);
  }
  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      this.setState({
        user
      });
      var patientRef = db.collection("patients").doc(user.uid);
      patientRef
        .get()
        .then(pat => {
          if (pat.exists) {
            this.setState({ redirect: true, redirectLoc: "/dashboard" });
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
        });
      var doctorRef = db.collection("doctors").doc(user.uid);
      doctorRef
        .get()
        .then(doc => {
          if (!doc.exists) {
            this.setState({ redirect: true, redirectLoc: "/createPerson" });
          } else {
            this.setState({ redirect: true, redirectLoc: "/dashboard" });
          }
        })
        .catch(err => {
          console.log("Error getting user info", err);
        });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectLoc} />;
    }
    return (
      <div>
        <div className="jumbotron h-100 vertical-center" id="title">
          <div className="container" id="title-text">
            <div>
              <h1 className="display-2">Welcome to Chronic Care!</h1>
              <p className="lead">
                A platform where doctors and their patients with chronic
                conditions can communicate and work together to treat that
                patient's condition.
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid" id="sign-up">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <button
                onClick={this.login}
                className="btn btn-outline-success btn-lg btn-block"
              >
                Sign in to Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Homepage;
