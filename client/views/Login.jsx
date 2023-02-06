import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import Spinner from "../commons/spinner";
import { useAuthContext } from "../context/user";
import { useInput } from "../hooks/useInput";
import { log, success, error } from "../utils/logs";

export default () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const { user, setUser } = useAuthContext();
  const history = useHistory();
  const email = useInput("email");
  const password = useInput("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    log("login attempt...");
    try {
      setLoading(true);
      setError(false);
      // POST user credentials
      const { data } = await axios.post("/api/login", {
        email: email.value,
        password: password.value,
      });
      // Set new state
      setUser(data);
      setLoading(false);
      success(`logged user ${data.email}`);
      // Redirect to secret route!
      history.push("/secret");
    } catch ({ response }) {
      // something's not right...
      setLoading(false);
      error(response.status, response.statusText);
      setError(true);
    }
  };

  useEffect(() => {
    if (user.email) history.push("/");
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Email address"
                {...email}
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Password"
                {...password}
              />
            </div>
          </div>

          <div
            className={`mt-6 flex items-center ${
              hasError ? "justify-between" : "justify-end"
            }`}
          >
            {hasError && (
              <p className="text-red-600 text-m m-0">Invalid Credentials</p>
            )}
            <div className="text-sm leading-5">
              <Link
                to="/forgot-password"
                className="font-medium hover:text-fuchsia-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-fuchsia-500 hover:bg-pink-500 focus:outline-none focus:border-pink-200 focus:shadow-outline-indigo transition duration-150 ease-in-out"
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 transition ease-in-out duration-150"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign in
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
