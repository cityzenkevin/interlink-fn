import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Card from "../../components/Card";
import { fetchApiData } from "../../redux/features";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PmDashboard() {
  const dispatch = useAppDispatch();
  const d = useAppSelector((state) => state.api);
  const finishedProjects = d?.projects?.filter(
    (project: any) => project?.status === "Completed"
  );
  const pendingProjects = d?.projects?.filter(
    (project: any) => project?.status === "Active"
  );

  const chartData = {
    labels: ["Pending", "Finished"],
    datasets: [
      {
        label: "Project Status",
        data: [pendingProjects?.length, finishedProjects?.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const data = [
    {
      title: "Projects",
      subtitle: `${d?.projects?.length ?? 0}`,
      description: "Number of Projects",
    },
    {
      title: "Documents",
      subtitle: `${d?.documents?.length ?? 0}`,
      description: "Number of documents",
    },
    {
      title: "Tasks",
      subtitle: `${d?.tasks?.length ?? 0}`,
      description: "Income tasks",
    },
  ];

  useEffect(() => {
    dispatch(fetchApiData("/projects/documents"));
    dispatch(fetchApiData("/projects"));
  }, []);

  return (
    <div className="ml-6 md:ml-80 mt-16 flex flex-col fixed flex-wrap">
      <div className="font-semibold text-xl ml-4 text-primary">
        Project Manager Dashboard
      </div>
      <div className="flex flex-wrap md:flex-nowrap max-h-[150px]">
        {data.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              customClass="md:ml-4 mr-2 md:mr-0 border md:max-w-[20rem] md:min-w-[16rem] "
            />
          );
        })}
      </div>
      <div className="w-[90%] md:w-[50%] h-[450px] p-9 ml-4 mt-2 bg-white border shadow-sm ">
        <div>
          <div className="font-semibold text-xl flex-col ml-4 text-primary">
            Project Status
          </div>
        </div>
        <Doughnut data={chartData} style={
          {
            height: "45%",
          }
        } />
      </div>
    </div>
  );
}
