import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { BASE_URL } from "../config";

import { setMessages } from "../redux/messageSlice";
import { setGlobalLoading } from "../redux/uiSlice";

const useGetMessages = () => {
  const selectedUser = useSelector((store) => store?.user?.selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchMessages = async () => {
      try {
        dispatch(setGlobalLoading(true));
        axios.defaults.withCredentials = true;
        const res =
          (await axios.get(`${BASE_URL}/api/v1/message/${selectedUser?._id}`, {
            signal,
          })) || {};
        dispatch(setMessages(res.data || []));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    selectedUser?._id && fetchMessages();

    return () => {
      abortController.abort?.();
      dispatch(setGlobalLoading(false));
    };
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
