import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Table from "../../components/Table";

import { userFields } from "../../constants/formFields";
import { fields } from "../../types";
import { fetchApiData } from "../../redux/features";

const fieldState: fields = {};

userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function TerminatedEmployees() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData("/employees"));
  }, [dispatch]);

  const columns = [
    {
      Header: `${t("First Name")}`,
      accessor: "user.firstname",
    },
    {
      Header: `${t("Last Name")}`,
      accessor: "user.lastname",
    },
    {
      Header: "Email",
      accessor: "user.email",
    },
    {
      Header: "Telephone ",
      accessor: "user.telephone",
    },
    {
      Header: "Job Title",
      accessor: "job_title",
    },
  ];

  return (
    <div className="mt-28">
      {!loading && (
        <Table
          data={
            data?.employees?.filter(
              (employee: any) => employee?.user?.deleted !== null
            ) ?? []
          }
          columns={columns}
          title="Employees (Contracts terminated)"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
