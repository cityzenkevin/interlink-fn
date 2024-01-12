import { useEffect, useContext } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Card from "../../components/Card";
import { UserContext } from "../../hooks/useAuth";
import usersApi from "../../services/users.api";
import StudentDashboard from "./StudentDashboard";
import OrganizationDashboard from "./OrganizationDashboard";
import { fetchApiData } from "../../redux/features";
import SupervisorDashboard from "./SupervisorDashboard";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
const d = useAppSelector((state) => state.api);

  const data = [
    {
      title: "Students",
      subtitle: `${users.length ?? 0}`,
      description: "Number of students",
    },
    {
      title: "Internships",
      subtitle: `${d?.internship?.length ?? 0}`,
      description: "Number of internships",
    },
    {
      title: "Applications",
      subtitle: `${d?.applications?.length ?? 0}`,
      description: "Number of evaluations",
    },
    {
      title: "Supervisors",
      subtitle: `${d?.supervisors?.length ?? 0}`,
      description: "Number of supervisors",
    },
    
    
  ];
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.role === "ADMIN") {
      dispatch(usersApi.getUsers());
      dispatch(fetchApiData("/student/internship"));
      dispatch(fetchApiData("/users"));
      dispatch(fetchApiData("/student/applications"));
      dispatch(fetchApiData("/users/supervisors"));
    }
  }, []);
  let DashboardComponent;

  switch (user.role) {
    case "ADMIN":
      DashboardComponent = (
        <div className="ml-6 md:ml-60 mt-24 flex flex-wrap">
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
      );
      break;
    case "STUDENT":
      DashboardComponent = <StudentDashboard />;
      break;
    case "SUPERVISOR":
      DashboardComponent = <SupervisorDashboard />;
      break;

  
    default:
      break;
  }

  return DashboardComponent;
}
