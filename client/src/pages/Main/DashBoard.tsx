import { Link } from "react-router-dom";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useParking } from "../../App";

const DashBoard = () => {
  const [showDevices, setShowDevices] = useState<boolean>(false);

  const { deviceTypes } = useParking();

  const handleShowDevices = () => {
    setShowDevices(!showDevices);
  };

  return (
    <div>
      <nav>
        <ul className="pt-[3.9rem] pl-[2.8rem] pr-[8rem] flex flex-col gap-[3rem] font-firago text-black text-[1.6rem] font-feature">
          <Link
            to="/services"
            className="rounded-[3rem] border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem] 
            hover:font-bold hover:bg-primary hover:text-white transition duration-300"
          >
            <li>მომსახურება</li>
          </Link>
          <Link
            to="/benefits"
            className="rounded-[3rem] border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
            hover:font-bold hover:bg-primary hover:text-white transition duration-300"
          >
            <li>ჩვენი უპირატესობები</li>
          </Link>
          <Link
            to="/faq"
            className="rounded-[3rem] border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
            hover:font-bold hover:bg-primary hover:text-white transition duration-300"
          >
            <li>ხშირად დასმული კითხვები</li>
          </Link>
          <div
            className="rounded-[3rem] border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
          hover:font-bold hover:bg-primary hover:text-white transition duration-300"
          >
            <li
              className="cursor-pointer flex items-center gap-[2rem]"
              onClick={handleShowDevices}
            >
              <span>მოწყობილობები</span>{" "}
              {showDevices ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </li>
            {showDevices && (
              <div className="pt-[2rem] flex flex-col gap-[2rem] text-[1.4rem] ">
                {deviceTypes?.map((device) => (
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
          <Link
            to="/about"
            className="rounded-[3rem] border border-primary height-[5rem] py-[1.5rem] pl-[2.6rem]
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
