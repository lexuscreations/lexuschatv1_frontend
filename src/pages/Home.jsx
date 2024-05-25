import React, { lazy, useMemo, Suspense, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setChatBackgroundImage, setSettingsPageOpen } from "../redux/uiSlice";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));
const Loading = lazy(() => import("../components/Loading"));
const Sidebar = lazy(() => import("../components/Sidebar"));
const MessageContainer = lazy(() => import("../components/MessageContainer"));

const HomePage = () => {
  const authUser = useSelector((store) => store?.user?.authUser);
  const { settingsPageOpen, chatBackgroundImage } =
    useSelector((store) => store?.ui) || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSetChatBackgroundImage = useCallback(() => {
    dispatch(setChatBackgroundImage("MainBefore.jpg"));
  }, [dispatch]);

  const handleRemoveChatBackgroundImage = useCallback(() => {
    dispatch(setChatBackgroundImage());
  }, [dispatch]);

  const handleCloseSettingsPage = useCallback(() => {
    dispatch(setSettingsPageOpen(false));
  }, [dispatch]);

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [navigate, authUser]);

  const headerMemo = useMemo(
    () => (
      <Suspense fallback={<Loading />}>
        <Header />
      </Suspense>
    ),
    []
  );

  const footerMemo = useMemo(
    () => (
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    ),
    []
  );

  const sidebarMemo = useMemo(
    () => (
      <Suspense fallback={<Loading />}>
        <Sidebar />
      </Suspense>
    ),
    []
  );

  const messageContainerMemo = useMemo(
    () => (
      <Suspense fallback={<Loading />}>
        <MessageContainer />
      </Suspense>
    ),
    []
  );

  const settingsContent = useMemo(
    () => (
      <div
        className="relative flex flex-col md:flex-row md:h-[450px] w-full md:w-9/12 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"
        style={{ background: "#eeeeee4d" }}
      >
        {!chatBackgroundImage ? (
          <div onClick={handleSetChatBackgroundImage}>
            add-background-image-to-chat
          </div>
        ) : (
          <div onClick={handleRemoveChatBackgroundImage}>
            remove-chat-background-image
          </div>
        )}
        <button
          className="btn btn-circle min-w-8 min-h-8 h-8 w-8 hover:brightness-90 absolute top-4 right-4"
          onClick={handleCloseSettingsPage}
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
    ),
    [
      chatBackgroundImage,
      handleSetChatBackgroundImage,
      handleRemoveChatBackgroundImage,
      handleCloseSettingsPage,
    ]
  );

  const mainContent = useMemo(
    () => (
      <div
        className="relative flex flex-col md:flex-row md:h-[450px] w-full md:w-9/12 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"
        style={{ background: "#eeeeee4d" }}
      >
        {sidebarMemo}
        {messageContainerMemo}
        <Suspense fallback={<Loading />}>
          <Loading />
        </Suspense>
      </div>
    ),
    [sidebarMemo, messageContainerMemo]
  );

  return (
    <div className="flex-1 w-full h-full flex items-center flex-col justify-center">
      {headerMemo}
      {!settingsPageOpen ? mainContent : settingsContent}
      {footerMemo}
    </div>
  );
};

export default HomePage;
