import { useEffect } from "react";
import InternshipCard from "../../sections/landing-page/internship-card";
import NavBar from "../../sections/landing-page/nav-bar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchApiData } from "../../redux/features";
import { Internship } from "../../types";

export default function LandingInternships() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api);
  // const { loading } = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData("/internships"));
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
          <p className="text-gray-600 mt-2 md:max-w-lg">Latest internships</p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-3">
          {data?.internships?.map((internship: Internship, idx: number) => {
            internship;
            return <InternshipCard key={idx} {...internship} />;
          })}
        </div>
      </section>
    </div>
  );
}
