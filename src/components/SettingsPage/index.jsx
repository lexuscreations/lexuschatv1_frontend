import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import {
  setChatBackground,
  setGlobalLoading,
  setIsSettingsPageOpen,
} from "../../redux/uiSlice";

import CloseBtn from "./CloseBtn";
import SettingListComp from "./SettingListComp";
import { initSettingsConfig, settingsConfigKeyMap } from "./settingsConfig";

const SettingsPageContComp = () => {
  const [settingsPrimaryActiveKey, setSettingsPrimaryActiveKey] = useState("");
  const [settingsSecondaryActiveKey, setSettingsSecondaryActiveKey] =
    useState("");
  const [settingsTertiaryActiveKey, setSettingsTertiaryActiveKey] =
    useState(null);

  const dispatch = useDispatch();

  let settingsTertiaryActiveElObj;

  const handlersFns = useMemo(
    () => ({
      [settingsConfigKeyMap.primary.settings_primary_account_key.key]: {
        [settingsConfigKeyMap.primary.settings_primary_account_key.secondary
          .settings_primary_account_secondary_privacy_key.key]: {
          [settingsConfigKeyMap.primary.settings_primary_account_key.secondary
            .settings_primary_account_secondary_privacy_key.tertiary
            .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeOnline
            .key]: {
            onsaveHandlerFn: (val) => alert(val),
          },
          [settingsConfigKeyMap.primary.settings_primary_account_key.secondary
            .settings_primary_account_secondary_privacy_key.tertiary
            .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMeTyping
            .key]: {
            onsaveHandlerFn: (val) => alert(val),
          },
          [settingsConfigKeyMap.primary.settings_primary_account_key.secondary
            .settings_primary_account_secondary_privacy_key.tertiary
            .settings_primary_account_secondary_privacy_tertiary_whoCanSeeMyProfilePic
            .key]: {
            onsaveHandlerFn: (val) => alert(val),
          },
        },
      },
      [settingsConfigKeyMap.primary.settings_primary_chat_key.key]: {
        [settingsConfigKeyMap.primary.settings_primary_chat_key.secondary
          .settings_primary_chat_secondary_wallpaper_key.key]: {
          [settingsConfigKeyMap.primary.settings_primary_chat_key.secondary
            .settings_primary_chat_secondary_wallpaper_key.tertiary
            .settings_primary_chat_secondary_wallpaper_tertiary_chooseFromDefaultColors
            .key]: {
            onsaveHandlerFn: async (val) => {
              try {
                dispatch(setGlobalLoading(true));
                // api call here only
                setSettingsTertiaryActiveKey(null);
                // if response === ok then only set chatBackground
                dispatch(setChatBackground(val));
              } catch (error) {
                console.error(
                  `Error while updating chatBackground: ${error.message}`
                );
              } finally {
                dispatch(setGlobalLoading(false));
              }
            },
          },
          [settingsConfigKeyMap.primary.settings_primary_chat_key.secondary
            .settings_primary_chat_secondary_theme_key.tertiary
            .settings_primary_chat_secondary_theme_tertiary_chooseAppTheme.key]:
            {
              onsaveHandlerFn: (val) => {
                if (val === "dark") {
                  document.querySelector("body").classList.remove("light");
                  document.querySelector("body").classList.add("dark");
                } else if (val === "light") {
                  document.querySelector("body").classList.remove("dark");
                  document.querySelector("body").classList.add("light");
                } else {
                  document.querySelector("body").classList.remove("dark");
                  document.querySelector("body").classList.remove("light");

                  document
                    .querySelector("body")
                    .classList.add(
                      window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light"
                    );
                }

                setSettingsTertiaryActiveKey(null);
              },
            },
        },
      },
    }),
    [dispatch]
  );

  const settingsPrimaryKeySecondaryKeyTertiaryMap = useMemo(
    () => initSettingsConfig(handlersFns),
    [handlersFns]
  );

  if (
    settingsPrimaryActiveKey &&
    settingsSecondaryActiveKey &&
    settingsTertiaryActiveKey
  ) {
    settingsTertiaryActiveElObj =
      settingsPrimaryKeySecondaryKeyTertiaryMap.primary
        .find((el) => el.key === settingsPrimaryActiveKey)
        .secondary.find((el) => el.key === settingsSecondaryActiveKey)
        .tertiary.find((el) => el.key === settingsTertiaryActiveKey);
  }

  if (
    settingsTertiaryActiveElObj &&
    Array.isArray(settingsTertiaryActiveElObj.dropdownOptions) &&
    settingsTertiaryActiveElObj.dropdownOptions.length > 0
  ) {
    const { Component, label, onsaveHandlerFn, dropdownOptions } =
      settingsTertiaryActiveElObj;

    return (
      <Component
        label={label}
        onsave={onsaveHandlerFn}
        dropdownOptions={dropdownOptions}
        onclose={() => setSettingsTertiaryActiveKey(null)}
      />
    );
  }

  return (
    <div className="w-full h-full flex-1">
      <div className="w-full h-full flex-1 grid lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 gap-1">
        <SettingListComp
          activeKey={settingsPrimaryActiveKey}
          dataToMap={settingsPrimaryKeySecondaryKeyTertiaryMap.primary}
          onclickFn={(val) => {
            setSettingsSecondaryActiveKey("");
            setSettingsPrimaryActiveKey(val);
          }}
        />

        {settingsPrimaryActiveKey && (
          <SettingListComp
            activeKey={settingsSecondaryActiveKey}
            onclickFn={setSettingsSecondaryActiveKey}
            dataToMap={
              settingsPrimaryKeySecondaryKeyTertiaryMap.primary.find(
                (el) => el.key === settingsPrimaryActiveKey
              ).secondary
            }
          />
        )}

        {settingsSecondaryActiveKey && (
          <SettingListComp
            activeKey={settingsTertiaryActiveKey}
            onclickFn={setSettingsTertiaryActiveKey}
            dataToMap={
              settingsPrimaryKeySecondaryKeyTertiaryMap.primary
                .find((el) => el.key === settingsPrimaryActiveKey)
                .secondary.find((el) => el.key === settingsSecondaryActiveKey)
                .tertiary
            }
          />
        )}
      </div>

      <CloseBtn onclick={() => dispatch(setIsSettingsPageOpen(false))} />
    </div>
  );
};

export default SettingsPageContComp;
