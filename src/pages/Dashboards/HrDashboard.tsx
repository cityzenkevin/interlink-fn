import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Card from "../../components/Card";
import usersApi from "../../api/users.api";
import { fetchApiData } from "../../redux/features";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
};
export default function HrDashboard() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  let employees = users.filter(
    (user: any) => user.role === "EMPLOYEE" && user.deleted === null
  );

  const femaleEmployees = employees.filter((e: any) => e?.gender == "female");
  const maleEmployees = employees.filter((e: any) => e?.gender !== "female");

  const d = useAppSelector((state) => state.api);
  const data = [
    {
      title: "Employees",
      subtitle: `${employees?.length ?? 0}`,
      description: "Total Number of Employees",
    },
    {
      title: "Volunteers",
      subtitle: `${d?.volunteers?.length ?? 0}`,
      description: "Total Number of Volunteers",
    },
    {
      title: "Leave requests",
      subtitle: `${d?.leaveRequests?.length ?? 0}`,
      description: "Total Recent Leaves requests",
    },
    
  ];

  useEffect(() => {
    dispatch(usersApi.getUsers());
    dispatch(fetchApiData("/volunteers"));
    dispatch(fetchApiData("/employees/leaveRequests"));
  }, []);

  const chartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Number of employees",
        data: [maleEmployees?.length, femaleEmployees?.length],
        backgroundColor: ["blue", "green"],
        borderColor: ["blue", "green"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="ml-6 md:ml-80 mt-16 flex flex-col flex-wrap">
      <div className="font-semibold text-xl flex-col ml-4 text-primary">
        Human Resource Dashboard
      </div>
      <div className="flex flex-wrap md:flex-nowrap max-h-[150px]">
        {data.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              customClass="md:ml-4 md:max-w-[24rem] md:min-w-[18rem] mr-2 md:mr-0 border"
            />
          );
        })}
      </div>
      <div className="w-[80%] md:w-[40%] ml-4  mt-2 bg-white border shadow-sm p-3">
        <div>
          <div className="font-semibold text-xl flex-col ml-4 text-primary">
            Employee Composition
          </div>
        </div>

        <Pie data={chartData} options={options} />
      </div>
      
    </div>
  );
}
