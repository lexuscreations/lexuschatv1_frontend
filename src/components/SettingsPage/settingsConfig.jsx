import { IoIosLock } from "react-icons/io";
import { HiMiniKey } from "react-icons/hi2";
import { BsChatDotsFill } from "react-icons/bs";
import { MdOutlineWallpaper } from "react-icons/md";

import SettingsModalPopup from "./SettingsModalPopup";

export const settingsPrimaryKeySecondaryKeyTertiaryMap = {
  primary: [
    {
      Icon: HiMiniKey,
      label: "Account",
      description: "Privacy",
      key: "settings_primary_account_key",
      secondary: [
        {
          Icon: IoIosLock,
          label: "Privacy",
          description: "Who can see...",
          key: "settings_primary_account_secondary_privacy_key",
          tertiary: [
            {
              Component: SettingsModalPopup,
              label: "Who can see me online",
              onsaveHandlerFn: (val) => alert(val),
              key: "settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeOnline",
              dropdownOptions: [
                {
                  key: "noone",
                  component: <div className="px-1">NoOne</div>,
                },
                {
                  key: "everyone",
                  component: <div className="px-1">Everyone</div>,
                },
              ],
            },
            {
              Component: SettingsModalPopup,
              label: "Who can see me typing...",
              key: "settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeTyping",
            },
            {
              Component: SettingsModalPopup,
              label: "Who can see my last seen",
              key: "settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyLastSeen",
            },
            {
              Component: SettingsModalPopup,
              label: "Who can see my profile pic",
              key: "settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyProfilePic",
            },
          ],
        },
      ],
    },
    {
      Icon: BsChatDotsFill,
      label: "Chat",
      description: "Wallpaper",
      key: "settings_primary_chat_key",
      secondary: [
        {
          Icon: MdOutlineWallpaper,
          label: "Wallpaper",
          description: "Color, Image, Custom",
          key: "settings_primary_chat_secondary_wallpaper_key",
          tertiary: [
            {
              Component: SettingsModalPopup,
              label: "Choose from default colors",
              onsaveHandlerFn: (val) => alert(val),
              key: "settings_primary_chat_secondary_wallpaper_tertiary_chooseFromDefaultColors",
              dropdownOptions: [
                "rosybrown",
                "silver",
                "azure",
                "red",
                "green",
                "blue",
              ].map((el, ind) => ({
                key: el,
                component: (
                  <div
                    key={`${el}_${ind}`}
                    style={{ backgroundColor: el }}
                    className="px-1 font-semibold capitalize hover:brightness-110"
                  >
                    {el}
                  </div>
                ),
              })),
            },
          ],
        },
      ],
    },
  ],
};
