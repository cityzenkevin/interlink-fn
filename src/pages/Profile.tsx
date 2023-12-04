import { useEffect } from "react";
import { useParams } from "react-router";

import ProfileCoverPage from "../components/ProfileCoverpage";
import ProfileTabs from "./ProfileTabs";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchApiData } from "../redux/features";

export default function Profile() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchApiData(`/users/${id}`));
  }, []);

  return (
    <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen">
      {id && data[id] && (
        <>
          <ProfileCoverPage data={id && data[id]} currentPage="viewProfile" />
          <div className="mt-2 p-6">
            {data && <ProfileTabs data={id && data[id]} />}
          </div>
        </>
      )}
    </div>
  );
}
