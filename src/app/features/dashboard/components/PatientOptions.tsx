import { DropdownAlone } from "@/app/components/DropdownAlone";
import { useComponentVisible } from "@/app/hooks/useComponentVisible";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import { Option } from "../../../types";

const PatientOptions = () => {
  const {
    ref,
    dropDownButtonRef,
    handleClickOnDropDownButton,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible();

  const OPTIONS = [
    {
      name: "Create appointment",
      id: "create-appointment",
    },
    {
      name: "Create invoice",
      id: "create-invoice",
    },
    {
      name: "View patient profile",
      id: "view-patient-profile",
    },
    {
      name: "View next of kin",
      id: "view-next-of-kin",
    },
    {
      name: "Add demographic info",
      id: "add-demographic-info",
    },
    {
      name: "Update insurance details",
      id: "update-insurance-details",
    },
    {
      name: "Scan paper records",
      id: "scan-paper-records",
    },
  ];

  const [selected, setSelected] = React.useState<Option | null>({
    name: OPTIONS[0].name,
    id: OPTIONS[0].id,
  });
  return (
    <div className="">
      <div className="relative">
        <button
          ref={dropDownButtonRef}
          onClick={handleClickOnDropDownButton}
          type="button"
          className="flex button-hover size-10 hover:bg-gray-1 transition-colors centered rounded-md items-center gap-2.5 text-base"
        >
          <EllipsisVertical size={15} color="var(--color-primary)" />
        </button>
        <DropdownAlone
          option={OPTIONS}
          setSelectedId={setSelected}
          isDropdownAloneVisible={isComponentVisible}
          setIsComponentVisible={setIsComponentVisible}
          selectedDropDownRef={ref}
          className="right-8 -top-6 bg-white"
          colorButtons={true}
          hoverColorHex="#E7E7FC"
        />
      </div>
    </div>
  );
};

export default PatientOptions;
