import React from "react";
import "./css/dashboard.css";
const Dashboard = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <p className="navbar-brand">Welcome name!</p>

      <div className="my-2 my-lg-0">
        <p>Sign Out</p>
      </div>
    </nav>
    <div className="container-fluid" id="sidebar">
      <div className="container">
        <div className="list-group">
          <button className="list-group-item list-group-item-action active sidebar-tab">
            Messages
          </button>
          <button className="list-group-item list-group-item-action sidebar-tab">
            Schedule
          </button>
          <button className="list-group-item list-group-item-action sidebar-tab">
            Log
          </button>
        </div>
      </div>
      <div className="container" />
    </div>
  </div>
);

export default Dashboard;
