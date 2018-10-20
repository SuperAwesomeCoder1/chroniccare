import React from "react";
import "./css/homepage.css";
const Homepage = () => (
  <div>
    <div class="jumbotron h-100 vertical-center" id="title">
      <div class="container" id="title-text">
        <div>
          <h1 class="display-2">Welcome to Chronic Care!</h1>
          <p class="lead">
            A platform where doctors and their patients with chronic conditions
            can communicate and work together to treat that patient's condition.
          </p>
        </div>
      </div>
    </div>
    <div class="container-fluid" id="sign-up">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <h2>Sign Up:</h2>
          <button
            type="button"
            class="btn btn-outline-success btn-lg btn-block"
          >
            I'm a Doctor
          </button>
          <button type="button" class="btn btn-outline-info btn-lg btn-block">
            I'm a Patient
          </button>
          <hr class="hr-text" data-content="OR" />
          <button
            type="button"
            class="btn btn-outline-primary btn-lg btn-block"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid text-center bg-dark" id="footer">
      <p id="footer-text">Copyright &copy; 2018 Nathan Rogers</p>
    </div>
  </div>
);

export default Homepage;
