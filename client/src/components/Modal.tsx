import { Props } from "../types/interface";

export const Modal = (props: Props) => {
  return (
    <div
      className="w-screen h-screen bg-popupBackground flex justify-center items-center absolute top-0 left-0"
      {...props}
    >
      <div className="bg-white">
        {props.children}
        <div>
          <button>გაუქმება</button>
          <button>შენახვა</button>
        </div>
      </div>
    </div>
  );
};
