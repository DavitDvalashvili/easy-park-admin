import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { SlSettings } from "react-icons/sl";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParking } from "../App";

type deviceType = {
  device_type_id: string | number;
  device_type: string;
  name: string;
};

export const NavigationLayout = () => {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [showDevices, setShowDevices] = useState<boolean>(false);
  const [devices, setDevices] = useState<deviceType[] | null>(null);

  const path = useLocation().pathname;
  const Navigate = useNavigate();

  const { API_URL } = useParking();

  const getDeviceType = async () => {
    await axios
      .get(`${API_URL}/deviceType`)
      .then((res) => {
        if (res.status === 200) {
          setDevices(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async (): Promise<void> => {
    await axios
      .get(`${API_URL}/logout`)
      .then((res) => {
        if (res.status === 200) {
          Navigate("/login");
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDeviceType();
  }, []);

  const handleShowDevices = () => {
    setShowDevices(!showDevices);
  };

  return (
    <div className="h-full w-[30.5rem] bg-BgSecondary pt-[2rem] pb-[3rem] font-firago flex flex-col ">
      <div className="mx-auto w-[13.4rem] h-[13.4rem] rounded-full bg-white flex justify-center items-center px-4 mb-[2.8rem]">
        <img src="/images/logo.svg" alt="logo" />
      </div>

      <Link to="/">
        <div
          className={`${path == "/" ? "bg-primary text-white" : "bg-none text-black"} w-full h-[4.8rem] rounded-custom  flex justify-start items-center gap-[1.2rem] 
          text-[1.6rem] font-bold font-feature pl-[4rem] mb-8`}
        >
          <GoHome className="w-[2.4rem] h-[2.4rem]" />
          <span>მთავარი</span>
        </div>
      </Link>
      <div
        className={`${showNavBar && path !== "/" ? "bg-primary text-white" : "bg-none text-black"} w-full h-[4.8rem] rounded-custom flex justify-start items-center
        gap-[1.2rem] text-[1.6rem] font-bold font-feature pl-[4rem] pr-8 cursor-pointer`}
        onClick={() => {
          setShowNavBar(!showNavBar);
        }}
      >
        <SlSettings className="w-[2.4rem] h-[2.4rem]" />
        <span>პარამეტრები</span>
        {showNavBar ? (
          <MdKeyboardArrowUp className="ml-auto" />
        ) : (
          <MdKeyboardArrowDown className="ml-auto" />
        )}
      </div>
      {showNavBar && (
        <nav className="font-feature text-[1.6rem] uppercase text-black pl-[4rem] pt-[3rem] font-medium">
          <ul className="flex flex-col gap-[3rem]">
            <Link to="/services">
              <li>მომსახურება</li>
            </Link>
            <Link to="/benefits">
              <li>ჩვენი უპირატესობები</li>
            </Link>
            <Link to="/faq">
              <li>ხშირად დასმული კითხვები</li>
            </Link>
            <div>
              <li
                className="cursor-pointer flex items-center gap-[2rem]"
                onClick={handleShowDevices}
              >
                <span>მოწყობილობები</span>{" "}
                {showDevices ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </li>
              {showDevices && (
                <div className=" pl-4 pt-[2rem] flex flex-col gap-[2rem] text-[1.4rem] ">
                  {devices?.map((device) => (
                    <Link
                      key={device.device_type_id}
                      to={`/device/${device.device_type_id}`}
                      onClick={handleShowDevices}
                    >
                      <li className="line-clamp-1">{device.name}</li>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="about">
              <li>ჩვენ შესახებ</li>
            </Link>
          </ul>
        </nav>
      )}
      <div
        className="text-[2rem] font-bold text-[#e44] font-feature flex justify-start gap-[2.4rem]  items-center pl-[4rem] mt-auto cursor-pointer"
        onClick={() => {
          logout();
        }}
      >
        <RxExit className="w-[3.4rem] h-[3.4rem]" />
        <span>გასვლა</span>
      </div>
    </div>
  );
};
