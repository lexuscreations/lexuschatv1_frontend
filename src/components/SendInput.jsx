import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setMessages } from "../redux/messageSlice";
import { setGlobalLoading } from "../redux/uiSlice";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";

import { BASE_URL } from "../config";
import { getCurrentFormattedDateTime, playNotificationSound } from "../utils";

const messageFieldStateInitialValues = "";

const isValidMessage = (msg = "") => msg.trim() !== "";

const SendInput = React.memo(() => {
  const [message, setMessage] = useState(messageFieldStateInitialValues);
  const msgInpRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const socket = useSelector(({ socket }) => socket?.socket);
  const messages = useSelector(({ message }) => message?.messages);
  const { otherUsers = [], selectedUser = {} } =
    useSelector((store) => store?.user) || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleError = useCallback(
    (error) => {
      if (error && error.response && error.response?.data?.message) {
        toast.error(error.response.data.message);
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
    },
    [navigate, dispatch]
  );

  const handleSendFormOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!isValidMessage(message)) return toast.error("Type a valid message");

      const URL = `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`;
      const postData = { message };

      const config = {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      };

      try {
        dispatch(setGlobalLoading(true));

        const res = await axios.post(URL, postData, config);

        if (!(res && res.data && res.data.newMessage))
          throw new Error("Invalid response format");

        const usersCopy = [...otherUsers];
        const index = usersCopy.findIndex(
          (user) => user._id === selectedUser._id
        );

        const newMsgCommData = {
          lastMessage: message,
          lastMessageSender: "self",
          lastMessageTime: getCurrentFormattedDateTime(),
        };

        if (index > -1) {
          usersCopy[index] = {
            ...usersCopy[index],
            ...newMsgCommData,
          };
          usersCopy.unshift(usersCopy.splice(index, 1)[0]);
        } else {
          usersCopy.unshift({
            _id: selectedUser._id,
            fullName: selectedUser.fullName,
            profilePhoto: selectedUser.profilePhoto,
            ...newMsgCommData,
          });
        }

        dispatch(setOtherUsers(usersCopy));
        dispatch(setMessages([...(messages || []), res.data.newMessage]));
        playNotificationSound.msgSent();
      } catch (error) {
        handleError(error);
      } finally {
        dispatch(setGlobalLoading(false));
        setMessage(messageFieldStateInitialValues);
      }
    },
    [message, selectedUser, otherUsers, messages, dispatch, handleError]
  );

  const handleTyping = useCallback(() => {
    socket?.emit?.("typing", {
      receiverId: selectedUser._id,
      isTyping: true,
    });

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit?.("typing", {
        receiverId: selectedUser._id,
        isTyping: false,
      });
    }, 500);
  }, [socket, selectedUser._id]);

  useEffect(() => {
    handleTyping();

    const timeoutRef = typingTimeoutRef.current;
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [message, handleTyping]);

  useEffect(() => {
    setMessage("");
    msgInpRef.current?.focus?.();
  }, [selectedUser]);

  return (
    <form onSubmit={handleSendFormOnSubmit} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          ref={msgInpRef}
          value={message}
          placeholder="Send a message..."
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
        />

        {message && (
          <button
            type="submit"
            className="absolute flex inset-y-0 end-0 items-center px-4 transition-all text-white hover:text-gray-200 active:scale-90"
          >
            <IoSend />
          </button>
        )}
      </div>
    </form>
  );
});

export default SendInput;
