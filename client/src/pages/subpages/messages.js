import React, { Component } from "react";
import "./css/messages.css";
import { connect } from "react-redux";
class Messages extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid px-3">
        <div className="d-flex justify-content-between container py-3">
          <h1>Messages:</h1>
        </div>
        <div className="container" id="msgtable">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Sender</th>
              </tr>
            </thead>
            <tbody>
              {this.props.messages.map((data, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      data-toggle="collapse"
                      data-target={`#hidden${index}`}
                      className="clickable"
                      aria-expanded="false"
                      aria-controls={`#hidden${index}`}
                    >
                      <td>{data.title}</td>
                      <td>
                        {data.sender.first_name} {data.sender.last_name}
                      </td>
                    </tr>
                    <tr>
                      <td
                        id={`hidden${index}`}
                        className="collapse"
                        colspan="2"
                      >
                        {data.content}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Messages);
