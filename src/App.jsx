import { useEffect, useMemo, useCallback, useRef, Suspense, lazy } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { BASE_URL } from "./config";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import ErrorBoundary from "./components/ErrorBoundary";

import Loading from "./components/Loading";

const HomePage = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Registration = lazy(() => import("./pages/auth/Registration"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<Loading loading />}>
          <HomePage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: "/signup",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<Loading loading />}>
          <Registration />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: "/login",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<Loading loading />}>
          <Login />
        </Suspense>
      </ErrorBoundary>
    ),
  },
]);

const App = () => {
  const authUser = useSelector((store) => store?.user?.authUser);

  const dispatch = useDispatch();
  const socketRef = useRef(null);

  const handleOnlineUsers = useCallback(
    (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    },
    [dispatch]
  );

  useEffect(() => {
    if (authUser) {
      const socketIo = io(BASE_URL, { query: { userId: authUser._id } });

      if (socketIo) {
        socketRef.current = socketIo;
        dispatch(setSocket(socketIo));

        socketIo.on?.("getOnlineUsers", handleOnlineUsers);

        return () => {
          socketIo.off?.("getOnlineUsers", handleOnlineUsers);
          socketIo.close?.();
          socketRef.current = null;
        };
      }
    } else if (socketRef.current) {
      socketRef.current.close?.();
      dispatch(setSocket(null));
      socketRef.current = null;
    }
  }, [authUser, dispatch, handleOnlineUsers]);

  const memoizedRouter = useMemo(() => router, []);

  return (
    <div className="p-4 h-screen flex items-center flex-col justify-center">
      <RouterProvider router={memoizedRouter} />
    </div>
  );
};

export default App;
