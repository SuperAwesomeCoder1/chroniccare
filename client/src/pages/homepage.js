import React, { Component } from "react";
import "./css/homepage.css";
import { db, auth, provider } from "../firebase/firebase";
import { connect } from "react-redux";
import { changeUID, changeRole } from "../actions/actions";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.onChangeUID = this.onChangeUID.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
  }
  onChangeUID(uid) {
    this.props.onChangeUID(uid);
  }

  onChangeRole(role) {
    this.props.onChangeRole(role);
  }
  login() {
    auth.signInWithPopup(provider).then(async result => {
      const user = result.user;
      this.onChangeUID(user.uid);
      var patientRef = db.collection("patients").doc(user.uid);
      var patient = false;
      await patientRef
        .get()
        .then(pat => {
          if (pat.exists) {
            patient = true;
            this.onChangeRole("patient");
            this.props.history.push("/dashboard");
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
        });
      if (patient === false) {
        var doctorRef = db.collection("doctors").doc(user.uid);
        doctorRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              this.props.history.push("/createPerson");
            } else {
              this.onChangeRole("doctor");
              this.props.history.push("/dashboard");
            }
          })
          .catch(err => {
            console.log("Error getting user info", err);
          });
      }
    });
  }

  render() {
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
const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  onChangeUID: changeUID,
  onChangeRole: changeRole
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Homepage);
