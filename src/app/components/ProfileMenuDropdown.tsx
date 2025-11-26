import clsx from "clsx";
import { useComponentVisible } from "../hooks/useComponentVisible";
import { Avatar } from "./Avatar";
import Link from "next/link";

import {
  Calendar,
  CircleStar,
  CircleUserRound,
  FileX,
  Power,
  PowerCircle,
  ThumbsUp,
  Upload,
  UserRound,
  UsersRound,
} from "lucide-react";
import { MessageSquare, User } from "iconsax-react";

export const ProfileMenuDropdown = () => {
  const {
    ref,
    dropDownButtonRef,
    handleClickOnDropDownButton,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible();

  const PROFILE_LINKS = [
    {
      name: "Profile",
      icon: CircleUserRound,
      action: () => console.log("Navigating to Profile"),
    },
    {
      name: "Switch role",
      icon: UsersRound,
      action: () => console.log("Switching role"),
    },
    {
      name: "Messages",
      icon: MessageSquare,
      action: () => console.log("Checking Messages"),
    },
    {
      name: "Upload paper records",
      icon: Upload,
      action: () => console.log("Opening upload utility"),
    },
    {
      name: "Review paper records",
      icon: CircleStar,
      action: () => console.log("Starting record review"),
    },
    {
      name: "View rejected paper records",
      icon: FileX,
      action: () => console.log("Viewing rejected records"),
    },
    {
      name: "Calendar",
      icon: Calendar,
      action: () => console.log("Opening Calendar"),
    },
    {
      name: "Give feedback",
      icon: ThumbsUp,
      action: () => console.log("Submitting feedback"),
    },
  ];

  const firstName = "Gbenga";
  const lastName = "Arakanmi";
  const role = "Front Desk Analyst";

  return (
    <div className="">
      <button
        className="text-left"
        ref={dropDownButtonRef}
        onClick={handleClickOnDropDownButton}
      >
        <div className="centered bg-gray-1 rounded-full size-8 min-w-8">
          <User variant="Bold" color="#FFFFFF" size={16} />
        </div>
      </button>

      <div ref={ref} className="absolute top-[55px] z-30 right-[30px] -mt-2.5">
        <div
          className={clsx(
            "rounded-lg transition-all overflow-hidden bg-white w-[400px] text-black shadow-lg min-w-56",
            isComponentVisible
              ? "max-h-[535px] border border-gray-2"
              : "max-h-0 pt-0 pb-0"
          )}
        >
          <div className="px-5">
            <div className="flex items-center justify-between gap-6 w-full border-b mb-5 border-b-gray-2">
              <div className="flex items-center gap-3 py-4 ">
                <div className="centered bg-gray-1 rounded-full size-8 min-w-8">
                  <User variant="Bold" color="#FFFFFF" size={16} />
                </div>
                <div>
                  <p className="text-tertiary text-base">Gbenga Arakanmi</p>
                  <p className="text-black text-base">Front Desk Analyst</p>
                </div>
              </div>
              <p className="text-sm px-2 py-1 rounded-[5px] text-tertiary bg-[#EFF1F4]">
                Primary
              </p>
            </div>
          </div>
          {PROFILE_LINKS.map((link, index) => {
            return (
              <Link
                href="#"
                onClick={() => setIsComponentVisible(false)}
                key={link.name}
                className={clsx(
                  "text-black transition-colors h-10 px-5 w-full flex items-center gap-4 hover:bg-primary-light",
                  index > 0 && "mt-2"
                )}
              >
                <link.icon color="#051438" size={20} />
                {link.name}
              </Link>
            );
          })}
          <button
            type="button"
            className="hover:bg-red-state/10 h-10 w-full transition-colors text-left items-center flex gap-4 text-red-state  px-6"
          >
            <Power size={20} /> <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};
