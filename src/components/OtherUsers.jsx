import React from "react";
import { useSelector } from "react-redux";

import OtherUser from "./OtherUser";

const OtherUsers = ({ otherUsers = [] }) => {
  const onlineUsers = useSelector(({ user }) => user?.onlineUsers) || [];

  return (
    <div className="overflow-auto min-h-[8.5rem] max-h-[11rem] lg:max-h-full">
      {otherUsers?.map?.((user = {}) => (
        <OtherUser
          user={user}
          key={user?._id}
          isOnline={(Array.isArray(onlineUsers) ? onlineUsers : []).includes(
            user._id
          )}
        />
      ))}
    </div>
  );
};

export default React.memo(OtherUsers);
