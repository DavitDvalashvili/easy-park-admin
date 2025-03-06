import { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";

type images = {
  Images: image[] | undefined;
};
const ImagesBox = ({ Images }: images) => {
  const [images, setImages] = useState<image[]>([]);

  useEffect(() => {
    if (Images?.[0]?.imageUrl) {
      setImages(Images);
    }
  }, [Images]);

  console.log(images);

  return (
    <div className="pt-[3rem] font-firago">
      <div className="font-normal text-[1.6rem] font-feature flex justify-left item-center gap-[1.3rem] mb-[4.1rem]">
        <span>ტექსტის ცვლილება/წაშლა</span>
        <LuPencilLine className="w-[1.9rem] h-[1.9rem]" />
      </div>
      <div className="flex gap-x-[3rem] gap-y-[3rem] flex-wrap  text-black">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-[28.5rem] h-[23.5rem] border border-primary rounded-primary px-8  py-4 flex flex-col justify-start"
          >
            <span className="text-[2rem] uppercase font-bold leading-[2rem]">
              N {index + 1}
            </span>

            <img
              src={image.imageUrl}
              alt="device"
              className="h-[13.3rem] mb-[1.6rem]"
            />
            <button
              // onClick={() => {
              //   setBenefit(benefitItem);
              //   setShowModal(!showModal);
              // }}
              className="mt-auto w-[13.2rem] h-[3.5rem] text-[1.3rem] font-bold text-primary border
                 border-primary rounded-secondary mx-auto flex items-center justify-center  mb-[0.8rem] hover:bg-primary hover:text-white  transition duration-300"
            >
              რედაქტირება
            </button>
          </div>
        ))}
      </div>
      <div className=" w-[17.4rem] pt-[3rem]">
        <div
          className=" h-[18.1rem] border border-primary rounded-primary text-primary flex 
            justify-center items-center flex-col gap-[0.4rem] cursor-pointer"
          // onClick={() => {
          //   setShowAddModal(!showAddModal);
          // }}
        >
          <GoPlus className="w-[3.2rem] h-[3.2rem]" />
          <span className="text-[1.2rem] font-bold">დაამატე ფოტო</span>
        </div>
      </div>
      {/* {showModal && (
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
      )} */}
      {/* {showAddModal && (
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
      )} */}
    </div>
  );
};

export default ImagesBox;
