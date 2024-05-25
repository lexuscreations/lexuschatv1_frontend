import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";

import { setGlobalLoading } from "../redux/uiSlice";
import { setMessages } from "../redux/messageSlice";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;

        dispatch(setGlobalLoading(true));

        const res =
          (await axios.get(`${BASE_URL}/api/v1/user/conversational_users`, {
            signal,
          })) || {};

        dispatch(setOtherUsers(res.data || []));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error?.response?.data?.message || "");
          if (error.response.data.type) {
            navigate("/login");
            dispatch(setAuthUser(null));
            dispatch(setMessages([]));
            dispatch(setOtherUsers([]));
            dispatch(setSelectedUser(null));
          }
        } else if (error.request) {
          toast.error("Network error: Unable to reach the server.");
        } else {
          toast.error(
            `An error occurred while processing your request. "${
              error?.message || ""
            }"`
          );
        }
        console.error(error);
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    fetchOtherUsers();

    return () => {
      abortController.abort();
    };
  }, [dispatch, navigate]);
};

export default useGetOtherUsers;
