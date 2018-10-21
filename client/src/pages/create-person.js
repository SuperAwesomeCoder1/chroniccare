import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
class CreatePerson extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      role: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
      role: this.state.role
    };
    console.log("React user", user);
    const userInfo = { uid: this.props.profile.uid };
    axios
      .post(`/createPerson`, { user: user, userInfo: userInfo })
      .then(res => {
        console.log(res.data);
        this.props.history.push("/dashboard");
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    if (!this.props.profile.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="container-fluid p-5">
          <h1 className="display-4">Create a User:</h1>
          <form onSubmit={this.onSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <input
                type="first_name"
                name="first_name"
                className="form-control"
                id="first-name-input"
                placeholder="First Name"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <input
                type="last_name"
                name="last_name"
                className="form-control"
                id="first-name-input"
                placeholder="Last Name"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Phone number</label>
              <input
                type="phone"
                name="phone"
                className="form-control"
                id="phone-input"
                placeholder="Phone Number"
                value={this.state.password}
                onChange={this.onChange}
              />
              <small id="phoneNote" className="form-text text-muted">
                Note: Do not put dashes or other symbols in.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="selectRole">Role</label>
              <select
                type="role"
                name="role"
                value={this.state.password}
                onChange={this.onChange}
                className="form-control"
                id="selectRole"
              >
                <option value="doctors">Doctor</option>
                <option value="patients">Patient</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CreatePerson);
