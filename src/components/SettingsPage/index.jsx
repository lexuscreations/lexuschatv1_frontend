import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setIsSettingsPageOpen } from "../../redux/uiSlice";

import CloseBtn from "./CloseBtn";
import SettingListComp from "./SettingListComp";
import { settingsPrimaryKeySecondaryKeyTertiaryMap } from "./settingsConfig";

const SettingsPageContComp = () => {
  const [settingsPrimaryActiveKey, setSettingsPrimaryActiveKey] = useState("");
  const [settingsSecondaryActiveKey, setSettingsSecondaryActiveKey] =
    useState("");
  const [settingsTertiaryActiveKey, setSettingsTertiaryActiveKey] =
    useState(null);

  const dispatch = useDispatch();

  let settingsTertiaryActiveElObj;

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
