import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formatDateTime } from "../utils";

import { setSelectedUser } from "../redux/userSlice";

import avatarImage from "../assets/avatar.jpg";

const OtherUser = ({ user = {}, isOnline }) => {
  const [isTyping, setIsTyping] = useState(false);

  const socket = useSelector(({ socket }) => socket?.socket);
  const selectedUser = useSelector((store) => store?.user?.selectedUser) || {};

  const dispatch = useDispatch();

  const selectedUserHandler = useCallback(
    (user) => dispatch(setSelectedUser(user)),
    [dispatch]
  );

  const isThisSelectedUser = selectedUser?._id === user?._id;

  const isNewMessageUnreadWithCount = 0;

  const showOnlineStatus = true;

  const handleTypingChangeEvent = useCallback(
    (data = {}) =>
      !isThisSelectedUser &&
      data?.senderId === user?._id &&
      setIsTyping(data?.isTyping || false),
    [user, isThisSelectedUser]
  );

  useEffect(() => {
    socket?.on?.("typing", handleTypingChangeEvent);

    return () => {
      socket?.off?.("typing", handleTypingChangeEvent);
    };
  }, [socket, handleTypingChangeEvent]);

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          isThisSelectedUser
            ? "bg-zinc-200 dark:bg-[#1f2131] dark:text-white text-black"
            : "text-white"
        } flex gap-2 dark:hover:text-white hover:text-black items-center active:scale-95 dark:hover:bg-[#2d2f43] hover:bg-zinc-100 rounded-s transition-all p-2 cursor-pointer overflow-x-auto`}
      >
        <div
          className={`avatar ${
            showOnlineStatus && (isOnline ? "online" : "offline")
          }`}
        >
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto || avatarImage} alt="user" />
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <div className="flex justify-between items-center flex-1">
            {user?.fullName && (
              <p
                className="text-nowrap text-ellipsis overflow-hidden w-full lg:w-16 xl:w-auto font-medium"
                title={user?.fullName}
              >
                {user?.fullName}
              </p>
            )}

            {isNewMessageUnreadWithCount > 0 && (
              <div className="h-5 w-5 flex text-[0.7rem] font-medium justify-center items-center text-white bg-green-700 rounded-full border-gray-500 border">
                {isNewMessageUnreadWithCount}
              </div>
            )}
          </div>
          {isTyping ? (
            <div className="italic text-sm tracking-wider my-0.5">
              Typing...
            </div>
          ) : (
            <div className="flex justify-between items-center flex-1">
              {user?.lastMessage && (
                <p
                  className="text-nowrap text-ellipsis overflow-hidden w-20 lg:w-16 xl:w-24"
                  title={user?.lastMessage}
                >
                  {`${user?.lastMessageSender === "self" ? "You: " : ""}${
                    user?.lastMessage
                  }`}
                </p>
              )}

              {user?.lastMessageTime && (
                <p
                  className="text-nowrap text-ellipsis overflow-hidden w-auto lg:w-16 xl:w-auto"
                  title={formatDateTime(user?.lastMessageTime)}
                >
                  {formatDateTime(user?.lastMessageTime)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default React.memo(OtherUser);
