/* eslint-disable */
//@ts-nocheck
import React from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useTranslation } from "react-i18next";
import DataPagination from "./TablePagination";

interface TableData {
  data: any;
  columns: any;
  title: string;
  styles?: string;
  attendance?: any;
  divStyles?: string;
  children?: React.ReactNode;
}

type DefaultProps = {
  placeholder?: string;
};

const tableDefaultProps = {
  placeholder: "Filter by cohort, program, and rating",
} as DefaultProps;

function DataTable({
  data,
  columns,
  title,
  placeholder,
  styles,
  attendance,
  divStyles,
  children,
}: TableData & tableDefaultProps) {
  const sortedData = React.useMemo(() => [...data], []);
  const { t } = useTranslation();
  const sortedColumns = React.useMemo(() => [...columns], []);

  const TableInstance = useTable(
    { data: sortedData, columns: sortedColumns, initialState: { pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    setGlobalFilter,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    pageOptions,
    headerGroups,
    prepareRow,
    state,
  } = TableInstance;
  // @ts-ignore
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div
      className={`bg-white border dark:bg-dark-bg shadow-md  px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-52 mb-10 ${divStyles}`}
    >
      <div className=" flex items-center justify-between pb-6">
        <h2 className="text-gray-800 dark:text-white font-semibold text-xl">
          {title}
        </h2>
        <input
          defaultValue={globalFilter || ""}
          placeholder={placeholder}
          className="border-gray-300 dark:bg-dark-tertiary dark:text-white border py-2 mt-4 rounded outline-none px-5 font-sans text-xs w-52 md:w-96"
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div>
        <table
          className="min-w-full leading-normal border"
          {...getTableProps()}
        >
          <thead className={`bg-primary ${!styles && "text-white"} ` + styles}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={
                      column.isSorted ? "sort-asc thead p-3" : " thead p-3"
                    }
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {data.length !== 0 ? (
              page.map((row) => {
                prepareRow(row);
                const rowTheme =
                  row.index % 2 !== 0
                    ? "bg-light-bg dark:bg-dark-tertiary"
                    : "bg-white dark:bg-dark-bg";

                return (
                  <tr className={` ${rowTheme}} `} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        className="data-cell p-2 border"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell", { attendance: attendance })}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr className="">
                <td colSpan={columns.length} className=" ">
                  <div className="mt-6 bg-red-100 border-red-400 text-red-700  text-center text-xl borderpx-4 py-3 rounded relative my-5">
                    {t("No data currently")}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <DataPagination
          pageOptions={pageOptions}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          columnLength={columns.length}
          canPreviousPage={canPreviousPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          previousPage={previousPage}
          nextPage={nextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
        />
      </div>
      {children}
    </div>
  );
}

export default DataTable;
