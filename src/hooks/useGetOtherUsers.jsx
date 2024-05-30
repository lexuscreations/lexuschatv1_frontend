import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setGlobalLoading } from "../redux/uiSlice";
import { setMessages } from "../redux/messageSlice";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";

import { apiService, axios } from "../api/api";
import { GET_USER_CONVERSATIONAL_USERS_ENDPOINTS } from "../api/endpoints";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchOtherUsers = async () => {
      try {
        dispatch(setGlobalLoading(true));

        const res =
          (await apiService.get(GET_USER_CONVERSATIONAL_USERS_ENDPOINTS, {
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
