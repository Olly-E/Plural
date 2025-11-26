import { SearchNormal1 } from "iconsax-react";
import React, { useState } from "react";
import clsx from "clsx";

import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { Option } from "@/app/types";

interface ClinicModalProps {
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  handleClose: () => void;
  showSearchBar: boolean;
  modalOpen: boolean;
  handleChange: (value: string) => void;
  options: Option[];
  title: string;
}

const ClinicModal = ({
  showSearchBar,
  handleChange,
  modalOpen,
  modalRef,
  options,
  handleClose,
  title,
}: ClinicModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = options.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Modal
      variant="middle"
      className={clsx(
        "p-6 lg:max-w-[538px] mx-auto rounded-lg bg-blue-50 overflow-y-auto shadow-2xl "
      )}
      showDialog={modalOpen}
      closeModal={() => {}}
      modalRef={modalRef}
    >
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <Button
            onClick={handleClose}
            variant="close"
            className="text-primary!"
          ></Button>
        </div>
        {showSearchBar && (
          <div className="flex gap-4 mt-4 items-center w-full h-10 outline-none border border-gray-2 rounded-md pl-4 pr-2 bg-gray-250 ">
            <SearchNormal1 size={20} className="" color="#DFE2E9" />
            <input
              className="focus:border-0 outline-none text-[14px] w-full bg-transparent placeholder:text-gray-2"
              placeholder="Search clinic"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        <div className="mt-4">
          {filteredOptions.map((data) => {
            return (
              <button
                type="button"
                onClick={() => {
                  handleChange(data.name);
                  handleClose();
                }}
                key={data.id}
                className="text-black h-8 rounded-sm w-full mt-1 button-hover px-4 flex items-center"
              >
                {data.name}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ClinicModal;
