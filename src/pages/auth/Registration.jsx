import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { apiService } from "../../api/api";
import { USER_REGISTER_ENDPOINT } from "../../api/endpoints";

const userSignUpFormInitialValues = {
  fullName: "",
  username: "",
  password: "",
  gender: "male",
  confirmPassword: "",
};

const showError = (message = "") => toast.error(message);

const isValidUser = (user = {}) => {
  const { fullName, username, password, confirmPassword } = user;

  if (!fullName) showError("Please enter your full name.");
  else if (!username) showError("Please enter a username.");
  else if (!password) showError("Please enter a password.");
  else if (!confirmPassword) showError("Please confirm your password.");
  else if (password !== confirmPassword) showError("Passwords do not match.");

  return Boolean(
    fullName &&
      username &&
      password &&
      confirmPassword &&
      password === confirmPassword
  );
};

const Registration = () => {
  const [user, setUser] = useState(userSignUpFormInitialValues);

  const navigate = useNavigate();

  const handleCheckbox = (gender) => gender && setUser({ ...user, gender });

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      if (!isValidUser(user)) return;

      try {
        const res = await apiService.post(USER_REGISTER_ENDPOINT, user);

        if (!(res && res.data && res.data.success))
          throw new Error("Invalid response format");

        navigate("/login");
        toast.success(res?.data?.message || "");
      } catch (error) {
        if (
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
        setUser(userSignUpFormInitialValues);
      }
    },
    [user, navigate]
  );

  return (
    <div className="lg:min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg text-black shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label input-bordered flex flex-col items-start gap-2">
              <span className="text-base label-text text-black">Full Name</span>
              <div className="flex items-center justify-between w-full relative dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70 absolute left-3"
                  aria-label="Full Name icon"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  required
                  type="text"
                  value={user.fullName}
                  placeholder="Full Name"
                  className="grow w-full input input-bordered h-10 pl-9 bg-white dark:bg-[#2d2f43] font-semibold"
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  aria-label="Full Name"
                />
              </div>
            </label>
          </div>

          <div>
            <label className="label input-bordered flex flex-col items-start gap-2">
              <span className="text-base label-text text-black">Username</span>
              <div className="flex items-center justify-between w-full relative dark:text-white">
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
                  className="grow w-full input input-bordered h-10 pl-9 bg-white dark:bg-[#2d2f43] font-semibold"
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
              <span className="text-base label-text text-black">Password</span>
              <div className="flex items-center justify-between w-full relative dark:text-white">
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
                  className="grow w-full input input-bordered h-10 pl-9 bg-white dark:bg-[#2d2f43] font-semibold"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  aria-label="Password"
                />
              </div>
            </label>
          </div>

          <div>
            <label className="label input-bordered flex flex-col items-start gap-2">
              <span className="text-base label-text text-black">
                Confirm Password
              </span>
              <div className="flex items-center justify-between w-full relative dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70 absolute left-3"
                  aria-label="Confirm Password icon"
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
                  value={user.confirmPassword}
                  placeholder="Confirm Password"
                  className="grow w-full input input-bordered h-10 pl-9 bg-white dark:bg-[#2d2f43] font-semibold"
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  aria-label="Confirm Password"
                />
              </div>
            </label>
          </div>

          <div className="flex items-center my-4">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-black">Male</span>
                <input
                  required
                  type="radio"
                  name="radio-gender"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                  className="radio mx-2 checked:bg-[#626973]"
                  aria-label="Male"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-black">Female</span>
                <input
                  required
                  type="radio"
                  name="radio-gender"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                  className="radio mx-2 checked:bg-[#626973] border-gray-600"
                  aria-label="Female"
                />
              </label>
            </div>
          </div>

          <p className="text-center my-2">
            Already have an account?{" "}
            <Link to="/login" className="link text-white">
              Login
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700 bg-gray-50 hover:bg-gray-100 dark:bg-[#2d2f43] dark:hover:bg-slate-900"
              aria-label="Signup"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
