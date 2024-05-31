import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { UI_config } from "../config";
import { deepObjFind, formatDateTime, isLink } from "../utils";

import avatarImage from "../assets/avatar.jpg";

const Message = ({ message }) => {
  const { authUser = {}, selectedUser = {} } =
    useSelector(({ user }) => user) || {};

  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const senderId = deepObjFind(message, "senderId");
  const updatedAt = formatDateTime(deepObjFind(message, "updatedAt"));
  const isSendersMsg = senderId === authUser?._id;
  const profilePhoto = isSendersMsg
    ? authUser?.profilePhoto
    : selectedUser?.profilePhoto;
  const chat_style_class = isSendersMsg ? "chat-end" : "chat-start";
  const username = isSendersMsg ? authUser.username : selectedUser.username;

  return message?.message ? (
    <div ref={scroll} className={`chat ${chat_style_class}`}>
      {UI_config.showUserProfileAvatarInChat && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="user" src={profilePhoto || avatarImage} />
          </div>
        </div>
      )}

      {username && <div className="chat-header text-gray-700">{username}</div>}

      <div
        className={classNames("chat-bubble", {
          "dark:bg-white dark:text-[#2d2f43] bg-[#2d2f43] text-white":
            senderId !== authUser?._id,
          "dark:bg-[#2d2f43] dark:text-white bg-white text-[#2d2f43]":
            senderId === authUser?._id,
        })}
      >
        {isLink(message?.message) ? (
          <a
            target="_blank"
            className="link break-all"
            rel="noreferrer"
            href={message?.message}
          >
            {message?.message}
          </a>
        ) : (
          <span className="break-words">{message?.message}</span>
        )}
      </div>

      {updatedAt && (
        <div className="chat-footer opacity-85">
          <time className="text-xs text-gray-700">{updatedAt}</time>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default React.memo(Message);
