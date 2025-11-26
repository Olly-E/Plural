"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProfileMenuDropdown } from "../components/ProfileMenuDropdown";

import logo from "../../../public/logo.svg";

export const DashboardHeader = () => {
  return (
    <header className="px-8 h-12 border-b-2 border-b-gray-2 bg-secondary flex items-center justify-between select-none bg-white-state w-full">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          style={{ width: "76.7px", height: "auto" }}
        />
      </Link>
      <p className="text-[18px] text-primary font-bold">
        22 September{" "}
        <span className="text-tertiary font-semibold"> 09:34 AM</span>
      </p>
      <div className="flex items-center justify-center gap-6">
        <p className="text-[18px] text-primary font-bold">Hi Mr Daniel</p>
        <button
          className="w-10 min-w-10 aspect-square centered"
          type="button"
        >
          <Bell
            size={20}
            fill="var(--color-primary)"
            className=""
            color="var(--color-primary)"
          />
        </button>
        <ProfileMenuDropdown />
      </div>
    </header>
  );
};
