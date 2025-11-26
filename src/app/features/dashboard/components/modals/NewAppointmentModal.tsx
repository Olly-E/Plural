import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import clsx from "clsx";

import {
  addNewPatientSchema,
  AddNewPatientType,
} from "../../utils/validationSchema";
import { useComponentVisible } from "@/app/hooks/useComponentVisible";
import DashboardSearchInput from "../DashboardSearchInput";
import { getFormattedDate } from "@/app/utils/utils";
import { EMPTY_OPTION } from "@/app/utils/constants";
import { CalendarPicker } from "../CalendarPick";
import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { ChevronRight } from "lucide-react";
import ClinicModal from "./ClinicModal";

interface NewAppointmentModalProps {
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  handleClose: () => void;
  modalOpen: boolean;
}

const CLINIC_OPTIONS = [
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
  {
    name: "Renal",
    id: "renal",
  },
  {
    name: "Gastroenterology",
    id: "Gastroenterology",
  },
];
const APPOINTMENT_TYPES = [
  {
    name: "[New] Work-in",
    id: "new-work-in",
  },
  {
    name: "[New] Referral",
    id: "new-referral",
  },
  {
    name: "[New] Consult",
    id: "new-consult",
  },
  {
    name: "Follow up",
    id: "follow-up",
  },
  {
    name: "For Medical Exams",
    id: "for-medical-exams",
  },
];

const NewAppointmentModal = ({
  modalOpen,
  handleClose,
}: NewAppointmentModalProps) => {
  const { handleSubmit } = useForm<AddNewPatientType>({
    resolver: zodResolver(addNewPatientSchema),
    defaultValues: {
      isNewPatient: true,
      patientId: "HOSP98765433",
      gender: EMPTY_OPTION,
      title: EMPTY_OPTION,
    },
  });

  const onSubmit: SubmitHandler<AddNewPatientType> = (data) => {
    console.log("Form Submitted:", data);
    handleClose();
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [time, setTime] = React.useState("");
  const [clinic, setClinic] = React.useState<null | string>(null);
  const [type, setType] = React.useState<null | string>(null);

  const handleChangeClinic = (value: string) => {
    setClinic(value);
  };

  const handleChangeType = (value: string) => {
    setType(value);
  };

  const formattedDate = getFormattedDate(selectedDate);
  const {
    ref: clinicTypeRef,
    isComponentVisible: clinicTypeVisible,
    handleClickOnDropDownButton: handleViewClinicType,
    handleCloseDropDown: handleCloseClinicTypes,
    dropDownButtonRef: handleViewClinicTypesRef,
  } = useComponentVisible();

  const {
    ref: appointmentTypeRef,
    isComponentVisible: appointmentTypeVisible,
    handleClickOnDropDownButton: handleViewAppointmentType,
    handleCloseDropDown: handleCloseAppointmentType,
    dropDownButtonRef: appointmentButtonTypeRef,
  } = useComponentVisible();

  return (
    <div className="">
      <Modal
        variant="middle"
        className={clsx(
          "  lg:max-w-[716px] max-h-[700px] mx-auto rounded-lg bg-blue-50 overflow-y-auto shadow-2xl "
        )}
        showDialog={modalOpen}
        closeModal={() => {}}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col"
        >
          <div className="px-10 pt-10 pb-5  rounded-t-lg">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Add new appointment
                </h2>
              </div>
              <Button
                onClick={handleClose}
                variant="close"
                className="text-primary!"
              ></Button>
            </div>
            <DashboardSearchInput handleSearch={() => {}} />
            <button
              type="button"
              onClick={handleViewClinicType}
              ref={handleViewClinicTypesRef}
              className="flex w-full items-center gap-10 group transition-all duration-150 justify-between mt-2 py-2 border-b border-b-[#CDD8F3]"
            >
              <p className="text-tertiary">Clinic</p>
              <p className="flex items-center gap-2 text-black ">
                {clinic || "Clinic"}{" "}
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-all duration-150"
                />
              </p>
            </button>
            <button
              onClick={handleViewAppointmentType}
              ref={appointmentButtonTypeRef}
              className="flex w-full items-center gap-10 group transition-all duration-150 justify-between mt-2 py-2 border-b border-b-[#CDD8F3]"
            >
              <p className="text-tertiary">Title</p>
              <p className="flex items-center gap-2 text-black ">
                {type || "Appointment type"}{" "}
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-all duration-150"
                />
              </p>
            </button>
            <div className="flex w-full items-center gap-10 group transition-all duration-150 justify-between mt-2 py-2 ">
              <p className="text-tertiary">Time</p>
              <p className="flex items-center gap-2 text-black ">
                {formattedDate || ""} - {time || ""}
              </p>
            </div>
          </div>
          <div className="bg-tertiary">
            <div className="w-[402px] mx-auto">
              <CalendarPicker
                time={time}
                date={selectedDate}
                onDateChange={setSelectedDate}
                onTimeChange={setTime}
              />
            </div>
          </div>
          <footer className="px-10 mt-20 py-5 border-t border-gray-200 flex justify-end gap-4 bg-gray-50 rounded-b-lg">
            <Button variant="outline" onClick={handleClose}>
              Save & close
            </Button>
            <Button type="submit">Create appointment</Button>
          </footer>
        </form>
      </Modal>
      <ClinicModal
        modalOpen={clinicTypeVisible}
        handleClose={handleCloseClinicTypes}
        modalRef={clinicTypeRef}
        options={CLINIC_OPTIONS}
        title="Clinic"
        showSearchBar={true}
        handleChange={handleChangeClinic}
      />
      <ClinicModal
        modalOpen={appointmentTypeVisible}
        handleClose={handleCloseAppointmentType}
        modalRef={appointmentTypeRef}
        options={APPOINTMENT_TYPES}
        title="Appointment type"
        showSearchBar={false}
        handleChange={handleChangeType}
      />
    </div>
  );
};

export default NewAppointmentModal;
