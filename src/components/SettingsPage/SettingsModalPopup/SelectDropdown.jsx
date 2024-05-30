import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const SelectDropdown = ({
  dropdownOptions,
  dropdownSelectEl,
  setDropdownSelectEl,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="flex justify-center items-center flex-col w-52 m-auto select-none"
    >
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer border pe-1 rounded absolute w-52 m-auto top-1/3"
      >
        <span className="font-medium" style={{ width: "90.5%" }}>
          {(dropdownSelectEl &&
            dropdownOptions?.find((el) => el.key === dropdownSelectEl)
              ?.component) || <span className="ps-1">Select</span>}
        </span>
        {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      <ul
        className={classNames(
          { hidden: !isDropdownOpen },
          "border rounded absolute w-52 m-auto top-[6.25rem] max-h-16 overflow-auto"
        )}
      >
        {dropdownOptions?.map((el, ind) => (
          <React.Fragment key={`${el.key}_${ind}`}>
            <li
              className="cursor-pointer hover:bg-gray-100 transition-all"
              onClick={() => {
                setIsDropdownOpen(false);
                setDropdownSelectEl(el.key);
              }}
            >
              {el.component}
            </li>

            {dropdownOptions.length - 1 !== ind && (
              <div className="h-[0.1rem] w-full bg-gray-400"></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default SelectDropdown;
