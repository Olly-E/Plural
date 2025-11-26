import React, { ReactElement } from "react";
import clsx from "clsx";

// --- Type Definitions ---

type Option = {
  id: string;
  name: string;
  tag?: "button" | "link";
  href?: string;
  icon?: ReactElement;
};

type GroupedOption = {
  category: string;
  option: Option[];
};

export const CategorizedDropdown = ({
  options,
  setSelectedId,
  setIsComponentVisible,
  selectedDropDownRef,
  isDropdownAloneVisible,
  hoverClassName = "hover:bg-primary/10",
}: {
  options: GroupedOption[];
  setSelectedId: React.Dispatch<React.SetStateAction<Option | null>>;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDropDownRef: React.RefObject<HTMLDivElement | null>;
  isDropdownAloneVisible: boolean;
  hoverClassName?: string;
}) => {
  const handleSelectOption = (selected: Option) => {
    if (setSelectedId) {
      setSelectedId(selected);
    }
    setIsComponentVisible(false);
  };

  return (
    <div
      className={clsx(
        "mt-9 text-black min-w-60 bg-white border border-gray-200 shadow-xl overflow-y-auto rounded-lg absolute right-0 top-2 font-normal z-500 left-0",
        isDropdownAloneVisible ? "block" : "hidden"
      )}
      ref={selectedDropDownRef}
      style={{ maxHeight: "400px" }}
    >
      {options.map((group, groupIndex) => (
        <div key={group.category}>
          <div
            className={clsx(
              "px-4 pt-3 pb-1 text-xs flex items-center gap-1 font-semibold capitalize text-gray-1 select-none",
              groupIndex > 0 ? "mt-2" : ""
            )}
          >
            <p className="whitespace-nowrap">{group.category}</p>
            <div className="border-t border-gray-100 w-full h-px"></div>
          </div>

          {group.option.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleSelectOption(item)}
              className="block text-sm w-full group text-start whitespace-nowrap black"
            >
              <div
                className={clsx(
                  "flex items-center gap-2 py-2 w-full px-4 transition-colors",
                  hoverClassName
                )}
              >
                {item.icon && <div className="min-w-6">{item.icon}</div>}
                <p className="w-full text-sm">{item.name}</p>
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
