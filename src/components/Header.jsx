import React, { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CgMoreVertical } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../config";
import { setMessages } from "../redux/messageSlice";
import { setGlobalLoading, setSettingsPageOpen } from "../redux/uiSlice";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";

import avatarImage from "../assets/avatar.jpg";

const Header = () => {
  const authUser = useSelector((store) => store?.user?.authUser) || {};

  const { fullName, profilePhoto, username } = authUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    try {
      dispatch(setGlobalLoading(true));

      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);

      navigate("/login");

      toast.success(res.data.message || "");

      dispatch(setAuthUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled:", error.message);
      } else if (error.response) {
      } else if (error.request) {
        console.error(error.request);
        toast.error("Network error: Unable to reach the server.");
      } else {
        console.error("Error", error.message);
      }
    } finally {
      dispatch(setGlobalLoading(false));
    }
  }, [dispatch, navigate]);

  const settingsHandler = useCallback(() => {
    dispatch(setSettingsPageOpen(true));
  }, [dispatch]);

  return (
    <div className="w-full md:w-9/12 rounded-lg flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
      <div className={`avatar online`}>
        <div className="w-12 rounded-full">
          <img src={profilePhoto || avatarImage} alt="user" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        {fullName && (
          <div className="flex justify-between gap-2">
            <p>{fullName}</p>
          </div>
        )}
      </div>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-ghost btn-xs text-info transition-all hover:scale-105 flex items-center"
        >
          <svg
            tabIndex={0}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 stroke-current"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <div
          tabIndex={0}
          className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-auto mt-2"
        >
          <div
            tabIndex={0}
            className="card-body text-gray-500 font-bold flex flex-row"
          >
            <h2>Username:</h2>
            <p>{username}</p>
          </div>
        </div>
      </div>

      <div className="dropdown dropdown-hover dropdown-close dropdown-end cursor-pointer pb-[0.5rem] top-[0.3rem]">
        <CgMoreVertical
          tabIndex={0}
          className="cursor-pointer m-1 transition-all hover:scale-110 active:scale-95"
        />

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-black w-auto rounded-box text-nowrap mt-[0.3rem]"
        >
          <li>
            <button onClick={settingsHandler} className="btn btn-sm">
              Settings
            </button>
          </li>

          <li>
            <button onClick={logoutHandler} className="btn btn-sm">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;