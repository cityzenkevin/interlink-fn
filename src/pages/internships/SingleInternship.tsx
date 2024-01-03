import { useEffect } from "react";
import NavBar from "../../sections/landing-page/nav-bar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchApiData } from "../../redux/features";
import { Internship } from "../../types";
import { Link } from "react-router-dom";

export default function SingleInternship() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api);
  const { loading } = useAppSelector((state) => state.api);
  const id = window.location.pathname.split("/")[2];

  const internship: Internship = data?.latestinternships;

  useEffect(() => {
    dispatch(fetchApiData("/internships"));
    dispatch(fetchApiData(`/internships/${id}`));
  }, [dispatch]);

  return (
    <div className="antialiased bg-primary font-sans text-gray-900">
      <main className="w-full mt-20">
        {/* start header*/}
        <NavBar />
        {/* end header*/}
      </main>
      <section
        id="internships"
        className="relative bg-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 pb-8"
      >
        <div className="pt-8">
          <h2 className="text-3xl leading-tight font-bold">Internships</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-3">
          <div className="w-full">
            <div className="bg-white rounded  ">
              <div className="w-full h-48 overflow-hidden ">
                <img
                  src={internship?.photoUrl}
                  alt=""
                  className="w-1/3"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center text-sm">
                  <span className="text-primary font-semibold">
                    {internship?.department}
                  </span>
                  <span className="ml-4 text-gray-600">
                    {new Date(internship?.created)?.toDateString()}
                  </span>
                </div>
                <Link to={`/internships/${id}`}>
                  <p className="text-lg font-semibold leading-tight mt-4">
                    {internship?.title}
                  </p>
                </Link>
                <div
                  className="list-disc"
                  dangerouslySetInnerHTML={{ __html: internship?.description }}
                />
                <button className="px-4 py-2 border bg-primary text-white  mt-2 hover:bg-white hover:text-primary hover:border-primary duration-100 transition-all ease-in-out">
                  Apply
                </button>
                <div className="flex items-center mt-4">
                  <div className="ml-4">
                    <p className="text-red-600">
                      Deadline:
                      <span className="text-gray-900 font-semibold ml-2">
                        {new Date(internship?.deadline)?.toDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
