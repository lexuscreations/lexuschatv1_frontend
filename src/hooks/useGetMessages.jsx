import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiService } from "../api/api";
import { GET_MESSAGE_OF_USER_ENDPOINT } from "../api/endpoints";

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
        const res =
          (await apiService.get(
            GET_MESSAGE_OF_USER_ENDPOINT(selectedUser?._id),
            {
              signal,
            }
          )) || {};
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
