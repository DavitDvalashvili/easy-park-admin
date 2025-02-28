import { useEffect } from "react";
import { useParking } from "../App";

export const Notification = () => {
  const { response, setResponse } = useParking();

  useEffect(() => {
    setTimeout(() => {
      setResponse(null);
    }, 500);
  });

  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-popupBackground font-firago ">
      <div
        className="rounded-[2rem] font-bold
       text-[#484848] text-[2rem] lg:text-[3.5rem] font-feature p-[4rem]  lg:mx-[10rem] bg-white lg:px-[12.8rem] lg:py-[8.8rem]"
      >
        <p className="text-center pb-[2rem] lg:pb-[3.5rem]">
          {response?.message}
        </p>
        {response?.status && (
          <>
            {["inserted", "updated", "deleted"].includes(response.status) && (
              <img
                src="/images/notification/success.svg"
                alt="success"
                className="mx-auto w-[10.4rem] lg:w-[15.4rem] "
              />
            )}
            {[
              "insert_exists",
              "insert_error",
              "update_error",
              "delete_error",
              "update_exists",
            ].includes(response.status) && (
              <img
                src="/images/notification/fail.svg"
                alt="error"
                className="mx-auto w-[10.4rem] lg:w-[15.4rem]"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
