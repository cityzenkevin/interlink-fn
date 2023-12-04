import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NotFoundImg from "../assets/NotFoundImg.png";
import NavBar from "../components/NavBar";

function Error() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div className="errorImg flex items-center justify-center h-screen w-screen text-center">
        <div>
          <img
            src={NotFoundImg}
            className="max-w-36 max-h-32 md:max-w-44 md:max-h-40 lg:max-w-52 lg:max-h-48 xl:max-w-2xl xl:max-h-96"
            alt="404"
          />
        </div>
        <div className="max-w-screen-md  text-gray-600">
          <h1 className="font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            {t("Page Not Found")}
          </h1>
          <p className="my-3 px-8 md:px-14 lg:px-0">
            {t("error_page_paragraph")}
          </p>
          <button
            onClick={navigateHome}
            className="mt-2  px-8 text-xl font-bold"
          >
            {t("Back Home")}
          </button>
        </div>
      </div>
    </>
  );
}

export default Error;
