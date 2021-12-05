import React from "react";
import Home from "./pages/Home/index"
import Coin from "./pages/Coin/index"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {




  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/coin/:id" component={Coin} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function Portfolio() {
  return <h2>This is where the portfolio will be!</h2>;
}
