import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import CreatePerson from "./pages/create-person";
import Footer from "./pages/footer";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Main />
        <Footer />
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <Route exact path="/createPerson" component={CreatePerson} />
  </Switch>
);

export default App;
