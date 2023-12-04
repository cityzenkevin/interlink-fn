import Pocket from "../assets/pocket.svg";
export default function Homepage() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-[#a7deef] bg-opacity-80 flex justify-center items-center  min-h-screen dark:bg-gray-900">

      <div className="grid py-8 px-4 justify-center mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="place-self-center mr-auto lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl text-center  text-primary font-extrabold leading-none md:text-6xl xl:text-6xl dark:text-white">
            Women of Faith ERP
          </h1>

          <p className="mb-6  max-w-2xl font-light ml-12 text-gray-500 lg:mb-8 md:text-lg lg:text-3xl dark:text-gray-400">
            ERP system is a comprehensive software solution that integrates various
            functions and processes within the organization to streamline operations and enhance efficiency.
          </p>

          <a
            href="https://www.womenofaith.com/" target="_blank"
            className="inline-flex ml-12 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-300 bg-primary hover:bg-secondary Hover focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            More About Women of Faith
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          {<img src={Pocket} alt="Women of Faith" className="md: ml-8 w-[28rem]  animate-ping transition ease-in duration-300" />}
        </div>

      </div>

    </section>
  );
}
