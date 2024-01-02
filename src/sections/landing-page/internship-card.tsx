import { Link } from "react-router-dom";
import { Internship } from "../../types";

export default function InternshipCard({
  title,
  id,
  deadline,
  photoUrl,
  created,
  department,
}: Internship) {
  return (
    <div className="w-full">
      <div className="bg-white rounded border border-gray-300">
        <div className="w-full h-48 overflow-hidden bg-gray-300">
          <img
            src={photoUrl}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center text-sm">
            <span className="text-primary font-semibold">{department}</span>
            <span className="ml-4 text-gray-600">
              {new Date(created)?.toDateString()}
            </span>
          </div>
          <Link to={`/internships/${id}`}>
            <p className="text-lg font-semibold leading-tight mt-4">{title}</p>
          </Link>
          <button className="px-4 py-2 border bg-primary text-white  mt-2 hover:bg-white hover:text-primary hover:border-primary duration-100 transition-all ease-in-out">
            Apply
          </button>
          <div className="flex items-center mt-4">
            <div className="ml-4">
              <p className="text-red-600">
                Deadline:
                <span className="text-gray-900 font-semibold ml-2">
                  {new Date(deadline)?.toDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
