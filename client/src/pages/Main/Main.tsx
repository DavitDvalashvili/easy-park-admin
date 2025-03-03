import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { NavigationLayout } from "../../components/NavigationLayout";
import { useParking } from "../../App";
import { useEffect } from "react";
import { Notification } from "../../components/Notification";

const Main = () => {
  const { getDeviceTypes, response } = useParking();

  useEffect(() => {
    getDeviceTypes();
  }, []);
  // const checkSession = async () => {
  //   await axios
  //     .get(`${API_URL}/checkSession`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="w-screen h-screen flex justify-start items-start max-w-[224rem] mx-auto relative ">
      <NavigationLayout />
      <div className="w-full h-screen  overflow-y-scroll">
        <Header />
        <Outlet />
      </div>
      {response && <Notification />}
    </div>
  );
};

export default Main;
