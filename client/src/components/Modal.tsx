import { Props } from "../types/interface";

export const Modal = ({ setShowModal, handleSubmit, children }: Props) => {
  return (
    <div className="w-screen h-screen bg-popupBackground flex justify-center items-center absolute top-0 left-0">
      <div className="bg-white rounded-primary p-8 ">
        {children}
        <div className="flex justify-center items-center gap-[3.1rem]">
          <button
            className="text-[1.3rem] w-[13.2rem] h-[3.5rem] rounded-secondary bg-buttonBackground text-white"
            onClick={() => {
              setShowModal(false);
            }}
          >
            გაუქმება
          </button>
          <button
            className="text-[1.3rem] w-[13.2rem] h-[3.5rem] rounded-secondary bg-primary text-white"
            onClick={() => {
              handleSubmit();
            }}
          >
            შენახვა
          </button>
        </div>
      </div>
    </div>
  );
};
