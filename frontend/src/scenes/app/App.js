import React from "react";
import Sidebar from "./sidebar/sidebar.js";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Budget from "./budget/budget";
import Transactions from "./transactions/transactions";

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className={"row"}>
            <div className={"col-2"}>
              <Sidebar onLogout={this.props.onLogout} />
            </div>
            <Switch>
              <Route
                exact
                path={"/app/budget"}
                render={props => <Budget {...props} />}
              />
              <Route
                exact
                path={"/app/transactions"}
                render={props => <Transactions {...props} />}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
