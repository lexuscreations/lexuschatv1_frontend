import React, { lazy, useMemo, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));
const Loading = lazy(() => import("../components/Loading"));
const Sidebar = lazy(() => import("../components/Sidebar"));
const MessageContainer = lazy(() => import("../components/MessageContainer"));
const SettingsPageContComp = lazy(() => import("../components/SettingsPage"));

const CompWithPageContainerCommon = ({ children }) => (
  <div
    className="relative flex flex-col lg:flex-row h-full lg:h-[450px] overflow-hidden w-full lg:w-9/12 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"
    style={{ background: "#eeeeee4d" }}
  >
    {children}
  </div>
);

const HomePage = () => {
  const authUser = useSelector((store) => store?.user?.authUser);
  const { isSettingsPageOpen } = useSelector((store) => store?.ui) || {};

  const navigate = useNavigate();

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

  const settingsPageMemo = useMemo(
    () => (
      <CompWithPageContainerCommon>
        <Suspense fallback={<Loading />}>
          <SettingsPageContComp />
        </Suspense>
      </CompWithPageContainerCommon>
    ),
    []
  );

  const mainContent = useMemo(
    () => (
      <CompWithPageContainerCommon>
        {sidebarMemo}
        {messageContainerMemo}
      </CompWithPageContainerCommon>
    ),
    [sidebarMemo, messageContainerMemo]
  );

  return (
    <div className="flex-1 w-full h-full flex items-center flex-col justify-center">
      {headerMemo}
      {!isSettingsPageOpen ? mainContent : settingsPageMemo}
      <Loading />
      {footerMemo}
    </div>
  );
};

export default HomePage;
