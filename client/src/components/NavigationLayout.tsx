import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { SlSettings } from "react-icons/sl";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { useParking } from "../App";

export const NavigationLayout = () => {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [showDevices, setShowDevices] = useState<boolean>(false);
  const path = useLocation().pathname;
  const Navigate = useNavigate();

  const { API_URL, language, toggleLanguage, deviceTypes } = useParking();

  const logout = async (): Promise<void> => {
    await axios
      .post(`${API_URL}/logout`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.status);
          Navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowDevices = () => {
    setShowDevices(!showDevices);
  };

  return (
    <div className="h-full w-[30.5rem] bg-BgSecondary pt-[2rem] pb-[3rem] font-firago flex flex-col min-w-[30.5rem]">
      <div className="mx-auto w-[10.4rem] h-[10.4rem] xl:w-[13.4rem] xl:h-[13.4rem] rounded-full bg-white flex justify-center items-center px-4 mb-[2rem]">
        <img src="/images/logo.svg" alt="logo" />
      </div>

      <Link to="/">
        <div
          className={`${path == "/" ? "bg-primary text-white" : "bg-none text-black"} w-full h-[4.8rem] rounded-primary  flex justify-start items-center gap-[1.2rem] 
          text-[1.6rem] font-bold font-feature pl-[4rem] mb-4`}
        >
          <GoHome className="w-[2.4rem] h-[2.4rem]" />
          <span>მთავარი</span>
        </div>
      </Link>
      <div
        className={`${path !== "/" ? "bg-primary text-white" : "bg-none text-black"} w-full h-[4.8rem] rounded-primary flex justify-start items-center
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
        <nav className="font-feature text-[1.6rem] uppercase text-black pl-[4rem] pt-[2rem] font-medium">
          <ul className="flex flex-col gap-[1.5rem] xl:gap-[3rem]">
            <Link
              to="/services"
              className={`${path == "/services" ? "font-bold" : ""}`}
            >
              <li>მომსახურება</li>
            </Link>
            <Link
              to="/benefits"
              className={`${path == "/benefits" ? "font-bold" : ""}`}
            >
              <li>ჩვენი უპირატესობები</li>
            </Link>
            <Link to="/faq" className={`${path == "/faq" ? "font-bold" : ""}`}>
              <li>ხშირად დასმული კითხვები</li>
            </Link>
            <div>
              <li
                className={`${path.split("/")[1] === "device" ? "font-bold" : ""} cursor-pointer flex items-center gap-[2rem]`}
                onClick={handleShowDevices}
              >
                <span>მოწყობილობები</span>{" "}
                {showDevices ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </li>
              {showDevices && (
                <div className="flex flex-col gap-[1.5rem] xl:gap-[3rem] mt-[1.5rem] xl:mt-[3rem]">
                  {deviceTypes?.map((device) => (
                    <Link
                      key={device.device_type_id}
                      to={`/device/${device.device_type_id}`}
                      className={`${parseInt(path.split("/")[2]) === device.device_type_id ? "font-bold" : ""} `}
                    >
                      <li className="line-clamp-1">{device.name}</li>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="about"
              className={`${path == "/about" ? "font-bold" : ""}`}
            >
              <li>ჩვენ შესახებ</li>
            </Link>
          </ul>
        </nav>
      )}
      <div className="pl-[4rem] pr-[3.8rem] mt-auto text-[1.4rem] font-medium capitalize ">
        <div
          className={`flex justify-between items-center mb-[2rem] cursor-pointer ${language === "En" ? "text-[#063776] opacity-[0.6]" : "text-primary"}`}
          onClick={() => {
            toggleLanguage("Ge");
          }}
        >
          <span>ქარ</span>
          {language === "Ge" && <FaCheck />}
        </div>
        <div
          className={`flex justify-between items-center cursor-pointer ${language === "Ge" ? "text-[#063776] opacity-[0.6]" : "text-primary"}`}
          onClick={() => {
            toggleLanguage("En");
          }}
        >
          <span>eng</span>
          {language === "En" && <FaCheck />}
        </div>
      </div>
      <div
        className="text-[2rem] font-bold text-[#e44] font-feature flex justify-start gap-[2.4rem]  items-center pl-[4rem] mt-[2rem] xl:mt-[3.5rem] cursor-pointer"
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
