import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";

const Messages = React.memo(() => {
  useGetMessages();

  const messages = useSelector(({ message }) => message?.messages);

  const memoizedMessages = useMemo(
    () =>
      messages.map((message, ind) =>
        message ? (
          <Message key={`${message._id}_${ind}`} message={message} />
        ) : null
      ),
    [messages]
  );

  return (
    <div className="px-4 overflow-auto h-[17vh] md:h-full">
      {memoizedMessages}
    </div>
  );
});

export default Messages;
