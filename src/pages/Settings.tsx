import { useState, useEffect, useRef, useContext } from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Switch } from "@headlessui/react";
import getLanguage from "../utils/getLanguage";
import { UserContext } from "../hooks/useAuth";

function Settings() {
  const { t } = useTranslation();
  const lanRef = useRef<any>();
  const lan = getLanguage();
  const [emailEnabled, setEmailEnabled] = useState(false);
  const { user } = useContext(UserContext);

  const userLang = window.navigator.language;

  const handleLanChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    i18next.changeLanguage(value);
  };

  useEffect(() => {
    if (lanRef.current) {
      lanRef.current.value = lan;
    }
  }, []);

  return (
    <div className="flex  border-2 flex-col grow bg-light-bg dark:bg-dark-frame-bg mt-12">
      <div className="flex flex-row justify-center pt-[12vh]">
        <div className="rounded-lg border w-[90%] lg:w-80vh lg:ml-[32vh] lg:mr-[2vh] lg:mb-10 p-6 bg-white dark:bg-dark-bg">
          <h1 className="mb-4 font-bold text-xl dark:text-dark-text-fill">
            {t("Settings")}
          </h1>
          <div>
            <li className="flex items-center border-b pt-2 pb-1 mt-10">
              <div className="w-[33vh]">
                <h1 className="font-bold dark:text-dark-text-fill">
                  {t("Profile")}
                </h1>
                <p className="text-sm text-gray-600 dark:text-dark-text-fill">
                  {t("Edit profile, export account data, ...")}
                </p>
              </div>
              <Link
                className="ml-auto text-gray-600 text-xs md:text-base dark:text-dark-text-fill"
                to="#link"
              >
                <h4>
                  <Link to={`/dashboard/profile/${user.id}`}>
                    {t("Change")}
                  </Link>
                </h4>
              </Link>
            </li>

            <li className="flex items-center border-b pt-2 pb-1">
              <div className="w-[33vh]">
                <h1 className="font-bold dark:text-dark-text-fill">
                  {t("Language")}
                </h1>
                <p className="text-sm text-gray-600 dark:text-dark-text-fill">
                  {t("Language preferences")}
                </p>
              </div>
              <select
                defaultValue={userLang}
                data-testid="lanChange"
                ref={lanRef}
                onChange={(e) => handleLanChange(e)}
                className="ml-auto bg-white border px-2 h-9 rounded-md text-xs md:text-sm text-gray-600 dark:text-dark-text-fill dark:bg-dark-bg outline-none"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="kn">Ikinyarwanda</option>
              </select>
            </li>
            <li className="flex items-center border-b pt-2 pb-1 mb-10">
              <div className="w-[33vh]">
                <h1 className="font-bold dark:text-dark-text-fill">
                  {t("Email notifications")}
                </h1>
                <p className="text-sm text-gray-600 dark:text-dark-text-fill">
                  {t(
                    "Receive monthly reports, weekly summaries, and more by email"
                  )}
                </p>
              </div>
              <Switch
                checked={emailEnabled}
                data-testid="emailChange"
                onChange={setEmailEnabled}
                className={`ml-auto border ${emailEnabled ? "border-gray-300 bg-primary" : ""
                  } relative inline-flex h-6 w-12 items-center rounded-full`}
              >
                <span
                  className={`${emailEnabled
                      ? "bg-white translate-x-6"
                      : "bg-gray-300 translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full`}
                />
              </Switch>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
