import { useEffect, useContext } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Card from "../../components/Card";
import { UserContext } from "../../hooks/useAuth";
import usersApi from "../../services/users.api";
import HrDashboard from "./HrDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import PmDashboard from "./PmDashboard";
import FmDashboard from "./FmDashboard";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const data = [
    {
      title: "Users",
      subtitle: `${users.length ?? 0}`,
      description: "Number of Users",
    },
  ];
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user.role === "ADMIN") {
      dispatch(usersApi.getUsers());
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
    case "PM":
      DashboardComponent = <PmDashboard />;
      break;
    case "FM":
      DashboardComponent = <FmDashboard />;
      break;
    case "HR":
      DashboardComponent = <HrDashboard />;
      break;
    case "EMPLOYEE":
      DashboardComponent = <EmployeeDashboard />;
      break;
    default:
      break;
  }

  return DashboardComponent;
}
