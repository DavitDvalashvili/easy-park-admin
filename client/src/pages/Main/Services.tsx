import { LuPencilLine } from "react-icons/lu";
import axios from "axios";
import { useParking } from "../../App";
import { useEffect, useState } from "react";

export const Services = () => {
  const [services, setServices] = useState<service[]>([]);
  const { API_URL, language } = useParking();

  const getServices = async () => {
    await axios
      .get(`${API_URL}/services?lan=${language}`)
      .then((res) => {
        if (res.status == 200) {
          setServices(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  console.log(services);

  return (
    <div className="pt-[3.3rem] pl-[3rem] font-firago">
      <div className="font-normal text-[1.6rem] font-feature flex justify-left item-center gap-[1.3rem] mb-[4.1rem]">
        <span>ტექსტის ცვლილება/წაშლა</span>
        <LuPencilLine className="w-[1.9rem] h-[1.9rem]" />
      </div>
      <div className="flex bg-red-200 gap-x-[3rem] gap-y-[3rem] flex-wrap  text-black">
        {services.map((service, index) => (
          <div
            key={service.service_id}
            className="w-[34.25rem] h-[26.5rem] border border-primary rounded-primary p-4"
          >
            <span className="text-[2rem] uppercase font-bold">
              N {index + 1}
            </span>
            <h3 className="pt-[1.1rem] text-[1.4rem] font-bold">
              {service.service_name}
            </h3>
            <h5 className="py-[0.6rem] text-[1.4rem] font-bold">
              {service.title}
            </h5>
            <p className="text-[1.3rem] font-normal">{service.description}</p>
            <button className="mt-auto">რედაქტირება</button>
          </div>
        ))}
      </div>
    </div>
  );
};
