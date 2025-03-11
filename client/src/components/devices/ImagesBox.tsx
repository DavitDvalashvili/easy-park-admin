import { useState, useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";
import { Modal } from "../Modal";
import axios from "axios";
import { useParking, UseParking } from "../../App";

type Image = {
  imageUrl: string;
};

type ImagesProps = {
  Images: Image[] | undefined;
};

const ImagesBox = ({ Images }: ImagesProps) => {
  const [images, setImages] = useState<Image[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { API_URL } = useParking();

  useEffect(() => {
    if (Images?.length) {
      setImages(Images);
    }
  }, [Images]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setShowModal(true);
    }
  };

  const addImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      await axios
        .post(`${API_URL}/addImage`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // if (previewUrl) {
    //   setImages((prev) => [...prev, { imageUrl: previewUrl }]);
    //   setPreviewUrl(null);
    //   setShowModal(false);
    // }
  };

  useEffect(() => {
    if (!showModal && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [showModal]);

  return (
    <div className="pt-12 font-firago">
      {/* Title */}
      <div className="text-[1.6rem] flex items-center gap-5 mb-10">
        <span>ფოტოს ცვლილება/დამატება</span>
        <LuPencilLine className="w-6 h-6" />
      </div>

      {/* Image List */}
      <div className="flex flex-wrap gap-6 text-black">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-[28.5rem] h-[23.5rem] border border-primary rounded-primary p-4 flex flex-col"
          >
            <span className="text-[2rem] uppercase font-bold">
              N {index + 1}
            </span>
            <img
              src={image.imageUrl}
              alt={`Uploaded ${index + 1}`}
              className="h-[13.3rem] mb-4"
            />
            <button className="mt-auto w-[13.2rem] h-[3.5rem] text-[1.3rem] font-bold text-primary border border-primary rounded-secondary mx-auto flex items-center justify-center mb-2 hover:bg-primary hover:text-white transition">
              შეცვლა
            </button>
          </div>
        ))}
      </div>

      {/* Add New Image */}
      <div className="w-[17.4rem] pt-12">
        <div
          className="h-[18.1rem] border border-primary rounded-primary text-primary flex justify-center items-center flex-col gap-2 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <GoPlus className="w-8 h-8" />
          <span className="text-[1.2rem] font-bold">დაამატე ფოტო</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Modal Preview Before Upload */}
      {showModal && previewUrl && (
        <Modal setShowModal={setShowModal} handleSubmit={addImage}>
          <div className="w-[34.3rem] mt-2 mb-8">
            <img src={previewUrl} alt="Preview" className="w-full" />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImagesBox;
