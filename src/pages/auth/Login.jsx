import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { apiService } from "../../api/api";
import { USER_LOGIN_ENDPOINT } from "../../api/endpoints";

import { setAuthUser } from "../../redux/userSlice";

const userLoginFormInitialValues = {
  username: "",
  password: "",
};

const showError = (message = "") => toast.error(message);

const isValidUser = (user = {}) => {
  const { username, password } = user;

  if (!username) showError("Please enter a username.");
  else if (!password) showError("Please enter a password.");

  return Boolean(username && password);
};

const Login = () => {
  const [user, setUser] = useState(userLoginFormInitialValues);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const config = {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      };

      if (!isValidUser(user)) return;

      try {
        const res = await apiService.post(USER_LOGIN_ENDPOINT, user, config);

        if (!(res && res.data)) throw new Error("Invalid response format");

        dispatch(setAuthUser(res.data));
        navigate("/");
      } catch (error) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error("Network error: Unable to reach the server.");
        } else {
          toast.error(`An error occurred: ${error.message || ""}`);
        }
        console.error(error);
      } finally {
        setUser(userLoginFormInitialValues);
      }
    },
    [user, dispatch, navigate]
  );

  return (
    <div className="lg:min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label input-bordered flex flex-col items-start gap-2">
              <span className="text-base label-text">Username</span>
              <div className="flex items-center justify-between w-full relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70 absolute left-3"
                  aria-label="Username icon"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  required
                  type="text"
                  value={user.username}
                  placeholder="Username"
                  className="grow w-full input input-bordered h-10 pl-9"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  aria-label="Username"
                />
              </div>
            </label>
          </div>

          <div>
            <label className="label input-bordered flex flex-col items-start gap-2">
              <span className="text-base label-text">Password</span>
              <div className="flex items-center justify-between w-full relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70 absolute left-3"
                  aria-label="Password icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  required
                  type="password"
                  value={user.password}
                  placeholder="Password"
                  className="grow w-full input input-bordered h-10 pl-9"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  aria-label="Password"
                />
              </div>
            </label>
          </div>

          <p className="text-center my-2">
            Don't have an account?{" "}
            <Link to="/signup" className="link text-white">
              Signup
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
