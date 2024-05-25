import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Messages from "./Messages";
import SendInput from "./SendInput";

import { setSelectedUser } from "../redux/userSlice";

import avatarImage from "../assets/avatar.jpg";

const MessageContainer = () => {
  const [isTyping, setIsTyping] = useState(false);

  const socket = useSelector(({ socket }) => socket?.socket);
  const chatBackgroundImage =
    useSelector((store) => store?.ui?.chatBackgroundImage) || "";
  const {
    authUser = {},
    onlineUsers = [],
    selectedUser = null,
  } = useSelector((store) => store?.user) || {};

  const dispatch = useDispatch();

  const isOnline = useCallback(
    (userId) => onlineUsers?.includes?.(userId),
    [onlineUsers]
  );

  const handleCloseChatClick = useCallback(
    () => dispatch(setSelectedUser(null)),
    [dispatch]
  );

  const userFullName = useMemo(() => selectedUser?.fullName, [selectedUser]);

  const showOnlineStatus = true;

  const handleTypingChangeEvent = useCallback(
    (data = {}) =>
      selectedUser?._id === data.senderId &&
      setIsTyping(data?.isTyping || false),
    [selectedUser]
  );

  useEffect(() => {
    socket?.on?.("typing", handleTypingChangeEvent);

    return () => {
      socket?.off?.("typing", handleTypingChangeEvent);
    };
  }, [socket, handleTypingChangeEvent]);

  return selectedUser ? (
    <div
      className="flex flex-col flex-1 chatBackground"
      style={
        chatBackgroundImage
          ? {
              backgroundImage: `URL(https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/${chatBackgroundImage})`,
            }
          : {}
      }
    >
      <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
        <div
          className={`avatar ${
            showOnlineStatus && isOnline(selectedUser._id) && "online"
          }`}
        >
          <div className="w-12 rounded-full">
            <img src={selectedUser?.profilePhoto || avatarImage} alt="user" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          {userFullName && (
            <div className="flex justify-between gap-2">
              <p>{userFullName}</p>
            </div>
          )}
          <div className="italic text-sm tracking-wider">
            {isTyping
              ? "Typing..."
              : showOnlineStatus &&
                (isOnline(selectedUser._id) ? "Online" : "Offline")}
          </div>
        </div>

        <button
          className="btn btn-circle min-w-8 min-h-8 h-8 w-8 hover:brightness-90"
          onClick={handleCloseChatClick}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <Messages />
      <SendInput />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-[38.5vh] md:h-auto w-full">
      <h1 className="text-4xl text-white font-bold">
        Hi, {authUser?.fullName}
      </h1>
      <h1 className="text-2xl text-white">Let's start a conversation</h1>
    </div>
  );
};

export default React.memo(MessageContainer);
