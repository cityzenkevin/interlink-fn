import Modal from "../../components/Modal";
import { IProps } from "../../types";

interface Props extends IProps {
  application: any;
  internship?: any;
}

export default function StudentApplicationModal({
  isOpen,
  onClose,
  application,
  internship,
}: Props) {
  return (
    <Modal
      title="Internship application"
      isOpen={isOpen}
      onClose={onClose}
      styles="max-w-xl"
    >
      <main className="flex flex-col items-center justify-center   ">
        <div className="w-full  bg-white  rounded-lg  overflow-hidden">
          <div className="px-6 py-2">
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Review your submitted application details
            </p>
          </div>
          <div className="px-6 py-4">
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <label
                  className="text-gray-700 dark:text-gray-300"
                  htmlFor="internship-title"
                >
                  Internship Title
                </label>
                <input
                  className="px-3 py-2 border border-gray-300  rounded-md bg-gray-100  text-gray-900 dark:text-gray-100"
                  disabled
                  id="internship-title"
                  value={application?.internship?.title ?? internship?.title}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label
                  className="text-gray-700 dark:text-gray-300"
                  htmlFor="company-name"
                >
                  Application Date
                </label>
                <input
                  className="px-3 py-2 border border-gray-300  rounded-md bg-gray-100  text-gray-900 dark:text-gray-100"
                  disabled
                  id="company-name"
                  value={
                    new Date(application?.createdAt).toDateString() ??
                    "Company Name"
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label
                  className="text-gray-700 dark:text-gray-300"
                  htmlFor="application-status"
                >
                  Application Status
                </label>
                <input
                  className={`px-3 py-2 border  rounded-md
                   ${
                     application?.state == "PENDING"
                       ? "border-yellow-500 bg-yellow-100 text-yellow-500"
                       : application?.state == "APPROVED"
                       ? "border-green-500 bg-green-100 text-green-500"
                       : "border-red-500 bg-red-100 text-red-500"
                   }
                  `}
                  disabled
                  id="application-status"
                  value={
                    application?.state == "PENDING"
                      ? "Under Review"
                      : application?.state == "APPROVED"
                      ? "Accepted"
                      : "Rejected"
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label
                  className="text-gray-700 dark:text-gray-300"
                  htmlFor="additional-notes"
                >
                  Additional Notes
                </label>
                <textarea
                  className="px-3 py-2 border border-gray-300  rounded-md bg-gray-100  text-gray-900 dark:text-gray-100 h-20"
                  disabled
                  id="additional-notes"
                  value={
                    application?.internship?.description ??
                    internship?.description
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Modal>
  );
}
