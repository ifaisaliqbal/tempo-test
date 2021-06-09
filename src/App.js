import "./App.css";
import TeamDisplay from "./Components/TeamDisplay/TeamDisplay";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";
import TeamUserDisplay from "./Components/TeamUserDisplay/TeamUserDisplay";
import React from "react";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={TeamDisplay} />
          <Route exact path="/:id" component={TeamUserDisplay} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
