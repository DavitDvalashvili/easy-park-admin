import { useEffect, useState } from "react";
import axios from "axios";
import { useParking } from "../../App";
import { Modal } from "../../components/Modal";
import { LuPencilLine } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const defaultFaq = {
  faqId: "",
  question: "",
  answer: "",
  languageId: "",
};

export const Faq = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [faqs, setFaqs] = useState<faq[]>([]);
  const [faq, setFaq] = useState<faq>(defaultFaq);

  const { API_URL, language, setResponse } = useParking();

  const getFaqs = async () => {
    await axios
      .get(`${API_URL}/faqs?lan=${language}`)
      .then((res) => {
        if (res.status === 200) {
          setFaqs(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFaqs();
  }, [language]);

  useEffect(() => {
    document.title = `F.A.Q`;
  }, []);

  const updateFaq = async () => {
    if (faq.question && faq.answer) {
      await axios
        .post(`${API_URL}/updateFaq/${faq.faqId}`, faq)
        .then((res) => {
          if (res.data.status == "updated") {
            console.log(res.data);
            setFaqs(
              [...faqs.filter((item) => item.faqId !== faq.faqId), faq].sort(
                (a, b) => Number(a.faqId) - Number(b.faqId)
              )
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

  const addFaq = async () => {
    if (faq.question && faq.answer) {
      await axios
        .post(`${API_URL}/addFaq?lan=${language}`, faq)
        .then((res) => {
          if (res.data.status == "inserted") {
            setFaqs([...faqs, { ...faq, faqId: res.data.insert_id }]);
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
    setFaq(defaultFaq);
  }, [showAddModal]);

  return (
    <div className="p-[3rem] font-firago">
      <div className="font-normal text-[1.6rem] font-feature flex justify-left item-center gap-[1.3rem] mb-[4.1rem]">
        <span>ტექსტის ცვლილება/წაშლა</span>
        <LuPencilLine className="w-[1.9rem] h-[1.9rem]" />
      </div>
      <div className="flex gap-x-[3rem] gap-y-[3rem] flex-wrap  text-black">
        {faqs.map((faqItem, index) => (
          <div
            key={index}
            className="w-[42.2rem] h-[40.2rem] border border-primary rounded-primary px-8  py-4 flex flex-col justify-start
            text-[1.6rem]"
          >
            <span className="text-[2rem] uppercase font-bold leading-[2rem] pb-6">
              N {index + 1}
            </span>
            <h5 className="font-bold">კითხვა</h5>
            <p className="font-normal  text-left pt-4 pb-6">
              {faqItem.question}
            </p>
            <h5 className="font-bold">პასუხი</h5>
            <p className="font-normal  text-left pt-4">{faqItem.answer}</p>
            <button
              onClick={() => {
                setFaq(faqItem);
                setShowModal(!showModal);
              }}
              className="mt-auto w-[13.2rem] h-[3.5rem] text-[1.3rem] font-bold text-primary border
               border-primary rounded-secondary mx-auto flex items-center justify-center mb-2 hover:bg-primary hover:text-white  transition duration-300"
            >
              რედაქტირება
            </button>
          </div>
        ))}
        <div className="w-[42.2rem] h-[40.2rem] flex justify-center items-center">
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
        <Modal setShowModal={setShowModal} handleSubmit={updateFaq}>
          <div className="w-[34.3rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <h5 className="font-bold text-[1.6rem] pb-4">კითხვა</h5>
              <textarea
                placeholder="აკრიფეთ კითხვა..."
                name="question"
                value={faq.question}
                className="text-[1.3rem] font-normal min-h-[10.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setFaq({ ...faq, question: e.target.value });
                }}
              />
              <h5 className="font-bold text-[1.6rem] pb-4 pt-6">პასუხი</h5>
              <textarea
                placeholder="აკრიფეთ პასუხი..."
                name="answer"
                value={faq.answer}
                className="text-[1.3rem] font-normal min-h-[15.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setFaq({ ...faq, answer: e.target.value });
                }}
              />
            </form>
          </div>
        </Modal>
      )}
      {showAddModal && (
        <Modal setShowModal={setShowAddModal} handleSubmit={addFaq}>
          <div className="w-[34.3rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <h5 className="font-bold text-[1.6rem] pb-4">კითხვა</h5>
              <textarea
                placeholder="აკრიფეთ კითხვა..."
                name="question"
                value={faq.question}
                className="text-[1.3rem] font-normal min-h-[10.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setFaq({ ...faq, question: e.target.value });
                }}
              />
              <h5 className="font-bold text-[1.6rem] pb-4 pt-6">პასუხი</h5>
              <textarea
                placeholder="აკრიფეთ პაუხი..."
                name="answer"
                value={faq.answer}
                className="text-[1.3rem] font-normal min-h-[15.6rem] focus:outline-none resize-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setFaq({ ...faq, answer: e.target.value });
                }}
              />
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};
