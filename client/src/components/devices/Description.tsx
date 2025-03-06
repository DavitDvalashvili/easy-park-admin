import { LuPencilLine } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import { useParking } from "../../App";
import { Modal } from "../Modal";
import axios from "axios";

type devices = {
  devices: device[];
};

const defaultDevice = {
  deviceId: "",
  name: "",
  description: "",
  languageId: "",
};

const Description = ({ devices }: devices) => {
  const [device, setDevice] = useState<device>(defaultDevice);
  const [description, setDescription] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newParagraph, setNewParagraph] = useState<string>("");

  // Temporary states for modal form
  const [tempDevice, setTempDevice] = useState<device>(defaultDevice);
  const [tempParagraphs, setTempParagraphs] = useState<string[]>([]);

  const { API_URL, setResponse } = useParking();

  console.log(devices);

  useEffect(() => {
    if (devices?.[0]?.description) {
      setDescription(JSON.parse(devices[0].description));
      setDevice(devices?.[0]);
    }
  }, [devices]);

  const updateDeviceDescription = async () => {
    try {
      const updatedDevice = {
        ...tempDevice,
        description: JSON.stringify(tempParagraphs.filter((a) => a !== "")),
      };

      const res = await axios.post(
        `${API_URL}/updateDevice/${device.deviceId}`,
        updatedDevice
      );

      if (res.status === 200) {
        setDevice(updatedDevice);
        setDescription(tempParagraphs.filter((a) => a !== ""));
        setShowModal(false);
        setResponse(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addDeviceDescription = async () => {
    try {
      const updatedData = {
        ...device,
        description: JSON.stringify([
          ...JSON.parse(device.description),
          newParagraph,
        ]),
      };

      if (newParagraph) {
        const res = await axios.post(
          `${API_URL}/updateDevice/${device.deviceId}`,
          updatedData
        );

        if (res.data.status === "updated") {
          setDevice(updatedData);
          setDescription([...JSON.parse(device.description), newParagraph]);
          setShowAddModal(false);
          setResponse(res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setNewParagraph("");
  }, [showAddModal]);

  return (
    <div>
      <div className="font-normal text-[1.6rem] font-feature flex justify-left item-center gap-[1.3rem] mb-[4.1rem]">
        <span>ტექსტის ცვლილება/წაშლა</span>
        <LuPencilLine className="w-[1.9rem] h-[1.9rem]" />
      </div>
      <div className="flex justify-start items-center gap-[3rem]">
        <div className="border border-primary rounded-primary px-8  py-4 flex flex-col justify-start w-full">
          <span className="text-[2rem] uppercase font-bold leading-[2rem]">
            N 1
          </span>
          <h3 className="font-bold text-[1.6rem] py-4">{device.name}</h3>
          <div className="flex flex-col justify-start gap-4 mb-8">
            {description.length > 0 &&
              description.map((text, index) => (
                <p key={index} className="text-[1.4rem] font-normal">
                  {text}
                </p>
              ))}
          </div>
          <button
            onClick={() => {
              setTempDevice(device);
              setTempParagraphs(JSON.parse(device.description));
              setShowModal(!showModal);
            }}
            className="mt-auto w-[13.2rem] h-[3.5rem] text-[1.3rem] font-bold text-primary border
               border-primary rounded-secondary mx-auto flex items-center justify-center mb-2 hover:bg-primary hover:text-white  transition duration-300"
          >
            რედაქტირება
          </button>
        </div>
        <div className="w-[17.4rem]">
          <div
            className=" h-[18.1rem] border border-primary rounded-primary text-primary flex 
                  justify-center items-center flex-col gap-[0.4rem] cursor-pointer"
            onClick={() => {
              setShowAddModal(!showAddModal);
            }}
          >
            <GoPlus className="w-[3.2rem] h-[3.2rem]" />
            <span className="text-[1.2rem] font-bold">დაამატე ტექსტი</span>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          handleSubmit={updateDeviceDescription}
        >
          <div className="w-[99.7rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <input
                placeholder="აკრიფეთ ტექსტი..."
                type="text"
                name="title"
                value={tempDevice?.name}
                className="text-[1.4rem] font-bold focus:outline-none border-[0.05rem] border-primary rounded-primary p-[0.8rem] mb-4"
                onChange={(e) =>
                  setTempDevice({ ...tempDevice, name: e.target.value })
                }
              />
              <div className="flex flex-col gap-4">
                {tempParagraphs.map((paragraph, index) => (
                  <textarea
                    key={index}
                    placeholder="აკრიფეთ ტექსტი..."
                    name="description"
                    value={paragraph}
                    className="text-[1.4rem] font-normal min-h-[10.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                    onChange={(e) => {
                      const updatedParagraphs = [...tempParagraphs];
                      updatedParagraphs[index] = e.target.value;
                      setTempParagraphs(updatedParagraphs);
                    }}
                  />
                ))}
              </div>
            </form>
          </div>
        </Modal>
      )}
      {showAddModal && (
        <Modal
          setShowModal={setShowAddModal}
          handleSubmit={addDeviceDescription}
        >
          <div className="w-[99.7rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <textarea
                placeholder="აკრიფეთ ტექსტი..."
                name="benefit"
                value={newParagraph}
                className="text-[1.3rem] font-normal min-h-[14.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setNewParagraph(e.target.value);
                }}
              />
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Description;
