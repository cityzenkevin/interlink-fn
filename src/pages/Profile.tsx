import { useContext } from "react";

import ProfileCoverPage from "../components/ProfileCoverpage";
import ProfileTabs from "../pages/profile/ProfileTabs";
import { UserContext } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useContext(UserContext);
  const data = user;

  return (
    <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen">
      {data ? (
        <>
          <div className="mt-2 p-6">
            <ProfileTabs data={data} />
          </div>
        </>
      ) : (
        <></>
        // <Square />
      )}
    </div>
  );
}
