import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./Products";
import ProductCreate from "./ProductCreate";

class App extends React.Component {
  render() {
    return (
      <Router>
        <h1>Генератор цінників</h1>

        <Switch>
          <Route exact path="/" children={<Products />} />
          <Route exact path="/create" children={<ProductCreate />} />
          <Route exact path="/edit/:id" children={<ProductCreate />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
