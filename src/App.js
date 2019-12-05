import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./Screen.css";
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import  Home  from "./pages/Home";
import { Login } from "./pages/Login";
import { SucessForm } from "./pages/forgotPassword/successForm";
import { ValidateUserForm } from "./pages/forgotPassword/validateUserForm";
import { ChangePasswordForm } from "./pages/forgotPassword/changePasswordForm";
import successfullRegistration from "./pages/successfullRegistration"; 
import  MyPost  from "./pages/MyPost"
import Register from "./pages/Register";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <div className="App">
          <div className="Screen">
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/validateUserForm"
              component={ValidateUserForm}
            />
            <Route
              exact
              path="/changePasswordForm"
              component={ChangePasswordForm}
            />
            <Route exact path="/successForm" component={SucessForm} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/successfullRegistration" component={successfullRegistration} /> 
          </div>

          <Route exact path="/Home" component={Home}></Route>
          <Route exact path="/MyPost" component={MyPost}></Route>
        </div>
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
