"use client";

import React, { ReactElement } from "react";
import clsx from "clsx";
import Link from "next/link";

type Option = {
  id: string;
  name: string;
  tag?: "button" | "link";
  href?: string;
  icon?: ReactElement;
};

interface DropdownAloneProp {
  option: Option[];
  hoverClassName?: string;
  hoverColorHex?: string;
  setSelectedId?: React.Dispatch<React.SetStateAction<Option | null>>;
  className?: string;
  isDropdownAloneVisible: boolean;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDropDownRef?: React.RefObject<HTMLDivElement | null>;
  colorButtons?: boolean;
  handleLinkClick?: () => void;
}

export const DropdownAlone = ({
  option,
  className = "right-6",
  setSelectedId,
  isDropdownAloneVisible,
  setIsComponentVisible,
  selectedDropDownRef,
  hoverClassName = "hover:bg-primary/10 hover:text-primary",
  hoverColorHex,
  colorButtons = false,
  handleLinkClick,
}: DropdownAloneProp) => {
  const handleSelectOption = (selected: Option) => {
    if (setSelectedId) {
      setSelectedId(selected);
    }
    setIsComponentVisible(false);
  };

  const customStyle = hoverColorHex
    ? ({
        "--hover-bg": hoverColorHex,
        "--hover-text": "#051438",
      } as React.CSSProperties)
    : undefined;

  const computedHoverClass = hoverColorHex
    ? "hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)]"
    : hoverClassName;

  const handleLinkOnClick = () => {
    if (handleLinkClick) {
      handleLinkClick();
      setIsComponentVisible(false);
    } else setIsComponentVisible(false);
  };
  return (
    <div
      className={clsx(
        "mt-9 text-black min-w-[181px] bg-black border border-white/10 overflow-y-auto bg-white-2 rounded-[15px] absolute",
        className,
        isDropdownAloneVisible ? "block" : "hidden"
      )}
      ref={selectedDropDownRef}
      style={customStyle}
    >
      {option.map((item, index) => {
        const isLink = !!item.href;

        const baseClasses = clsx(
          "block flex items-center text-sm w-full group text-start whitespace-nowrap",
          index > 0 && "border-t border-t-white/10",
          colorButtons
            ? item.id === "events"
              ? "text-purple-state"
              : item.id === "stays"
                ? "text-pinkRed-state"
                : item.id === "fleet"
                  ? "text-blue-state"
                  : item.id === "logout"
                    ? "text-primary"
                    : ""
            : "text-white"
        );

        const content = (
          <div
            className={clsx(
              "flex items-center gap-2 py-2 w-full px-6 transition-colors",
              computedHoverClass
            )}
          >
            {item.icon && <div className="min-w-6">{item.icon}</div>}
            <p className="w-full text-sm">{item.name}</p>
          </div>
        );

        return isLink ? (
          <Link
            key={item.id}
            href={item.href!}
            className={baseClasses}
            onClick={handleLinkOnClick}
          >
            {content}
          </Link>
        ) : (
          <button
            type="button"
            key={item.id}
            onClick={() => handleSelectOption(item)}
            className={baseClasses}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};


