import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

import Card from "../../components/Card";
import { fetchApiData } from "../../redux/features";

export default function EmployeeDashboard() {
  const dispatch = useAppDispatch();
  const d = useAppSelector((state) => state.api);
  const data = [
    {
      title: "Leave requests",
      subtitle: `${d?.leaveRequests?.length ?? 0}`,
      description: "Recent Leave requests",
    },
    {
      title: "Projects",
      subtitle: `${d?.projects?.length ?? 0}`,
      description: "Recent Projects",
    },
    {
      title: "Tasks",
      subtitle: `${d?.tasks?.length ?? 0}`,
      description: "Recent Tasks",
    },
  ];

  useEffect(() => {
    dispatch(fetchApiData("/projects/tasks"));
    dispatch(fetchApiData("/employees/leaveRequests"));
    dispatch(fetchApiData("/projects"));
  }, []);

  return (
    <div className="ml-6 md:ml-96 mt-24 flex flex-col flex-wrap">
      <div className="font-semibold text-xl ml-4 text-primary">
        Employee Dashboard
      </div>
      <div className="flex ">
        {data.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              customClass="md:ml-4 mr-2 md:mr-0 border"
            />
          );
        })}
      </div>
    </div>
  );
}
