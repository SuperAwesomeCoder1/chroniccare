import React, { Component } from "react";
import {
  Redirect,
  Switch,
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import axios from "axios";
import "./css/dashboard.css";
import { connect } from "react-redux";
import Messages from "./subpages/messages";
import SendMessage from "./subpages/send-message";
import {
  changeFirstName,
  changeLastName,
  changePhone,
  addMessage
} from "../actions/actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getProfile = this.getProfile.bind(this);
    this.getMessages = this.getMessages.bind(this);
    var userInfo = this.props.profile.uid;
    if (!userInfo) {
    } else {
      this.getProfile(userInfo);
      this.getMessages(userInfo);
    }
  }

  getProfile(uid) {
    if (this.props.profile.role === "patient") {
      axios.post("/patientProfile", { uid: uid }).then(res => {
        var data = res.data;
        this.onChangeFirstName(data.first_name);
        this.onChangeLastName(data.last_name);
        this.onChangePhone(data.phone);
      });
    } else if (this.props.profile.role === "doctor") {
      axios.post("/doctorProfile", { uid: uid }).then(res => {
        var data = res.data;
        this.onChangeFirstName(data.first_name);
        this.onChangeLastName(data.last_name);
        this.onChangePhone(data.phone);
      });
    }
  }
  getMessages(uid) {
    if (this.props.profile.role === "patient") {
      axios.post("/patientMessages", { uid }).then(async res => {
        var data = res.data;
        for (var i = 0; i < data.messages.length; i++) {
          await this.onAddMessage(data.messages[i]);
        }
      });
    } else if (this.props.profile.role === "doctor") {
      axios.post("/doctorMessages", { uid }).then(async res => {
        var data = res.data;
        for (var i = 0; i < data.messages.length; i++) {
          await this.onAddMessage(data.messages[i]);
        }
      });
    }
  }
  onAddMessage(message) {
    this.props.onAddMessage(message);
    this.wait = true;
  }
  onChangeFirstName(firstname) {
    this.props.onChangeFirstName(firstname);
  }
  onChangeLastName(lastname) {
    this.props.onChangeLastName(lastname);
  }
  onChangePhone(phone) {
    this.props.onChangePhone(phone);
  }

  render() {
    if (!this.props.profile.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <nav className="d-flex justify-content-between navbar navbar-light bg-light">
          <p className="navbar-brand pl-2">
            Welcome {this.props.profile.role === "doctor" && <>Doctor </>}
            {this.props.profile.first_name}!
          </p>
          <div className="my-2 my-lg-0">
            <p>Sign Out</p>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-2" id="sidebar">
            <div className="container">
              <div className="list-group">
                <NavLink to="/dashboard">
                  <button className="list-group-item list-group-item-action sidebar-tab">
                    Message Inbox
                  </button>
                </NavLink>
                <NavLink to="/dashboard/send-message">
                  <button className="list-group-item list-group-item-action sidebar-tab">
                    Send Message
                  </button>
                </NavLink>
                <button className="list-group-item list-group-item-action sidebar-tab">
                  Log
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <Switch>
              <Route exact path="/dashboard" component={Messages} />
              <Route path="/dashboard/send-message" component={SendMessage} />
            </Switch>
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
  onChangeFirstName: changeFirstName,
  onChangeLastName: changeLastName,
  onChangePhone: changePhone,
  onAddMessage: addMessage
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);
