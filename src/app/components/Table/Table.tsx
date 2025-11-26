"use client";

import { rankItem } from "@tanstack/match-sorter-utils";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import clsx from "clsx";
import { DebouncedInput } from "./DebouncedInput";
import { EmptyTableNotice } from "./EmptyTableNotice";

interface TableProps<DataType extends { id: number | string }> {
  isLoading: boolean;
  data: DataType[] | undefined;
  rowSelection?: {
    onRowSelectionChange: (data: DataType[]) => void;
  };
  columns: ColumnDef<DataType>[];
  tableWidth?: string;
  tableRadius?: string;
  tableHeight?: string;
  isTableEmpty: boolean;
  emptyNotice?: string;
  emptyNoticeSubheading?: string;
  emptyNoticeLink?: string;
  emptyNoticeLinkName?: string;
  showFilters?: boolean;
  hasVerticalLines?: boolean;
  allButtonFilters?: boolean;
  ResultPicksComponent?: React.ReactNode;
  title?: string;
  handleRowClick?: (row: DataType) => void;
  placeholder?: string;
  isPaginated?: boolean;
  defaultPageSize?: number;
  deleteButton?: boolean;
  deleteIcon?: React.ReactElement;
  handleDeleteData?: (
    userId: string,
    firstName: string,
    lastName: string
  ) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Fixed widths for columns (approximate distribution assuming 8-10 columns)
const getColumnWidthClasses = (index: number) => {
  switch (index) {
    case 0: // ID/Selection
      return "w-[10%]";
    case 1: // Patient Name
      return "w-[10%]";
    case 2: // Patient ID
      return "w-[10%]";
    case 3: // Gender
    case 4: // Age
      return "w-[5%]";
    case 5: // Clinic
      return "w-[15%]";
    case 6: // Status Tags
      return "w-[5%]";
    case 7: // Wallet Balance
      return "w-[10%]";
    case 8: // Time
    case 9: // Date
      return "w-[10%]";
    case 10: // Status
      return "w-[10%]";
    default:
      return "w-[5%]"; // Fallback for extra columns
  }
};

export const Table = <DataType extends { id: number | string }>({
  handleRowClick,
  isLoading,
  data,
  columns,
  isTableEmpty,
  emptyNotice,
  emptyNoticeSubheading,
  emptyNoticeLink,
  emptyNoticeLinkName,
  showFilters = false,
  isPaginated = true,
  ResultPicksComponent,
  title = "",
  tableWidth = "",
  tableHeight = "h-[70vh]",
  tableRadius = "rounded-[9px]",
  rowSelection,
  placeholder = "Search",
  defaultPageSize = 50,
}: // hasVerticalLines is ignored for the new styling
// handleDeleteData,
// deleteButton,
// deleteIcon,
React.PropsWithChildren<TableProps<DataType>>) => {
  const defaultData = React.useMemo(() => [], []);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
  });

  const paginationSelectOptions = [
    { id: "50", name: "50" },
    { id: "150", name: "150" },
    { id: "250", name: "250" },
    { id: "500", name: "500" },
    { id: "1000", name: "1000" },
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    table.setPageSize(parseInt(value, 10));
  };

  const selectedRowData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  React.useEffect(() => {
    if (rowSelection) {
      rowSelection.onRowSelectionChange(selectedRowData);
    }
  }, [selectedRowData, rowSelection]);

  React.useEffect(() => {
    table.setPageSize(defaultPageSize);
  }, [defaultPageSize, table]);

  return (
    <>
      <div className="p-4 rounded-xl w-full">
        {showFilters && (
          <div className="mb-4 flex w-full flex-row items-center justify-between gap-10 overflow-auto">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder={placeholder}
            />
          </div>
        )}

        {isTableEmpty ? (
          <EmptyTableNotice
            notice={emptyNotice || "No data available"}
            noticeSubheading={emptyNoticeSubheading || ""}
            linkUrl={emptyNoticeLink}
            linkName={emptyNoticeLinkName}
          />
        ) : (
          <div className="space-y-6">
            {ResultPicksComponent}

            {title && <h2 className="text-gray-900">{title}</h2>}

            {/* Table Container - Removed borders and set fixed height */}
            <div
              className={clsx(
                "overflow-x-auto overflow-y-auto bg-white rounded-xl", // Background color of the container
                tableHeight
              )}
            >
              <table
                className={clsx(
                  "border-collapse border-spacing-0",
                  tableWidth || "w-full"
                )}
              >
                {/* Header */}
                <thead className="sticky top-0 bg-white z-1 shadow-sm">
                  {table.getHeaderGroups().map((headerGroup) => {
                    return (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => (
                          <th
                            // Using explicit proportional widths to align with flex body rows
                            className={clsx(
                              "cursor-pointer p-4 text-left text-xs font-semibold text-gray-400 transition duration-500 ease-in-out md:text-sm",
                              index === 0 && 'pl-[60px]',
                              getColumnWidthClasses(index)
                            )}
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            {/* Sort icons hidden as per the image styling, but logic remains */}
                            {{
                              asc: "",
                              desc: "",
                            }[header.column.getIsSorted() as string] ?? null}
                          </th>
                        ))}
                      </tr>
                    );
                  })}
                </thead>

                {/* Table Body */}
                <tbody className="space-y-3">
                  {!isLoading && (
                    <>
                      {table.getRowModel().rows.map((row, index) => {
                        return (
                          <tr
                            className={clsx(
                              "my-3 w-full items-center bg-white mt-1 shadow-md rounded-xl border border-gray-100 transition-colors duration-200 ease-in-out hover:bg-gray-2 cursor-pointer "
                            )}
                            key={row.id}
                            onClick={() => {
                              if (handleRowClick) {
                                handleRowClick(row.original);
                              }
                            }}
                          >
                            {row.getVisibleCells().map((cell, cellIndex) => (
                              <td
                                // Removed flex-grow and use explicit width class to match the header
                                className={clsx(
                                  "text-sm font-medium text-gray-700 shrink-0",
                                  cellIndex > 0 && "p-4 ",
                                  getColumnWidthClasses(cellIndex)
                                )}
                                key={cell.id}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {isPaginated && (
              <div className="mt-6 flex items-center justify-between text-sm p-4 bg-white rounded-xl shadow-md">
                <div className="flex items-center gap-2 text-gray-600">
                  <button
                    type="button"
                    className="flex items-center rounded-lg border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {/* Placeholder for first page icon */}
                    &#xab;
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {/* Placeholder for previous page icon */}
                    &#x2039;
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {/* Placeholder for next page icon */}
                    &#x203a;
                  </button>
                  <button
                    type="button"
                    className="flex items-center rounded-lg border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    {/* Placeholder for last page icon */}
                    &#xbb;
                  </button>
                  <span className="flex items-center gap-1 ml-4">
                    <div>Page</div>
                    <strong className="text-gray-900">
                      {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </strong>
                  </span>
                  <span className="flex items-center gap-1 ml-4">
                    | Go to page:
                    <input
                      type="number"
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        table.setPageIndex(page);
                      }}
                      className="w-16 rounded-lg border border-gray-300 p-1 text-center"
                    />
                  </span>
                </div>
                {/**/}
                <select
                  onChange={handleSelectChange}
                  className="rounded-lg border border-gray-300 cursor-pointer bg-white p-2 outline-none text-gray-700"
                >
                  {paginationSelectOptions.map(({ id }) => (
                    <option key={id} value={id}>
                      {id} per page
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        /* This custom CSS is crucial to override the default HTML table structure 
          and simulate the appearance from the image where each row looks like a card 
          with vertical spacing.
        */

        .bg-gray-50 table {
          border-collapse: separate;
          border-spacing: 0 10px; /* Crucial: sets vertical spacing between rows */
        }

        .bg-gray-50 thead tr {
          margin-bottom: 0;
          box-shadow: none; /* Remove shadow from header */
        }

        .bg-gray-50 thead th {
          border-bottom: none; /* Remove border under header */
          padding-top: 0;
          padding-bottom: 0;
          white-space: nowrap;
        }

        .bg-gray-50 tbody tr {
          /* Resetting default row styles */
          background-color: transparent !important;
          border: none !important;

          width: 100%;
        }

        .bg-gray-50 tbody td {
          border-bottom: none !important; /* Remove bottom border */
          border-left: none !important; /* Remove left border */
          padding-top: 15px;
          padding-bottom: 15px;
        }

        /* Override the hover/odd row styling which conflicts with the card design */
        .bg-gray-50 tbody tr:nth-child(even),
        .bg-gray-50 tbody tr:nth-child(odd) {
          background-color: transparent !important;
        }
      `}</style>
    </>
  );
};
