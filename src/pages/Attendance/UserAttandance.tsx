
import Table from "../../components/Table";

import { userFields } from "../../constants/formFields";
import { fields } from "../../types";
import { formatDateInWords } from "../../utils";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function UserAttendance({
  loading,
  attendanceData,
}: {
  loading: boolean;
  attendanceData: any[];
}) {
  const columns = [
    {
        Header: "Day",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span>
              {formatDateInWords(row.original.date).split("-")[0] as any}
            </span>
          </div>
        ),
      },
    {
      Header: "Month",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>
            {formatDateInWords(row.original.date).split("-")[1] as any}
          </span>
        </div>
      ),
    },
    {
        Header: "Year",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span>
              {formatDateInWords(row.original.date).split("-")[2] as any}
            </span>
          </div>
        ),
      },
    {
      Header: "Status",
      accessor: "",
      Cell: ({ row }: any) => (
        <div
          className={`
          w-1/3  px-2 py-1 rounded-md border
          ${
            row.original.status
              ? "border-green-500 text-green-500"
              : "border-blue-500 text-blue-500"
          }
        `}
        >
          <span>{row.original.status ? "Present" : "Absent"}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28">
      {!loading && (
        <Table
          data={attendanceData ?? []}
          columns={columns}
          title="Attendance"
          placeholder="Find date, status"
        />
      )}
    </div>
  );
}
