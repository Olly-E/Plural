"use client";
import { CalendarAdd } from "iconsax-react";
import { ChangeEvent, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PatientRegistrationModal from "../features/dashboard/components/modals/NewPatientModal";
import NewAppointmentModal from "../features/dashboard/components/modals/NewAppointmentModal";
import DashboardSearchInput from "../features/dashboard/components/DashboardSearchInput";
import PatientTableToolBar from "../features/dashboard/components/PatientTableToolBar";
import { filterPatientsByKeyword } from "../features/dashboard/utils/utils";
import PatientsTable from "../features/dashboard/components/PatientTable";
import { useComponentVisible } from "../hooks/useComponentVisible";
import { useDebounce } from "../hooks/useDebounce";
import { PATIENTS_DATA } from "../utils/data";
import { Button } from "../components/Button";

const DashboardPage = () => {
  const {
    ref: registerModalRef,
    isComponentVisible: registerModalVisible,
    handleClickOnDropDownButton: handleAddNewPatients,
    handleCloseDropDown,
  } = useComponentVisible();

  const {
    ref: appointmentModalRef,
    isComponentVisible: appointmentModalVisible,
    handleClickOnDropDownButton: handleAddNewAppointment,
    handleCloseDropDown: handleCloseAppointmentModal,
  } = useComponentVisible();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredPatients = useMemo(() => {
    return filterPatientsByKeyword({
      patients: PATIENTS_DATA,
      keyword: searchTerm,
    });
  }, [searchTerm]);

  useDebounce(
    () => {
      setSearchTerm(searchKeyword);
    },
    400,
    [searchKeyword]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div>
      <div className="w-[600px] mx-auto">
        <DashboardSearchInput handleSearch={handleSearch} />
      </div>
      <div className="flex justify-between gap-10 px-8 mt-2">
        <Button onClick={handleAddNewPatients} className="px-4!">
          Add new patients
          <div className="centered rounded-full bg-white size-4 min-w-4">
            <Plus color="#0B0C7D" size={17} />
          </div>
        </Button>
        <Button className="px-4!" onClick={handleAddNewAppointment}>
          Create appointment
          <CalendarAdd color="#FFFFFF" variant="Bold" size={16} />
        </Button>
      </div>
      <PatientTableToolBar />
      <PatientsTable filteredPatients={filteredPatients} />
      <PatientRegistrationModal
        handleClose={handleCloseDropDown}
        modalOpen={registerModalVisible}
        modalRef={registerModalRef}
      />
      <NewAppointmentModal
        handleClose={handleCloseAppointmentModal}
        modalOpen={appointmentModalVisible}
        modalRef={appointmentModalRef}
      />
    </div>
  );
};

export default DashboardPage;
