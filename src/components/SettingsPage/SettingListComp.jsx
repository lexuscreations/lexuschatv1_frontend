import React from "react";
import classNames from "classnames";

const SettingListComp = ({ activeKey, dataToMap, onclickFn }) => (
  <div className="bg-gray-100">
    <ul>
      {dataToMap.map((el, ind) => (
        <li
          key={el.key || ind}
          onClick={() => (onclickFn ? onclickFn(el.key) : () => {})}
          className={classNames(
            "flex w-full items-center transition-all cursor-pointer hover:bg-gray-300 active:scale-[0.98] active:bg-gray-400",
            { "bg-gray-300": activeKey === el.key }
          )}
        >
          {el.Icon && <el.Icon className="h-full w-14 p-4 block" />}

          <div className="flex-1 flex flex-col">
            <b
              className={classNames({
                "p-4": !el.Icon && !el.description,
              })}
            >
              {el.label}
            </b>

            {el.description && <p>{el.description}</p>}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default SettingListComp;
