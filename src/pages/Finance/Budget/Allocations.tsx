import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";

import Table from "../../../components/Table";

import { budgetFields } from "../../../constants/budget";
import { fields } from "../../../types";
import { fetchApiData } from "../../../redux/features";

const fieldState: fields = {};
budgetFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Allocations() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData("/finance/budgets/allocations"));
  }, [dispatch]);

  const columns = [
    {
      Header: `${t("Budget Name")}`,
      accessor: "budget.budget_name",
    },
    {
      Header: "Project Name",
      accessor: "project.project_name",
    },
    {
      Header: "Task Name",
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{row.original?.task ? row.original?.tasks : "N/A"}</div>;
      },
    },
    {
      Header: `${t("Amount")}`,
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{`${row.original?.amount} Rwf` ?? "N/A"}</div>;
      },
    },
  ];

  return (
    <div className="mt-28">
      {!loading && (
        <Table
          data={data?.allocations ?? []}
          columns={columns}
          title="Budgets Allocations"
          placeholder="Find by project name, amount, or task name"
        />
      )}
    </div>
  );
}
