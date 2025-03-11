import { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { Modal } from "../Modal";
import axios from "axios";
import { useParking } from "../../App";
import { useParams } from "react-router-dom";

type features = {
  Features: feature[] | undefined;
};

const defaultFeature = {
  featureId: "",
  feature: "",
  languageId: "",
};

const Features = ({ Features }: features) => {
  const [features, setFeatures] = useState<feature[]>([]);
  const [feature, setFeature] = useState<feature>(defaultFeature);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { id } = useParams();

  const { API_URL, setResponse, language } = useParking();

  useEffect(() => {
    if (Features?.[0]?.feature) {
      setFeatures(Features);
    }
  }, [Features]);

  const updateFeature = async () => {
    if (feature.feature) {
      await axios
        .post(`${API_URL}/updateFeature/${feature.featureId}`, feature)
        .then((res) => {
          if (res.data.status == "updated") {
            setFeatures(
              [
                ...features.filter((f) => f.featureId !== feature.featureId),
                feature,
              ].sort((a, b) => Number(a.featureId) - Number(b.featureId))
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

  useEffect(() => {
    setFeature(defaultFeature);
  }, [showAddModal]);

  const addFeature = async () => {
    if (feature.feature) {
      await axios
        .post(
          `${API_URL}/addFeature?lan=${language}&deviceTypeId=${id}`,
          feature
        )
        .then((res) => {
          if (res.data.status == "inserted") {
            setFeatures([
              ...features,
              { ...feature, featureId: res.data.insert_id },
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

  const deleteFeature = async () => {
    await axios
      .delete(`${API_URL}/deleteFeature/${feature.featureId}`)
      .then((res) => {
        if (res.data.status == "deleted") {
          setFeatures([
            ...features.filter((f) => f.featureId !== feature.featureId),
          ]);
        }
        setShowDeleteModal(!showDeleteModal);
        setResponse(res.data);
        setFeature(defaultFeature);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-start items-center gap-[3rem] mt-[3rem]">
      <div className="border border-primary rounded-primary px-8  py-4 flex flex-col justify-start w-full">
        <span className="text-[2rem] uppercase font-bold leading-[2rem]">
          N 2
        </span>
        <div className="flex flex-col justify-start gap-8 my-[2rem]">
          {features.length > 0 &&
            features.map((feature) => (
              <div
                key={feature.featureId}
                className=" flex justify-start items-center"
              >
                <div
                  key={feature.featureId}
                  className="flex gap-[1.6rem]  w-full"
                >
                  <img src="/images/device/checkmark.svg" alt="checkmark" />
                  <p className="text-[1.4rem] font-normal ">
                    {feature.feature}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFeature(feature);
                    setShowDeleteModal(!showDeleteModal);
                  }}
                  className="w-[12.2rem] h-[3rem] text-[1.2rem] font-bold text-errorRed border
                  border-errorRed rounded-primary mx-auto flex items-center justify-center 
                   hover:bg-errorRed hover:text-white  transition duration-300 mr-4"
                >
                  წაშლა
                </button>
                <button
                  onClick={() => {
                    setFeature(feature);
                    setShowModal(!showModal);
                  }}
                  className="w-[12.2rem] h-[3rem] text-[1.2rem] font-bold text-primary border
                  border-primary rounded-primary mx-auto flex items-center justify-center 
                   hover:bg-primary hover:text-white  transition duration-300"
                >
                  რედაქტირება
                </button>
              </div>
            ))}
        </div>
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
      {showModal && (
        <Modal setShowModal={setShowModal} handleSubmit={updateFeature}>
          <div className="w-[34.3rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <input
                key={feature.featureId}
                placeholder="აკრიფეთ ტექსტი..."
                name="description"
                value={feature.feature}
                className="text-[1.4rem] font-normal focus:outline-none border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setFeature({ ...feature, feature: e.target.value });
                }}
              />
            </form>
          </div>
        </Modal>
      )}
      {showAddModal && (
        <Modal setShowModal={setShowAddModal} handleSubmit={addFeature}>
          <div className="w-[34.3rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <input
                placeholder="აკრიფეთ ტექსტი..."
                name="benefit"
                value={feature.feature}
                className="text-[1.3rem] font-normal focus:outline-none  border-[0.05rem] border-primary rounded-primary p-[0.8rem]"
                onChange={(e) => {
                  setFeature({ ...feature, feature: e.target.value });
                }}
              />
            </form>
          </div>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal setShowModal={setShowDeleteModal} handleSubmit={deleteFeature}>
          <div className="w-[34.3rem] mt-2 mb-[2rem]">
            <form className="flex flex-col">
              <div className="text-[1.3rem] font-medium  border-[0.05rem] border-primary rounded-primary p-[0.8rem] text-center ">
                ნამდვილად გსურთ მახასიათებლის წაშლა?
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Features;
