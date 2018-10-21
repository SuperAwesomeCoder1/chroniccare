import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import CreatePerson from "./pages/create-person";
import Footer from "./pages/footer";
import SendMessage from "./pages/subpages/send-message";

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

const Main = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/createPerson" component={CreatePerson} />
    <Route path="/test" component={SendMessage} />
  </Switch>
);
export default App;
