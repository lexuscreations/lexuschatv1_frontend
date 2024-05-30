import React, { useState } from "react";

import Modal from "../Modal";
import Button from "./Button";
import SelectDropdown from "./SelectDropdown";

const SettingsModalPopup = ({
  label,
  onsave = () => {},
  onclose = () => {},
  dropdownOptions = [],
}) => {
  const [dropdownSelectEl, setDropdownSelectEl] = useState(null);

  return (
    <Modal>
      <div className="w-96 h-56 bg-white rounded-lg flex flex-col justify-between pt-3 pb-6 relative">
        <h1 className="ps-5 font-semibold text-lg">{label}</h1>

        <SelectDropdown
          dropdownOptions={dropdownOptions}
          dropdownSelectEl={dropdownSelectEl}
          setDropdownSelectEl={setDropdownSelectEl}
        />

        <div className="w-full flex justify-center items-center gap-3">
          <Button label="Cancel" onclick={onclose} />
          <Button
            label="Save"
            onclick={dropdownSelectEl && (() => onsave(dropdownSelectEl))}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModalPopup;
