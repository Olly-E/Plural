"use client";

import { Controller, FieldError, UseControllerProps } from "react-hook-form";
import DatePicker, { DatePickerProps } from "react-datepicker";
import React from "react";
import clsx from "clsx";

import { Label } from "../Elements/Label";

type ReactDatePickPropsWithoutOnChange = Omit<DatePickerProps, "onChange">;

type InputDateFieldProps = {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  hasError: FieldError | undefined;
  value?: string;
  isRequired?: boolean;
} & ReactDatePickPropsWithoutOnChange &
  UseControllerProps;

export const InputDateField: React.FC<InputDateFieldProps> = ({
  name,
  label,
  hasError,
  className,
  placeholder = "Select date",
  dateFormat = "MMMM d, yyyy",
  isRequired,
  control,
  ...props
}) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {!!label && (
        <Label htmlFor={name} isRequired={isRequired}>
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field }) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          <DatePicker
            {...props}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            className={clsx(
              "h-10 w-full shadow-sm rounded-sm border-[0.5px] border-gray-300 bg-transparent px-4 outline-none placeholder:text-sm focus-within:border-primary-200 transition-colors duration-300 disabled:bg-gray-100",
              hasError && "border-red-500",
              className
            )}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
            name={name}
            // Prevent modal from closing
            onClickOutside={(e) => e?.stopPropagation()}
            ref={(elem) => {
              if (!elem) return;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const input = (elem as any).input as HTMLInputElement;
              if (input) field.ref(input);
            }}
          />
        )}
      />

      {hasError && (
        <p className="text-red-500 text-sm mt-1">{hasError.message}</p>
      )}
    </div>
  );
};
