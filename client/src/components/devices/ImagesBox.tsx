import { useState, useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";
import { Modal } from "../Modal";
import axios from "axios";
import { useParking } from "../../App";
import { useParams } from "react-router-dom";

type Image = {
  imageUrl: string;
  imageId: string | number;
};

type ImagesProps = {
  Images: Image[];
};

const ImagesBox = ({ Images }: ImagesProps) => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const id = useParams().id as string | number;
  const { API_URL, setResponse } = useParking();

  useEffect(() => {
    setPreviewUrl(null);
    setImages(Images);
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
        .post(`${API_URL}/addImage?id=${id}`, formData)
        .then((res) => {
          if (res.data.status === "inserted") {
            if (previewUrl) {
              setImages([
                ...images,
                { imageUrl: previewUrl, imageId: res.data.insert_id },
              ]);
            }
          }
          setResponse(res.data);
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!showModal && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [showModal]);

  const deleteImage = async () => {
    await axios
      .delete(`${API_URL}/deleteImage/${currentImage?.imageId}`)
      .then((res) => {
        if (res.data.status == "deleted") {
          if (images.length === 1) {
            setImages([
              ...images.filter((i) => i.imageId !== currentImage?.imageId),
            ]);
          } else {
            setImages([
              ...images.filter((i) => i.imageId !== currentImage?.imageId),
            ]);
          }
        }
        setShowDeleteModal(false);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pt-12 font-firago">
      {/* Title */}
      <div className="text-[1.6rem] flex items-center gap-5 mb-10">
        <span>ფოტოს ცვლილება/დამატება</span>
        <LuPencilLine className="w-6 h-6" />
      </div>

      {/* Image List */}
      <div className="flex flex-wrap gap-6 text-black">
        {images.length > 0 &&
          images?.map((image, index) => (
            <div
              key={index}
              className="w-[28.5rem] h-[23.5rem] border border-primary rounded-primary p-4 flex flex-col"
            >
              <span className="text-[2rem] uppercase font-bold">
                N {index + 1}
              </span>
              <img
                src={
                  image?.imageUrl?.startsWith("blob:")
                    ? image?.imageUrl
                    : `${API_URL}/images/${image.imageUrl}`
                }
                alt={`Uploaded ${index + 1}`}
                className="h-[13.3rem] mb-4"
              />
              <button
                className="mt-auto w-[13.2rem] h-[3.5rem] text-[1.3rem] font-bold text-errorRed border border-errorRed rounded-secondary mx-auto flex items-center justify-center mb-2 hover:bg-errorRed hover:text-white transition"
                onClick={() => {
                  setShowDeleteModal(true);
                  setCurrentImage(image);
                }}
              >
                წაშლა
              </button>
            </div>
          ))}
        <div className="w-[28.5rem] h-[23.5rem] ">
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
        </div>
      </div>
      {/* Modal Preview Before Upload */}
      {showModal && previewUrl && (
        <Modal setShowModal={setShowModal} handleSubmit={addImage}>
          <div className="w-[34.3rem] mt-2 mb-8">
            <img src={previewUrl} alt="Preview" className="w-full" />
          </div>
        </Modal>
      )}
      {/* Delete Modal Preview Before Upload */}
      {showDeleteModal && (
        <Modal setShowModal={setShowDeleteModal} handleSubmit={deleteImage}>
          <div
            className="text-[1.3rem] font-medium  border-[0.05rem] border-primary rounded-primary 
            p-[0.8rem] text-center mb-8"
          >
            <span>ნამდვილად გსურთ ფოტოს წაშლა?</span>
            <div className="w-[34.3rem] mt-2 ">
              <img
                src={
                  currentImage?.imageUrl?.startsWith("blob:")
                    ? currentImage?.imageUrl
                    : `${API_URL}/images/${currentImage?.imageUrl}`
                }
                alt="Preview"
                className="w-full"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImagesBox;
