import moment from "moment";

export const isLink = (text = "") => /(https?:\/\/[^\s]+)/.test(text);

export const debounce = (func = () => {}, delay = 150) => {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => func.apply(this, arguments), delay);
  };
};

export const formatDateTime = (dateTimeStr = "") =>
  `${moment(new Date(dateTimeStr)).format("YYYY-MM-DD")} ${moment(
    new Date(dateTimeStr)
  ).format("hh:mm A")}`;

export const getCurrentFormattedDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  return `${year}-${month}-${day} ${formattedTime}`;
};

const createNotification = (bodyMessage = "") => {
  const notification = new Notification(
    `LexusChat_v1 - Notification (${getCurrentFormattedDateTime()})`,
    {
      body: bodyMessage,
      icon: "/favicon.ico",
    }
  );

  setTimeout(notification.close.bind(notification), 5000);
};

export const showNotification = (bodyMessage = "") => {
  if (Notification.permission === "granted") createNotification(bodyMessage);
  else if (Notification.permission !== "denied")
    Notification.requestPermission().then(
      (result) => result === "granted" && createNotification(bodyMessage)
    );
};

export const playNotificationSound = {
  msgSent: async () => {
    try {
      const audio = new Audio();
      audio.src = "/msg_sent.mp3";
      await audio.play();
    } catch (error) {
      console.error(error);
    }
  },
  msgReceive: async () => {
    try {
      const audio = new Audio();
      audio.src = "/msg_receive.mp3";
      await audio.play();
    } catch (error) {
      console.error(error);
    }
  },
};

export const deepObjFind = (obj, key) => {
  if (typeof key !== "string" || key === "") return null;

  const stack = [obj];

  while (stack.length > 0) {
    const obj = stack.pop();

    if (obj === null || typeof obj !== "object") continue;

    const keys = Object.keys(obj);
    for (const k of keys) {
      if (k === key) {
        return obj[k];
      } else if (typeof obj[k] === "object") {
        stack.push(obj[k]);
      }
    }
  }

  return null;
};
