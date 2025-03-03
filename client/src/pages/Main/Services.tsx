import { LuPencilLine } from "react-icons/lu";
import axios from "axios";
import { useParking } from "../../App";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";

const defaultService = {
  description: "",
  serviceId: "",
  languageId: "",
  serviceName: "",
  title: "",
};

export const Services = () => {
  const [services, setServices] = useState<service[]>([]);
  const [service, setService] = useState<service>(defaultService);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { API_URL, language, setResponse } = useParking();

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
  }, [language]);

  const updateService = async () => {
    await axios
      .post(`${API_URL}/updateService/${service.serviceId}`, service)
      .then((res) => {
        if (res.data.status == "updated") {
          setServices(
            [
              ...services.filter(
                (item) => item.serviceId !== service.serviceId
              ),
              service,
            ].sort((a, b) => Number(a.serviceId) - Number(b.serviceId))
          );
        }
        setShowModal(!showModal);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-[3rem] font-firago">
      <div className="font-normal text-[1.6rem] font-feature flex justify-left item-center gap-[1.3rem] mb-[4.1rem]">
        <span>ტექსტის ცვლილება/წაშლა</span>
        <LuPencilLine className="w-[1.9rem] h-[1.9rem]" />
      </div>
      <div className="flex gap-x-[3rem] gap-y-[3rem] flex-wrap  text-black">
        {services.map((serviceItem, index) => (
          <div
            key={index}
            className="w-[34.3rem] h-[29rem] border border-primary rounded-primary p-4 flex flex-col justify-start"
          >
            <span className="text-[2rem] uppercase font-bold leading-[2rem]">
              N {index + 1}
            </span>
            <h3 className="pt-[1.1rem] text-[1.4rem] font-bold">
              {serviceItem.serviceName}
            </h3>
            <h5 className="py-[0.6rem] text-[1.4rem] font-bold">
              {serviceItem.title}
            </h5>
            <p className="text-[1.3rem] font-normal mb-4 ">
              {serviceItem.description}
            </p>
            <button
              onClick={() => {
                setService(serviceItem);
                setShowModal(!showModal);
              }}
              className="mt-auto w-[13.2rem] h-[3.5rem] text-[1.3rem] font-bold text-primary border
             border-primary rounded-secondary mx-auto flex items-center justify-center hover:bg-primary
              hover:text-white  transition duration-300"
            >
              რედაქტირება
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} handleSubmit={updateService}>
          <div className="w-[34.3rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <input
                type="text"
                name="serviceName"
                value={service.serviceName}
                className=" text-[1.4rem] font-bold focus:outline-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setService({ ...service, serviceName: e.target.value });
                }}
              />
              <input
                type="text"
                name="title"
                value={service.title}
                className="my-[0.6rem] text-[1.4rem] font-bold focus:outline-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setService({ ...service, title: e.target.value });
                }}
              />
              <textarea
                name="description"
                value={service.description}
                className="text-[1.3rem] font-normal min-h-[15.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setService({ ...service, description: e.target.value });
                }}
              />
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};
