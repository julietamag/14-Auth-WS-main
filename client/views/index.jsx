import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import Welcome from "./Welcome.jsx";
import NavBar from "./Navbar.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Secret from "./Secret.jsx";
import ForgotPassword from "./ForgotPassword.jsx";

import { useAuthContext } from "../context/user";
import { log, success, error } from "../utils/logs";

export default () => {
  const { setUser } = useAuthContext();

  useEffect(() => {
    log(`fetching user...`);
    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((user) => {
        success(`found user ${user.mail}`);
        setUser(user);
      })
      .catch(({ response }) => {
        error(response.status, response.statusText);
      });
  }, []);

  return (
    <div className="h-screen">
      <NavBar />
      <div className="h-full flex justify-center items-center">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/secret" component={Secret} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};
