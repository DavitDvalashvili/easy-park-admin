import { Link } from "react-router-dom";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useParking } from "../../App";
import { useEffect } from "react";

const DashBoard = () => {
  const [showDevices, setShowDevices] = useState<boolean>(false);

  const { deviceTypes } = useParking();

  const handleShowDevices = () => {
    setShowDevices(!showDevices);
  };

  useEffect(() => {
    document.title = `Easy Park - Admin Panel`;
  }, []);

  return (
    <div>
      <nav>
        <ul className="pt-[3.9rem] pl-[2.8rem] pr-[8rem] flex flex-col gap-[2rem] font-firago text-black text-[1.6rem] font-feature">
          <Link
            to="/services"
            className="rounded-secondary border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem] 
            hover:font-bold hover:bg-primary hover:text-white transition duration-300"
          >
            <li>მომსახურება</li>
          </Link>
          <Link
            to="/benefits"
            className="rounded-secondary border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
            hover:font-bold hover:bg-primary hover:text-white transition duration-300"
          >
            <li>ჩვენი უპირატესობები</li>
          </Link>
          <Link
            to="/faq"
            className="rounded-secondary border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
            hover:font-bold hover:bg-primary hover:text-white transition duration-300"
          >
            <li>ხშირად დასმული კითხვები</li>
          </Link>
          <div
            className={`rounded-secondary border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
             hover:font-bold hover:bg-primary hover:text-white transition duration-300 cursor-pointer 
             ${showDevices ? "bg-primary text-white" : ""}`}
          >
            <li
              className="cursor-pointer flex items-center gap-[2rem]"
              onClick={handleShowDevices}
            >
              <span>მოწყობილობები</span>{" "}
              {showDevices ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </li>
          </div>
          {showDevices && (
            <div className="flex flex-col gap-[2rem] ">
              {deviceTypes?.map((device) => (
                <Link
                  key={device.device_type_id}
                  to={`/device/${device.device_type_id}`}
                  onClick={handleShowDevices}
                  className="rounded-secondary border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
                  hover:font-bold hover:bg-primary hover:text-white transition duration-300"
                >
                  <li className="line-clamp-1">{device.name}</li>
                </Link>
              ))}
            </div>
          )}
          <Link
            to="/about"
            className="rounded-secondary border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
            hover:font-bold hover:bg-primary hover:text-white transition duration-300"
          >
            <li>ჩვენს შესახებ</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default DashBoard;
