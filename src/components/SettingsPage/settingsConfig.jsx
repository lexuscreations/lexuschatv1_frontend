import { IoIosLock } from "react-icons/io";
import { HiMiniKey } from "react-icons/hi2";
import { BsChatDotsFill } from "react-icons/bs";
import { RiPaintBrushLine } from "react-icons/ri";
import { MdOutlineWallpaper } from "react-icons/md";

import SettingsModalPopup from "./SettingsModalPopup";

export const settingsConfigKeyMap = {
  primary: {
    settings_primary_account_key: {
      key: "settings_primary_account_key",
      secondary: {
        settings_primary_account_secondary_privacy_key: {
          key: "settings_primary_account_secondary_privacy_key",
          tertiary: {
            settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeOnline:
              {
                key: "settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeOnline",
              },
            settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeTyping:
              {
                key: "settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeTyping",
              },
            settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyLastSeen:
              {
                key: "settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyLastSeen",
              },
            settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyProfilePic:
              {
                key: "settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyProfilePic",
              },
          },
        },
      },
    },
    settings_primary_chat_key: {
      key: "settings_primary_chat_key",
      secondary: {
        settings_primary_chat_secondary_wallpaper_key: {
          key: "settings_primary_chat_secondary_wallpaper_key",
          tertiary: {
            settings_primary_chat_secondary_wallpaper_tertiary_chooseFromDefaultColors:
              {
                key: "settings_primary_chat_secondary_wallpaper_tertiary_chooseFromDefaultColors",
              },
          },
        },
        settings_primary_chat_secondary_theme_key: {
          key: "settings_primary_chat_secondary_theme_key",
          tertiary: {
            settings_primary_chat_secondary_theme_tertiary_chooseAppTheme: {
              key: "settings_primary_chat_secondary_theme_tertiary_chooseAppTheme",
            },
          },
        },
      },
    },
  },
};

export const initSettingsConfig = (handlersFns) => ({
  primary: [
    {
      Icon: HiMiniKey,
      label: "Account",
      description: "Privacy",
      key: settingsConfigKeyMap.primary.settings_primary_account_key.key,
      secondary: [
        {
          Icon: IoIosLock,
          label: "Privacy",
          description: "Who can see...",
          key: settingsConfigKeyMap.primary.settings_primary_account_key
            .secondary.settings_primary_account_secondary_privacy_key.key,
          tertiary: [
            {
              Component: SettingsModalPopup,
              label: "Who can see me online",
              onsaveHandlerFn:
                handlersFns.settings_primary_account_key
                  .settings_primary_account_secondary_privacy_key
                  .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeOnline
                  .onsaveHandlerFn,
              key: settingsConfigKeyMap.primary.settings_primary_account_key
                .secondary.settings_primary_account_secondary_privacy_key
                .tertiary
                .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeOnline
                .key,
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
              onsaveHandlerFn:
                handlersFns.settings_primary_account_key
                  .settings_primary_account_secondary_privacy_key
                  .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeTyping
                  .onsaveHandlerFn,
              key: settingsConfigKeyMap.primary.settings_primary_account_key
                .secondary.settings_primary_account_secondary_privacy_key
                .tertiary
                .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeTyping
                .key,
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
              label: "Who can see my last seen",
              key: settingsConfigKeyMap.primary.settings_primary_account_key
                .secondary.settings_primary_account_secondary_privacy_key
                .tertiary
                .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyLastSeen
                .key,
            },
            {
              Component: SettingsModalPopup,
              label: "Who can see my profile pic",
              onsaveHandlerFn:
                handlersFns.settings_primary_account_key
                  .settings_primary_account_secondary_privacy_key
                  .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyProfilePic
                  .onsaveHandlerFn,
              key: settingsConfigKeyMap.primary.settings_primary_account_key
                .secondary.settings_primary_account_secondary_privacy_key
                .tertiary
                .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyProfilePic
                .key,
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
          ],
        },
      ],
    },
    {
      Icon: BsChatDotsFill,
      label: "Chat",
      description: "Wallpaper, Theme",
      key: settingsConfigKeyMap.primary.settings_primary_chat_key.key,
      secondary: [
        {
          Icon: MdOutlineWallpaper,
          label: "Wallpaper",
          description: "Color, Image, Custom",
          key: settingsConfigKeyMap.primary.settings_primary_chat_key.secondary
            .settings_primary_chat_secondary_wallpaper_key.key,
          tertiary: [
            {
              Component: SettingsModalPopup,
              label: "Choose from default colors",
              onsaveHandlerFn:
                handlersFns.settings_primary_chat_key
                  .settings_primary_chat_secondary_wallpaper_key
                  .settings_primary_chat_secondary_wallpaper_tertiary_chooseFromDefaultColors
                  .onsaveHandlerFn,
              key: settingsConfigKeyMap.primary.settings_primary_chat_key
                .secondary.settings_primary_chat_secondary_wallpaper_key
                .tertiary
                .settings_primary_chat_secondary_wallpaper_tertiary_chooseFromDefaultColors
                .key,
              dropdownOptions: [
                "rosybrown",
                "silver",
                "azure",
                "red",
                "green",
                "blue",
                "translucent",
              ].map((el, ind) => ({
                key: el,
                component: (
                  <div
                    key={`${el}_${ind}`}
                    className="px-1 grid grid-cols-2 hover:brightness-110"
                  >
                    <div className="font-semibold capitalize text-black dark:text-white">
                      {el}
                    </div>
                    <div style={{ backgroundColor: el }}></div>
                  </div>
                ),
              })),
            },
          ],
        },
        {
          Icon: RiPaintBrushLine,
          label: "Theme",
          description: "Default System, Dark, Light",
          key: settingsConfigKeyMap.primary.settings_primary_chat_key.secondary
            .settings_primary_chat_secondary_theme_key.key,
          tertiary: [
            {
              Component: SettingsModalPopup,
              label: "Choose app theme",
              onsaveHandlerFn:
                handlersFns.settings_primary_chat_key
                  .settings_primary_chat_secondary_wallpaper_key
                  .settings_primary_chat_secondary_theme_tertiary_chooseAppTheme
                  .onsaveHandlerFn,
              key: settingsConfigKeyMap.primary.settings_primary_chat_key
                .secondary.settings_primary_chat_secondary_theme_key.tertiary
                .settings_primary_chat_secondary_theme_tertiary_chooseAppTheme
                .key,
              dropdownOptions: ["system default", "dark", "light"].map(
                (el, ind) => ({
                  key: el,
                  component: (
                    <div
                      key={`${el}_${ind}`}
                      className="px-1 grid grid-cols-2 hover:brightness-110 font-semibold capitalize text-black dark:text-white whitespace-nowrap"
                    >
                      {el}
                    </div>
                  ),
                })
              ),
            },
          ],
        },
      ],
    },
  ],
});
