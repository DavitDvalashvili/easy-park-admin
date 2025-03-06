import Description from "../../components/devices/Description";
import Features from "../../components/devices/Features";
import ImagesBox from "../../components/devices/ImagesBox";
import axios from "axios";
import { useParking } from "../../App";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const defaultData: deviceData = {
  devices: [{ deviceId: "", name: "", description: "", languageId: "" }],
  features: [{ featureId: "", feature: "", languageId: "" }],
  images: [{ imageId: "", imageUrl: "" }],
};

export const Device = () => {
  const { API_URL, language } = useParking();
  const Id = useParams().id as string | number;
  const [deviceData, setDeviceData] = useState<deviceData>(defaultData);

  const getDeviceData = async () => {
    await axios
      .get(`${API_URL}/device?lan=${language}&Id=${Id}`)
      .then((res) => {
        if (res.status === 200) {
          setDeviceData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDeviceData();
  }, [language, Id]);

  return (
    <div className="p-[3rem] pr-[9.6rem] font-firago">
      <Description devices={deviceData.devices} />
      <Features Features={deviceData.features} />
      <ImagesBox Images={deviceData.images} />
    </div>
  );
};
