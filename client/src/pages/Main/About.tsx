import axios from "axios";
import { useEffect, useState } from "react";
import { useParking } from "../../App";
import { Modal } from "../../components/Modal";
import { LuPencilLine } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const defaultAbout = {
  Id: "",
  title: "",
  subtitle: "",
  description: "",
  languageId: "",
};

export const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [about, setAbout] = useState(defaultAbout);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [newParagraph, setNewParagraph] = useState<string>("");

  // Temporary states for modal form
  const [tempAbout, setTempAbout] = useState(defaultAbout);
  const [tempParagraphs, setTempParagraphs] = useState<string[]>([]);

  const { API_URL, language, setResponse } = useParking();

  const getAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/about?lan=${language}`);
      if (res.status === 200) {
        console.log(res.data);
        setAbout(res.data);
        setParagraphs(JSON.parse(res.data.description));
        console.log(JSON.parse(res.data.description));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAbout();
  }, [language]);

  const updateAbout = async () => {
    try {
      const updatedData = {
        ...tempAbout,
        description: JSON.stringify(tempParagraphs.filter((a) => a !== "")),
      };

      const res = await axios.post(
        `${API_URL}/updateAbout/${about.Id}`,
        updatedData
      );

      if (res.status === 200) {
        setAbout(updatedData);
        setParagraphs(tempParagraphs.filter((a) => a !== ""));
        setShowModal(false);
        setResponse(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addAbout = async () => {
    try {
      const updatedData = {
        ...about,
        description: JSON.stringify([
          ...JSON.parse(about.description),
          newParagraph,
        ]),
      };

      if (newParagraph) {
        const res = await axios.post(
          `${API_URL}/updateAbout/${about.Id}`,
          updatedData
        );

        if (res.data.status === "updated") {
          setAbout(updatedData);
          setParagraphs([...JSON.parse(about.description), newParagraph]);
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
    <div className="p-[3rem] pr-[10.8rem] font-firago">
      <div className="font-normal text-[1.6rem] font-feature flex justify-left item-center gap-[1.3rem] mb-[4.1rem]">
        <span>ტექსტის ცვლილება/წაშლა</span>
        <LuPencilLine className="w-[1.9rem] h-[1.9rem]" />
      </div>
      <div className="flex gap-x-[3rem] gap-y-[3rem] flex-wrap text-black">
        <div className="w-full border border-primary rounded-primary px-8 py-4 flex flex-col justify-start">
          <span className="text-[2rem] uppercase font-bold leading-[2rem] mb-[3rem]">
            N 1
          </span>
          <h3 className="text-[1.6rem] font-bold pb-[1.2rem]">{about.title}</h3>
          <h5 className="text-[1.6rem] font-bold pb-[1.2rem]">
            {about.subtitle}
          </h5>

          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[1.4rem] mb-[1.2rem] font-medium text-left"
            >
              {paragraph}
            </p>
          ))}

          <button
            onClick={() => {
              setTempAbout(about);
              setTempParagraphs([...paragraphs]);
              setShowModal(true);
            }}
            className="mt-auto w-[13.2rem] h-[3.5rem] text-[1.3rem] font-bold text-primary border border-primary rounded-secondary mx-auto flex items-center justify-center mb-[0.8rem] hover:bg-primary hover:text-white transition duration-300"
          >
            რედაქტირება
          </button>
        </div>
      </div>
      <div className=" w-[17.4rem] pt-[3rem]">
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
      {showModal && (
        <Modal setShowModal={setShowModal} handleSubmit={updateAbout}>
          <div className="w-[99.7rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <input
                placeholder="აკრიფეთ ტექსტი..."
                type="text"
                name="title"
                value={tempAbout.title}
                className="text-[1.4rem] font-bold focus:outline-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) =>
                  setTempAbout({ ...tempAbout, title: e.target.value })
                }
              />
              <input
                placeholder="აკრიფეთ ტექსტი..."
                type="text"
                name="subtitle"
                value={tempAbout.subtitle}
                className="my-4 text-[1.4rem] font-bold focus:outline-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) =>
                  setTempAbout({ ...tempAbout, subtitle: e.target.value })
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
        <Modal setShowModal={setShowAddModal} handleSubmit={addAbout}>
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
