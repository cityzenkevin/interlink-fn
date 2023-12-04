import student from "../assets/student.jpg";
import maleStudent from "../assets/maleStudent.jpg";
import femaleStudent from "../assets/maleStudent.jpg";

export default function Services() {
  return (
    <>
      <section className=" min-h-screen flex justify-center  bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light  sm:text-lg text-gray-400">
            <h2 className="mb-4 text-5xl text-center font-extrabold  text-white">
              We want to make Student's
              <span className="text-primary"> life easier</span>
            </h2>
            <p className="mb-4 text-2xl mt-8 font-medium">
              We strive to ease the financial burdens that students often face.
              We have implemented a seamless and secure system for sending
              pocket money to students, making it easier for them to manage
              their expenses and focus on their studies.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src={student}
              alt="office content 1"
            />
            <img
              className="mt-4 w-full rounded-lg lg:mt-10"
              src={maleStudent}
              alt="office content 2"
            />
            <img
              className="mt-2 w-full rounded-lg lg:-mt-10"
              src={femaleStudent}
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <section className=" min-h-screen flex justify-center  bg-gray-50">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="mt-2 w-full rounded-lg lg:mt-2"
              src={femaleStudent}
              alt="office content 2"
            />
            <img
              className="w-full rounded-lg lg:mt-40"
              src={student}
              alt="office content 1"
            />
            <img
              className="mt-4 w-full rounded-lg lg:-mt-32"
              src={maleStudent}
              alt="office content 2"
            />
          </div>
          <div className="font-light  sm:text-lg text-gray-500">
            <h2 className="mb-4 text-5xl text-center font-extrabold text-gray-800 ">
              We <span className="text-primary"> simplify</span> inmate life
              with money transfers from their loved ones.
            </h2>
            <p className="mb-4 text-2xl mt-8 font-medium">
              We ease inmate financial burdens with a secure money transfer
              system, enabling them to focus on rehabilitation
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
