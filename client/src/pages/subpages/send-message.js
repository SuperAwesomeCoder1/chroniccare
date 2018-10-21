import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      sender: "",
      recipient: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    const message = {
      title: this.state.title,
      content: this.state.content,
      sender: "patients/" + this.props.profile.uid,
      recipient: this.state.recipient
    };
    axios.post(`/sendMessage`, { message }).then(res => {
      
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="cointainer-fluid">
        <form onSubmit={this.onSubmit} className="p-3">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="title"
              name="title"
              className="form-control"
              id="title-input"
              placeholder="Title"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Recipient</label>
            <input
              type="recipient"
              name="recipient"
              className="form-control"
              id="recipient-input"
              placeholder="Recipient"
              value={this.state.recipient}
              onChange={this.onChange}
            />
          </div>
          <div class="form-group">
            <label htmlfor="exampleFormControlTextarea1">Content</label>
            <textarea
              type="content"
              name="content"
              className="form-control"
              id="content-input"
              rows="3"
              value={this.state.content}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(SendMessage);
