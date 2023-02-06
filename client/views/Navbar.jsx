import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuthContext } from "../context/user";
import { log, success, error } from "../utils/logs";
import Logo from "../commons/logo";

const Pair = ({ children }) => (
  <div className="flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
    {children}
  </div>
);

const EmptyButton = ({ children }) => (
  <button className="whitespace-no-wrap text-base leading-6 font-medium text-white hover:text-pink-200 focus:outline-none focus:text-pink-200 transition ease-in-out duration-150">
    {children}
  </button>
);

const RoundButton = ({ children, onClick = () => {} }) => (
  <span className="inline-flex rounded-md shadow-sm">
    <button
      onClick={onClick}
      className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-fuchsia-500 hover:bg-pink-500 focus:outline-none focus:border-purple-200 focus:shadow-outline-purple active:bg-pink-700 transition ease-in-out duration-150"
    >
      {children}
    </button>
  </span>
);

export default () => {
  const { user, setUser } = useAuthContext();
  const history = useHistory();

  const handleLogout = async () => {
    log("logout attempt...");
    try {
      await axios.post("/api/logout");
      setUser({});
      success("logged out");
      history.push("/");
    } catch ({ response }) {
      error(response.status, response.statusText);
    }
  };

  return (
    <div className="bg-fuchsia-800 fixed w-full">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="w-0 flex-1">
          <Link to="/" className="flex">
            <Logo className="h-12 w-auto rounded-full" />
          </Link>
        </div>
        {user.email ? (
          <Pair>
            <Link to="/secret">
              <EmptyButton>Secret</EmptyButton>
            </Link>
            <RoundButton onClick={handleLogout}>Logout</RoundButton>
          </Pair>
        ) : (
          <Pair>
            <Link to="/login">
              <EmptyButton>Login</EmptyButton>
            </Link>
            <Link to={`/register`}>
              <RoundButton>Register</RoundButton>
            </Link>
          </Pair>
        )}
      </div>
    </div>
  );
};
