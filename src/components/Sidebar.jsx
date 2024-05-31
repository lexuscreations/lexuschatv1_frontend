import React, {
  useRef,
  Suspense,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMessages } from "../redux/messageSlice";
import {
  setOtherUsers,
  setOnlineUsers,
  setSelectedUser,
} from "../redux/userSlice";

import { apiService } from "../api/api";
import { USER_SEARCH_ENDPOINT } from "../api/endpoints";
import {
  debounce,
  showNotification,
  playNotificationSound,
  getCurrentFormattedDateTime,
} from "../utils";

import avatarImage from "../assets/avatar.jpg";

import useGetOtherUsers from "../hooks/useGetOtherUsers";

import Loading from "./Loading";

const Sidebar = () => {
  useGetOtherUsers();

  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [OtherUsersComponent, setOtherUsersComponent] = useState(null);

  const socket = useSelector(({ socket }) => socket?.socket);
  const messages = useSelector(({ message }) => message?.messages);
  const {
    otherUsers = [],
    onlineUsers = [],
    selectedUser = {},
  } = useSelector(({ user }) => user) || {};

  const dispatch = useDispatch();

  const debouncedSearch = useRef(
    debounce(async (searchText) => {
      const response = await apiService.get(USER_SEARCH_ENDPOINT, {
        params: { searchText },
      });
      setSearchedUsers(response.data);
    }, 150)
  ).current;

  const onSearchUserClickHandler = useCallback(
    (user) => {
      setSearch("");
      setSearchedUsers([]);
      dispatch(setSelectedUser(user));
    },
    [dispatch]
  );

  const onSearchInputChange = useCallback(
    (e) => {
      e.preventDefault();
      const { value } = e.target;
      setSearch(value);
      value ? debouncedSearch(value) : setSearchedUsers([]);
    },
    [debouncedSearch]
  );

  const handleNewMessage = useCallback(
    (data = {}) => {
      const { newMessage = {}, sender = {} } = data;

      console.log("sender", sender);

      if (
        !(
          data &&
          Object.keys(data).length > 0 &&
          newMessage &&
          Object.keys(newMessage).length > 0 &&
          sender &&
          Object.keys(sender).length > 0
        )
      )
        return;

      const usersCopy = [...otherUsers].map((user) => ({ ...user }));
      const index = usersCopy.findIndex(
        ({ _id }) => _id === newMessage?.senderId
      );

      const newMsgCommData = {
        lastMessageSender: "partner",
        lastMessage: newMessage?.message,
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
          _id: sender?.senderId,
          fullName: sender?.fullName,
          username: sender?.username,
          profilePhoto: sender?.profilePhoto,
          ...newMsgCommData,
        });
      }

      dispatch(setOtherUsers(usersCopy));
      dispatch(setOnlineUsers([...onlineUsers, sender?.senderId]));
      showNotification(newMessage?.message || "");

      if (newMessage?.senderId !== selectedUser?._id)
        return playNotificationSound.msgReceive();

      const { _id, message, senderId, createdAt, updatedAt, receiverId } =
        newMessage;
      dispatch(
        setMessages([
          ...messages,
          {
            _id,
            message,
            senderId,
            createdAt,
            updatedAt,
            receiverId,
          },
        ])
      );
    },
    [dispatch, messages, otherUsers, selectedUser, onlineUsers]
  );

  useEffect(() => {
    if (socket) {
      socket?.on?.("newMessage", handleNewMessage);
      return () => socket?.off?.("newMessage", handleNewMessage);
    }
  }, [socket, handleNewMessage]);

  useEffect(() => {
    if (otherUsers.length > 0)
      import("./OtherUsers")
        .then((module) => setOtherUsersComponent(() => module.default))
        .catch((error) =>
          console.error("Failed to load OtherUsers component", error)
        );
  }, [otherUsers]);

  return (
    <div className="lg:border-r lg:border-[oklch(0.75 0.02 264.44)] p-4 flex flex-col w-auto lg:w-[22.5rem] relative">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={onSearchInputChange}
          className="input input-bordered rounded-md w-full dark:bg-[#2d2f43] dark:text-white bg-white text-black font-semibold"
        />
      </form>

      <div
        className="overflow-auto flex-1 searchResultsCont absolute top-20"
        style={{
          zIndex: 100,
          left: "calc(1rem / 2)",
          background: "#9191915e",
          width: "calc(100% - 1rem)",
          backdropFilter: "blur(1rem)",
        }}
      >
        {searchedUsers.map((user, index) => (
          <React.Fragment key={user._id}>
            <div
              onClick={() => onSearchUserClickHandler(user)}
              className="flex gap-2 items-center text-white dark:hover:text-white hover:text-black dark:bg-[#4c4f70] bg-[#91b6c7] dark:hover:bg-[#2d2f43] hover:bg-zinc-200 active:scale-95 rounded transition-all p-3 cursor-pointer"
            >
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={user?.profilePhoto || avatarImage} alt="user" />
                </div>
              </div>

              <div className="flex flex-col flex-1">
                {user?.fullName && (
                  <div className="flex justify-between gap-2 font-medium">
                    <p>{user?.fullName}</p>
                  </div>
                )}
              </div>
            </div>

            {searchedUsers.length - 1 !== index && (
              <div className="divider my-0 py-0 h-1"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="divider mt-0 mb-0"></div>

      {OtherUsersComponent && (
        <Suspense fallback={<Loading />}>
          <OtherUsersComponent otherUsers={otherUsers} />
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(Sidebar);
