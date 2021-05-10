import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTransaction from "./components/transactions/add-transaction.component";
// import Tutorial from "./components/tutorial.component";
import Transactions from "./components/transactions/transactions.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/transactions" className="navbar-brand">
            Office Transactions
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Transaction
              </Link>
            </li>
          </div>
        </nav>

        {<div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/transactions"]} component={Transactions} />
            <Route exact path="/add" component={AddTransaction} />
            {/*<Route path="/tutorials/:id" component={Tutorial} />*/}
          </Switch>
        </div>}
      </div>
    )
  }
}

export default App;
