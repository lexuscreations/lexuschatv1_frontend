import React, { useEffect, useReducer, useCallback } from "react";
import { MdSpeed } from "react-icons/md";
import { ImConnection } from "react-icons/im";
import { TbCloudDataConnection } from "react-icons/tb";

import { apiService } from "../api/api";
import { PING_ENDPOINT } from "../api/endpoints";
import { imgUrlToTestInternetSpeed } from "../config";

const isPingSuccess = async (signal) => {
  try {
    const response = await apiService.get(PING_ENDPOINT, { signal });
    return response.ok;
  } catch (error) {
    return false;
  }
};

const initialState = {
  internetSpeed: "Unknown",
  internetStatus: navigator.onLine ? "Online" : "Offline",
  connectionStatus: "Connecting...",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INTERNET_SPEED":
      return { ...state, internetSpeed: action.payload };
    case "SET_INTERNET_STATUS":
      return { ...state, internetStatus: action.payload };
    case "SET_CONNECTION_STATUS":
      return { ...state, connectionStatus: action.payload };
    default:
      return state;
  }
};

const Footer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkInternetSpeed = useCallback(() => {
    const img = new Image();
    const startTime = performance.now();
    img.onload = () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      const speed =
        duration < 50 ? "Rapid" : duration < 100 ? "Standard" : "Gradual";
      dispatch({ type: "SET_INTERNET_SPEED", payload: speed });
    };
    img.src = imgUrlToTestInternetSpeed;
  }, [dispatch]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let timeIntervalId;

    const init = async () => {
      window.addEventListener("online", () =>
        dispatch({ type: "SET_INTERNET_STATUS", payload: "Online" })
      );
      window.addEventListener("offline", () =>
        dispatch({ type: "SET_INTERNET_STATUS", payload: "Offline" })
      );

      checkInternetSpeed();

      const status = await isPingSuccess(signal);
      dispatch({
        type: "SET_CONNECTION_STATUS",
        payload: status ? "Connected" : "Disconnected",
      });

      timeIntervalId = setInterval(async () => {
        const status = await isPingSuccess(signal);
        dispatch({
          type: "SET_CONNECTION_STATUS",
          payload: status ? "Connected" : "Disconnected",
        });
      }, 8000);
    };

    init();

    return () => {
      clearInterval(timeIntervalId);

      window.removeEventListener("online", () =>
        dispatch({ type: "SET_INTERNET_STATUS", payload: "Online" })
      );

      window.removeEventListener("offline", () =>
        dispatch({ type: "SET_INTERNET_STATUS", payload: "Offline" })
      );

      abortController.abort?.();
    };
  }, [checkInternetSpeed]);

  const { internetSpeed, internetStatus, connectionStatus } = state;

  return (
    <div className="w-full lg:w-9/12 rounded-lg flex gap-2 overflow-x-auto items-center bg-zinc-800 text-white px-4 py-2 mt-2 min-h-11">
      <div
        className="flex items-center transition-all select-none hover:bg-gray-700/65 px-1.5 rounded-lg"
        title="Speed"
      >
        <MdSpeed />
        &nbsp;&nbsp;{internetSpeed}
      </div>

      <span>|</span>

      <div
        className="flex items-center transition-all select-none hover:bg-gray-700/65 px-1.5 rounded-lg"
        title="Status"
      >
        <ImConnection />
        &nbsp;&nbsp;
        <span
          className={`inline-flex items-center ${
            internetStatus === "Online" ? "bg-green-600/80" : "bg-red-600/80"
          } text-gray-100 text-xs font-medium px-2.5 py-0.5 rounded-full`}
        >
          <span
            className={`w-2 h-2 me-1 ${
              internetStatus === "Online" ? "bg-green-900" : "bg-red-900"
            } rounded-full`}
          ></span>
          {internetStatus}
        </span>
      </div>

      <span>|</span>

      <div
        className="flex items-center transition-all select-none hover:bg-gray-700/65 px-1.5 rounded-lg"
        title="Server, Refresh tab if experiencing issues."
      >
        <TbCloudDataConnection />
        &nbsp;&nbsp;{connectionStatus}
      </div>
    </div>
  );
};

export default Footer;
