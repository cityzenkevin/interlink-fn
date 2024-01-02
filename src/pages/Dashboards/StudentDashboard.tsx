import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Card from "../../components/Card";
import { fetchApiData } from "../../redux/features";

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const d = useAppSelector((state) => state.api);

  const data = [
    {
      title: "Applications",
      subtitle: `${d?.projects?.length ?? 0}`,
      description: "Number of applications",
    },
  ];

  useEffect(() => {

  }, []);

  return (
    <div className="ml-6 md:ml-60 mt-16 flex flex-col fixed flex-wrap">
      <div className="font-semibold text-xl ml-4 text-primary">
        Student Dashboard
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
    </div>
  );
}
