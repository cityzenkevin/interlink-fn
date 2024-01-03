import { EducationItem } from "../../../types";

export default function EducationCard({
  item,
  idx,
}: {
  item: EducationItem;
  idx: number;
}) {
  return (
    <div className="pl-3 leading-6">
      <hr
        className={`${
          idx > 0 ? "border my-2 border-gray-300 block" : "hidden"
        }`}
      />
      <div className="font-bold text-lg py-1">{item?.school}</div>
      <div className="font-semibold text-base py-1">
        {item?.degree}, {item?.fieldOfStudy}
      </div>
      <div className="text-sm text-gray-500 py-1">
        {item?.startDate ? new Date(item?.startDate).toDateString() : "N/A"} -{" "}
        {item?.endDate ? new Date(item?.endDate).toDateString() : "N/A"}
      </div>
      <div>
        Grade:
        {item?.grade ? item?.grade : "N/A"}
      </div>
    </div>
  );
}
