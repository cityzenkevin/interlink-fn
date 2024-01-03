import {  FaExternalLinkSquareAlt } from "react-icons/fa";
import { Certificate } from "../../../types";

export default function CertificationCard({
  item,
  idx,
}: {
  item: Certificate;
  idx: number;
}) {
  return (
    <div className="pl-3 leading-6">
      <hr
        className={`${
          idx > 0 ? "border my-2 border-gray-300 block" : "hidden"
        }`}
      />
      <div className="font-bold text-lg py-1">{item?.title}</div>
      <div className="font-semibold text-base py-1">{item?.organization} </div>

      <div
        className="mt-4"
        dangerouslySetInnerHTML={{
          __html: item?.description ? item?.description : "N/A",
        }}
      />
      <a href={item?.documentUrl} target="_blank">
        <button
          className="
            bg-white border flex border-primary text-primary font-semibold py-1 px-3 rounded-lg mt-4 hover:bg-primary hover:text-white hover:border-primary
        "
        >
          <span>View Certificate</span>
          <FaExternalLinkSquareAlt className="ml-2 mt-1" />

        </button>
      </a>
    </div>
  );
}
