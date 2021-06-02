// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home/home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:scanId">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
