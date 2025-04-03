import { useEffect, useState } from "react";
import axios from "axios";
import { useParking } from "../../App";
import { Modal } from "../../components/Modal";
import { LuPencilLine } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const defaultBenefit = {
  benefit: "",
  benefitId: "",
  languageId: "",
};

export const Benefits = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [benefits, setBenefits] = useState<benefit[]>([]);
  const [benefit, setBenefit] = useState<benefit>(defaultBenefit);

  const { API_URL, language, setResponse } = useParking();

  const getBenefits = async () => {
    await axios
      .get(`${API_URL}/benefits?lan=${language}`)
      .then((res) => {
        if (res.status === 200) {
          setBenefits(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBenefits();
  }, [language]);

  const updateBenefit = async () => {
    if (benefit.benefit) {
      await axios
        .post(`${API_URL}/updateBenefit/${benefit.benefitId}`, benefit)
        .then((res) => {
          if (res.data.status == "updated") {
            setBenefits(
              [
                ...benefits.filter(
                  (item) => item.benefitId !== benefit.benefitId
                ),
                benefit,
              ].sort((a, b) => Number(a.benefitId) - Number(b.benefitId))
            );
          }
          setShowModal(!showModal);
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addBenefit = async () => {
    if (benefit.benefit) {
      await axios
        .post(`${API_URL}/addBenefit?lan=${language}`, benefit)
        .then((res) => {
          if (res.data.status == "inserted") {
            setBenefits([
              ...benefits,
              { ...benefit, benefitId: res.data.insert_id },
            ]);
          }
          setShowAddModal(!showAddModal);
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setBenefit(defaultBenefit);
  }, [showAddModal]);

  useEffect(() => {
    document.title = "Benefits";
  }, []);

  return (
    <div className="p-[3rem] font-firago text-black">
      <div className="font-normal text-[1.6rem] font-feature flex justify-left item-center gap-[1.3rem] mb-[4.1rem]">
        <span>ტექსტის ცვლილება/წაშლა</span>
        <LuPencilLine className="w-[1.9rem] h-[1.9rem]" />
      </div>
      <div className="flex gap-x-[3rem] gap-y-[3rem] flex-wrap">
        {benefits.map((benefitItem, index) => (
          <div
            key={index}
            className="w-[34.3rem] h-[29rem] border border-primary rounded-primary px-8  py-4 flex flex-col justify-start"
          >
            <span className="text-[2rem] uppercase font-bold leading-[2rem]">
              N {index + 1}
            </span>
            <p className="text-[1.6rem]  mt-[2.3rem] font-medium  text-center ">
              {benefitItem.benefit}
            </p>
            <button
              onClick={() => {
                setBenefit(benefitItem);
                setShowModal(!showModal);
              }}
              className="mt-auto w-[13.2rem] h-[3.5rem] text-[1.3rem] font-bold text-primary border
               border-primary rounded-secondary mx-auto flex items-center justify-center mb-[0.8rem] hover:bg-primary hover:text-white  transition duration-300"
            >
              რედაქტირება
            </button>
          </div>
        ))}
        <div className="flex justify-center item-center w-[34.3rem] h-[29rem]">
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
        </div>
      </div>

      {showModal && (
        <Modal setShowModal={setShowModal} handleSubmit={updateBenefit}>
          <div className="w-[34.3rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <textarea
                placeholder="აკრიფეთ ტექსტი..."
                name="benefit"
                value={benefit.benefit}
                className="text-[1.3rem] font-normal min-h-[14.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setBenefit({ ...benefit, benefit: e.target.value });
                }}
              />
            </form>
          </div>
        </Modal>
      )}
      {showAddModal && (
        <Modal setShowModal={setShowAddModal} handleSubmit={addBenefit}>
          <div className="w-[34.3rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <textarea
                placeholder="აკრიფეთ ტექსტი..."
                name="benefit"
                value={benefit.benefit}
                className="text-[1.3rem] font-normal min-h-[14.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setBenefit({ ...benefit, benefit: e.target.value });
                }}
              />
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};
