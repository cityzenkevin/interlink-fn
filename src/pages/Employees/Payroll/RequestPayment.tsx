import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";

import Table from "../../../components/Table";

import { createApiData, fetchApiData } from "../../../redux/features";
import Button from "../../../components/Button";
import { AiOutlineCheck, AiOutlineSend } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import { toast } from "react-toastify";

export default function RequestPayment() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [attendance, setPayroll] = useState<any>({});
  const [month, setMonth] = useState<any>(new Date().getMonth() + 1);

  const { loading } = useAppSelector((state) => state.api);

  let data = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData("/employees"));
  }, [dispatch]);

  const handleSelectAllAbsent = () => {
    let obj: any = {};
    data?.employees?.forEach((e: any) => {
      obj[e.id] = false;
    });
    setPayroll(obj);
  };

  const handleSelectAllPresent = () => {
    let obj: any = {};
    data?.employees?.forEach((e: any) => {
      obj[e.id] = true;
    });
    setPayroll(obj);
  };

  const handlePresentChange = (e: any) => {
    const { id } = e.target;
    const v = Object.keys(attendance).length === 0;
    if (v) {
    }
    setPayroll((prevAttendance: any) => ({
      ...prevAttendance,
      [id]: true,
    }));
  };

  const handleAbsentChange = (e: any) => {
    const { id } = e.target;
    setPayroll((prevAttendance: any) => ({
      ...prevAttendance,
      [id]: !prevAttendance[id],
    }));
  };
  const handleSubmit = async () => {
    if(!month) return toast.error("Please select a month")
    try {
      await dispatch(
        createApiData({
          body: {
            employees: attendance,
            month,
          },
          url: "/finance/payrolls",
        })
      ).unwrap();
      toast.success("Payment request made successfully");
      setPayroll({});
      dispatch(fetchApiData("/finance/payrolls"));
      navigate("/dashboard/payroll");
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
        toast.error("An unknown error occurred");
      }
    }
  };

  const generateColumns = () => {
    const columns = [
      {
        Header: `${t("First Name")}`,
        accessor: "user.firstname",
      },
      {
        Header: `${t("Last Name")}`,
        accessor: "user.lastname",
      },

      {
        Header: "Email",
        accessor: "user.email",
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row, attendance }: any) => {
          let a = attendance;
          return (
            <div className="flex justify-evenly">
              <div className="flex">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    key={`checkbox-${row.original.id}`}
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    id={`${row.original.id}`}
                    checked={a[row.original.id]}
                    onChange={handlePresentChange}
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxChecked"
                  >
                    {t("Request")}
                  </label>
                </div>
              </div>
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem]
                   border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none
                    before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full
                     before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent]
                      before:content-[''] checked:border-red-500 checked:bg-red-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem]
                       checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0
                        checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer
                         hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 
                         focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute
                          focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-['']
                           checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px 
                           checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem]
                            checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent 
                            "
                  type="checkbox"
                  checked={!a[row.original.id]}
                  key={`checkbox-${row.original.id}`}
                  id={`${row.original.id}`}
                  onChange={handleAbsentChange}
                />

                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="checkboxChecked"
                >
                  {t("Don't Request")}
                </label>
              </div>
            </div>
          );
        },
      },
    ];
    return columns;
  };

  if (data?.employees) {
    if (Object.keys(attendance).length === 0) {
      let obj: any = {};
      data?.employees?.forEach((e: any) => {
        obj[e.id] = false;
      });
      setPayroll(obj);
    }
  }

  return (
    <div className="mt-24">
      <div className="ml-52 mb-2 flex justify-end">
        <Button
          variant="primary"
          size="md"
          onClick={handleSelectAllPresent}
          style=" p-2 flex rounded-sm mr-2 text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <AiOutlineCheck className="mt-[2px] w-6 h-5" />
          Select all
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleSelectAllAbsent}
          style=" p-2 flex rounded-sm  mr-4 md:mr-20  text-red-500 border border-red-500 shadow-sm hover:bg-red-500 hover:text-white "
        >
          <HiXMark className="mt-[2px] w-6 h-5" />
          Unselect all
        </Button>
      </div>
      {!loading && (
        <>
          <Table
            data={data?.employees ?? []}
            columns={generateColumns() ?? []}
            title="Request payment"
            attendance={attendance}
            placeholder="Find by first name, last name, or email"
            styles=" text-primary  bg-white"
          >
            <div className="ml-auto -mr-20 mt-10  flex justify-end">
              <div className="mr-4">
                <input
                  type="month"
                  name="month"
                  value={month}
                  onChange={(e: any) => setMonth(e.target.value)}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => handleSubmit()}
                style=" p-2 flex rounded-sm -mt-4 mr-4 md:mr-20 bg-primary text-white border border-primary shadow-sm hover:bg-white hover:text-primary "
              >
                <AiOutlineSend className="mt-[2px] w-6 h-5" />
                Request Payment
              </Button>
            </div>
          </Table>
        </>
      )}
    </div>
  );
}
