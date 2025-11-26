"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import clsx from "clsx";

import { Table } from "@/app/components/Table/Table";
import { PatientData } from "../types";

import avatar from "../../../../../public/avatar.png";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  Heart,
  LucideIcon,
  XCircle,
} from "lucide-react";
import PatientOptions from "./PatientOptions";

const PatientsTable = ({
  filteredPatients,
}: {
  filteredPatients: PatientData[];
}) => {
  const formatAmount = (amount: number) => `₦${amount.toLocaleString()}`;

  const Tag = ({
    text,
    color,
    hasIcon = false,
  }: {
    text: string;
    color: string;
    hasIcon?: boolean;
  }) => {
    let bgColor = "bg-gray-10    0";
    let textColor = "text-gray-700";
    let IconComponent: LucideIcon = Bell;

    switch (color) {
      case "yellow":
        bgColor = "bg-yellow-100/70";
        textColor = "text-yellow-700";
        IconComponent = AlertTriangle;
        break;
      case "red":
        bgColor = "bg-red-100/70";
        textColor = "text-red-700";
        IconComponent = XCircle;
        break;
      case "purple":
        bgColor = "bg-purple-100/70";
        textColor = "text-purple-700";
        IconComponent = Heart;
        break;
      case "orange":
        bgColor = "bg-orange-100/70";
        textColor = "text-orange-700";
        IconComponent = Clock;
        break;
      case "green":
        bgColor = "bg-green-100/70";
        textColor = "text-green-700";
        IconComponent = CheckCircle;
        break;
    }

    return (
      <span
        className={clsx(
          "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap",
          hasIcon ? "gap-1.5" : "",
          bgColor,
          textColor
        )}
      >
        {hasIcon && <IconComponent className="w-3 h-3" />}
        {text}
      </span>
    );
  };

  const patientDashboardColumns: ColumnDef<PatientData>[] = [
    {
      header: "Patient Information",
      accessorKey: "patientName",
      cell: ({ row }) => {
        const { patientName, age, gender, hospitalId, selected } = row.original;

        return (
          <div
            className={clsx(
              "flex items-center border-l-4 gap-6 pl-4 h-[64.5px] ",
              selected ? " border-l-orange-state" : " border-l-white"
            )}
          >
            <div className="flex items-center gap-4">
              <button className="mr-4" type="button">
                <ChevronDown color="var(--color-black)" size={12} />
              </button>
              <span className="text-sm font-medium text-gray-900">
                {row.index + 1}
              </span>
            </div>
            <div className="flex items-center w-[300px]">
              <div className="mr-3 w-8 h-8 min-w-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                <Image
                  src={avatar}
                  alt={`${patientName}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-black font-bold text-sm leading-tight">
                  {patientName}
                </p>
                <p className="text-tertiary text-xs leading-tight mt-0.5">
                  {hospitalId} • {gender} • {age}
                </p>
              </div>
            </div>
            {row.index < 3 && (
              <div className="bg-purple-light px-2 py-1 rounded-[5px] text-xs text-primary">
                New
              </div>
            )}
          </div>
        );
      },
    },
    {
      header: "Clinic",
      accessorKey: "clinic",
      cell: ({ row }) => {
        const { clinic } = row.original;
        return <p className=" gap-2">{clinic}</p>;
      },
    },
    {
      header: "Wallet bal. (₦)",
      accessorKey: "walletBalance",
      cell: ({ row }) => (
        <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
          {formatAmount(row.original.walletBalance)}
        </p>
      ),
    },
    {
      header: "Time/Date",
      accessorKey: "time",
      cell: ({ row }) => (
        <div>
          <p
            className={clsx(
              "text-sm font-bold leading-tight",
              row.original.statusColor === "red"
                ? "text-red-600"
                : "text-yellow-600"
            )}
          >
            {row.original.time}
          </p>
          <p className="text-xs text-gray-500 leading-tight">
            {row.original.date}
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const { status, statusColor } = row.original;

        return (
          <div className="flex items-center justify-between w-full">
            <div className="">
              <Tag text={status} color={statusColor} hasIcon={true} />
            </div>
            <PatientOptions />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        isLoading={false}
        isTableEmpty={false}
        isPaginated={false}
        columns={patientDashboardColumns}
        data={filteredPatients}
        tableHeight="h-[calc(100vh-242px)] w-full"
        emptyNotice="No attendances"
        deleteButton
        emptyNoticeSubheading="attendance will show up here"
      />
    </div>
  );
};

export default PatientsTable;
