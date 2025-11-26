"use client";
import { ArrowDownWideNarrow, ChevronDown } from "lucide-react";
import React from "react";

import { useComponentVisible } from "@/app/hooks/useComponentVisible";
import { DropdownAlone } from "@/app/components/DropdownAlone";
import Pagination from "@/app/components/Pagination";
import { Option } from "../../../types";
import { CategorizedDropdown } from "@/app/components/CategorizedDropdown";

const PatientTableToolBar = () => {
  const OPTIONS = [
    {
      name: "All clinics",
      id: "all",
    },
    {
      name: "Accident and Emergency",
      id: "accidents-and-emergency",
    },
    {
      name: "Neurology",
      id: "neurology",
    },
    {
      name: "Cardiology",
      id: "cardiology",
    },
  ];

  const SORT_BY_OPTIONS = [
    {
      category: "Patient name",
      option: [
        {
          name: "Patient name: A-Z",
          id: "Patient name: A-Z",
        },
        {
          name: "Patient name: Z-A",
          id: "Patient name: Z-A",
        },
      ],
    },
    {
      category: "Patient ID",
      option: [
        {
          name: "Patient ID: Ascending",
          id: "Patient ID: Ascending",
        },
        {
          name: "Patient ID: Descending",
          id: "Patient ID: Descending",
        },
      ],
    },
    {
      category: "Age",
      option: [
        {
          name: "Age: Youngest",
          id: "Age: Youngest",
        },
        {
          name: "Age: Oldest",
          id: "Age: Oldest",
        },
      ],
    },
    {
      category: "Gender",
      option: [
        {
          name: "Gender: Female",
          id: "Gender: Female",
        },
        {
          name: "Gender: Male",
          id: "Gender: Male",
        },
      ],
    },
    {
      category: "Time/Date",
      option: [
        {
          name: "Time/Date: Latest",
          id: "Time/Date: Latest",
        },
        {
          name: "Time/Date: Oldest",
          id: "Time/Date: Oldest",
        },
      ],
    },
    {
      category: "Status",
      option: [
        {
          name: "Status: A-Z",
          id: "Status: A-Z",
        },
        {
          name: "Status: Z-A",
          id: "Status: Z-A",
        },
      ],
    },
  ];
  const [selected, setSelected] = React.useState<Option | null>({
    name: OPTIONS[0].name,
    id: OPTIONS[0].id,
  });
  const [sortBy, setSortBy] = React.useState<Option | null>(null);

  const {
    ref,
    dropDownButtonRef,
    handleClickOnDropDownButton,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible();
  const {
    ref: sortByRef,
    dropDownButtonRef: sortByButtonRef,
    handleClickOnDropDownButton: handleClickSortBy,
    isComponentVisible: isSortByVisible,
    setIsComponentVisible: setSortByVisible,
  } = useComponentVisible();
  return (
    <div className="flex items-center gap-16 px-8 h-8 mt-6 justify-between">
      <div className="flex items-center gap-16 font-bold text-[18px]">
        <p className="text-black">Appointments</p>
        <div className="z-3 w-full flex justify-end">
          <div className="relative z-500">
            <button
              ref={dropDownButtonRef}
              onClick={handleClickOnDropDownButton}
              type="button"
              className="flex button-hover px-4 py-2 rounded-md items-center gap-2.5 text-base"
            >
              {selected?.name}
              <ChevronDown size={15} color="var(--color-primary)" />
            </button>
            <DropdownAlone
              option={OPTIONS}
              setSelectedId={setSelected}
              isDropdownAloneVisible={isComponentVisible}
              setIsComponentVisible={setIsComponentVisible}
              selectedDropDownRef={ref}
              className="left-0 bg-white z-500 top-2 font-normal"
              colorButtons={true}
            />
          </div>
        </div>
        <div className="z-3 flex justify-end">
          <div className="relative z-500">
            <button
              ref={sortByButtonRef}
              onClick={handleClickSortBy}
              type="button"
              className="flex items-center button-hover px-4 py-2 rounded-md whitespace-nowrap gap-2.5 text-base"
            >
              <ArrowDownWideNarrow size={18} color="var(--color-primary)" />
              {sortBy?.name || "Sort by"}
            </button>
            <CategorizedDropdown
              options={SORT_BY_OPTIONS}
              setSelectedId={setSortBy}
              isDropdownAloneVisible={isSortByVisible}
              setIsComponentVisible={setSortByVisible}
              selectedDropDownRef={sortByRef}
            />
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default PatientTableToolBar;
