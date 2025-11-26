import { useForm, Control, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Fingerprint } from "lucide-react";
import { InfoCircle, User } from "iconsax-react";
import React from "react";
import clsx from "clsx";
import { InputFieldPhoneNo } from "@/app/components/form/InputFieldPhoneNo";
import { InputDateField } from "@/app/components/form/InputDateField";
import { SelectField } from "@/app/components/form/SelectField";
import { InputField } from "@/app/components/form/InputField";
import { Label } from "@/app/components/Elements/Label";
import { EMPTY_OPTION } from "@/app/utils/constants";
import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import {
  addNewPatientSchema,
  AddNewPatientType,
} from "../../utils/validationSchema";

const GENDER_OPTIONS = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "other", name: "Other" },
];

const TITLE_OPTIONS = [
  { id: "mr", name: "Mr." },
  { id: "ms", name: "Ms." },
  { id: "mrs", name: "Mrs." },
];

interface PatientRegistrationModalProps {
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  handleClose: () => void;
  modalOpen: boolean;
}

const PatientRegistrationModal = ({
  modalOpen,
  modalRef,
  handleClose,
}: PatientRegistrationModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddNewPatientType>({
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

  return (
    <Modal
      variant="middle"
      className={clsx(
        "w-[1074px] max-w-[95vw] mx-auto rounded-lg bg-blue-50 overflow-hidden shadow-2xl "
      )}
      showDialog={modalOpen}
      closeModal={() => {}}
      modalRef={modalRef}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <header className="px-10 pt-10 pb-5  rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Add new patient
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the patient information in the fields provided below
              </p>
            </div>
            <Button
              onClick={handleClose}
              variant="close"
              className="text-primary!"
            ></Button>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="centered bg-gray-1 rounded-full size-[100px] min-w-[100px]">
                <User variant="Bold" color="#FFFFFF" size={60} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition gap-2 text-sm"
                >
                  Take patient&apos;s picture
                  <Camera size={16} />
                </button>
                <button
                  type="button"
                  className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition gap-2 text-sm"
                >
                  Add fingerprint
                  <Fingerprint size={16} />
                </button>
              </div>
              <p className="text-sm text-[#7A90C2] mt-2 ">
                Patient picture should be updated by reception personnel
              </p>
            </div>

            <div className="flex flex-col items-end ml-auto">
              <div className="flex items-center gap-1 bg-primary-light text-black p-2 rounded-[10px] text-[10px] mb-3 max-w-[242px]">
                <InfoCircle
                  size={14}
                  variant="Bold"
                  className="mr-1 min-w-3.5"
                  color="#FF8B00"
                />
                If there is an existing Patient ID, input the patient&apos;s
                existing ID into the field
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <div className="border pr-2 border-gray-300 flex items-center gap-2 bg-white rounded-md">
                  <InputField
                    label=""
                    registration={{ ...register("patientId") }}
                    hasError={errors.patientId}
                    isRequired={true}
                    className="border-none!"
                  />
                  <button
                    type="button"
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <InfoCircle variant="Bold" size={16} color="#A6AFC2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-10">
          <div className="grid grid-cols-4 gap-6">
            <InputField
              label="First name"
              registration={{
                ...register("firstName"),
              }}
              hasError={errors.firstName}
              isRequired
            />
            <InputField
              label="Middle name"
              registration={{ ...register("middleName") }}
              hasError={errors.middleName}
              isRequired={false}
            />
            <InputField
              label="Last name"
              registration={{
                ...register("lastName"),
              }}
              hasError={errors.lastName}
              isRequired
            />
            <SelectField
              arr={TITLE_OPTIONS}
              control={control as unknown as Control}
              label="Title"
              name="title"
              hasError={errors.title}
              isRequired
            />

            <div className="flex flex-col">
              <Label isRequired>Date of birth</Label>
              <InputDateField
                name="dob"
                placeholder="Date of Birth"
                hasError={errors.dob}
                control={control as unknown as Control}
                isRequired
                minDate={undefined}
              />
            </div>

            <SelectField
              arr={GENDER_OPTIONS}
              control={control as unknown as Control}
              label="Gender"
              name="gender"
              hasError={errors.gender}
              isRequired
            />

            <InputFieldPhoneNo
              control={control as unknown as Control}
              name="phoneNumber"
              label="Phone number"
              hasError={errors.phoneNumber}
              className=""
              isRequired
            />

            <div className="flex items-center justify-between p-2">
              <Label isRequired={false}>Is patient new to the hospital?</Label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  {...register("isNewPatient")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <footer className="px-10 mt-20 py-5 border-t border-gray-200 flex justify-end gap-4 bg-gray-50 rounded-b-lg">
          <Button variant="outline" onClick={handleClose}>
            Save & close
          </Button>
          <Button type="submit">Create patient</Button>
        </footer>
      </form>
    </Modal>
  );
};

export default PatientRegistrationModal;
