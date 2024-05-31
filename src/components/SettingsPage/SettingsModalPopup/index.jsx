import React, { useCallback, useRef, useState } from "react";

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

  const dropdownRef = useRef(null);

  const handleSaveClick = useCallback(() => {
    if (dropdownSelectEl) onsave(dropdownSelectEl);
    else dropdownRef.current && dropdownRef.current.focus();
  }, [dropdownSelectEl, onsave]);

  return (
    <Modal>
      <div className="w-96 h-56 bg-white dark:bg-[#2d2f43] rounded-lg flex flex-col justify-between pt-3 pb-6 relative text-black dark:text-white">
        <h1 className="ps-5 font-semibold text-lg">{label}</h1>

        <SelectDropdown
          ref={dropdownRef}
          dropdownOptions={dropdownOptions}
          dropdownSelectEl={dropdownSelectEl}
          setDropdownSelectEl={setDropdownSelectEl}
        />

        <div className="w-full flex justify-center items-center gap-3">
          <Button label="Cancel" onclick={onclose} />
          <Button label="Save" onclick={handleSaveClick} />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModalPopup;
