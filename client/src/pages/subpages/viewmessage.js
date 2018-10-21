import React, { Component } from "react";
import "./css/messages.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class ViewMessage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.messages);
    this.message = this.props.messages[parseInt(props.match.params.number, 10)];
    console.log(this.message);
  }
  componentDidMount() {
    console.log("loaded view message");
  }
  render() {
    console.log(this.props);
    return (
      <div className="container-fluid px-3">
        <div className="container py-3">
          <Link to="/dashboard">
            <button type="button" className="btn btn-danger">
              Back
            </button>
          </Link>
        </div>
        <div className="container-fluid" />
      </div>
    );
  }
}
/*
<h3>{this.message.title}</h3>
          <h6>{this.message.sender}</h6>
          <p>{this.message.content}</p>

          */

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ViewMessage);
