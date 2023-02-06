import React, { useEffect, useState } from "react";
import axios from "axios";

import { log, success, error } from "../utils/logs";
import Spinner from "../commons/spinner";
import Cake from "../static/cake.jpg";

export default () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    log("secret attempt...");
    axios
      .get("/api/secret")
      .then((res) => res.data)
      .then((user) => {
        setUser(user);
        setLoading(false);
        success(
          `Hello and, again, welcome to the Aperture Science computer-aided enrichment center.`
        );
      })
      .catch(({ response }) => {
        setLoading(false);
        error(response.status, response.statusText);
      });
  }, []);

  if (loading) return <Spinner />;

  if (user.email) {
    return (
      <div>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Welcome {user.name} {user.lastname}!
        </h2>
        <p className="m-0 text-center text-m leading-9 text-gray-900">
          Test Subject:{user.email}
        </p>
        <img src={Cake} alt="the cake is a lie" width="400" />
      </div>
    );
  }

  return (
    <>
      <p className="text-red-600 text-6xl">404 Not Found</p>
    </>
  );
};
