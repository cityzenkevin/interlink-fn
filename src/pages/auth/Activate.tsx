import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createApiData } from "../../redux/features";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import check from "../../assets/check.png";

const Activate = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(document.location.search);
  const token = searchParams.get("token");
 const {loading} = useAppSelector(state => state.api)

  const activate = async () => {
    try {
      await dispatch(
        createApiData({
          body: { token },
          url: "/auth/activate",
        })
      ).unwrap();

      toast.success(t("Account activated successfully"));

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(t(error.message));
      } else {
        console.log("Unknown error:", error);
        toast.error(t("An unknown error occurred"));
      }
    }
  };

  return (
    <div className="bg-gray-800 w-full h-screen flex justify-center items-center">
      <div className="bg-white max-w-sm mb-10 w-full space-y-4 border p-6 rounded shadow-md">
        <div className="flex items-center justify-center">
          <img src={check} alt="" className="m-2 w-1/2 h-1/2" />
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary "
         onClick={activate}
       >

          { loading ? t("Activating..."):
            t("Activate Account")}
        </button>
      </div>
    </div>
  );
};

export default Activate;
