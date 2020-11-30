import './App.css';
import React from "react";
import Users from "./components/Users";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={Users} />
                <Route exact path="/user/:id" component={EditUser} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
