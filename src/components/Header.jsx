import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { CgMoreVertical } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

import { apiService, axios } from "../api/api";
import { setMessages } from "../redux/messageSlice";
import { USER_LOGOUT_ENDPOINT } from "../api/endpoints";
import { setGlobalLoading, setIsSettingsPageOpen } from "../redux/uiSlice";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";

import avatarImage from "../assets/avatar.jpg";

const Header = () => {
  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false);

  const authUser = useSelector((store) => store?.user?.authUser) || {};

  const actionDropdownRef = useRef(null);

  const { fullName, profilePhoto, username } = authUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    try {
      dispatch(setGlobalLoading(true));

      const res = await apiService.get(USER_LOGOUT_ENDPOINT);

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
    dispatch(setIsSettingsPageOpen(true));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionDropdownRef.current &&
        !actionDropdownRef.current.contains(event.target)
      )
        setIsActionDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full lg:w-9/12 rounded-lg flex gap-2 items-center dark:bg-[#2d2f43] bg-white dark:text-white text-black px-4 py-2 mb-2">
      <div className={`avatar online`}>
        <div className="w-12 rounded-full">
          <img src={profilePhoto || avatarImage} alt="user" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        {fullName && (
          <div className="flex justify-between gap-2 font-medium">
            <p>{fullName}</p>
          </div>
        )}
      </div>

      <div className="dropdown dropdown-end">
        <div
          role="button"
          tabIndex={0}
          className="btn btn-circle btn-ghost btn-xs text-info transition-all hover:brightness-75 hover:scale-105 flex items-center"
        >
          <svg
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
          style={{ boxShadow: "rgb(0 0 0 / 45%) 0px 0px 11px 0px" }}
          className="card compact dropdown-content z-[1] rounded-box w-auto mt-2 dark:bg-[#2d2f43] bg-white dark:text-white text-black"
        >
          <div className="card-body text-gray-500 font-bold flex flex-row">
            <h2>Username:</h2>
            <p>{username}</p>
          </div>
        </div>
      </div>

      <div
        ref={actionDropdownRef}
        className={classNames(
          { "dropdown-close": !isActionDropdownOpen },
          "dropdown dropdown-end cursor-pointer pb-[0.5rem] top-[0.3rem]"
        )}
      >
        <CgMoreVertical
          tabIndex={0}
          onClick={() => setIsActionDropdownOpen(true)}
          className="cursor-pointer m-1 transition-all hover:brightness-75 hover:scale-105 active:scale-95"
        />

        <ul
          style={{ boxShadow: "rgb(0 0 0 / 45%) 0px 0px 11px 0px" }}
          className="dropdown-content z-[1] menu p-2 shadow w-auto rounded-box text-nowrap mt-[0.3rem] dark:bg-[#2d2f43] bg-white dark:text-white text-black"
        >
          <li>
            <button
              onClick={() => {
                setIsActionDropdownOpen(false);
                settingsHandler();
              }}
              className="btn btn-sm dark:bg-[#28293b] dark:border-none"
            >
              Settings
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setIsActionDropdownOpen(false);
                logoutHandler();
              }}
              className="btn btn-sm dark:bg-[#28293b] dark:border-none"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
