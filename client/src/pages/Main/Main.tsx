import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { NavigationLayout } from "../../components/NavigationLayout";
import { useParking } from "../../App";
import { Notification } from "../../components/Notification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading";

const Main = () => {
  const { response, userData, checkSession, getDeviceTypes } = useParking();

  const Navigate = useNavigate();

  useEffect(() => {
    checkSession();
    getDeviceTypes();
  }, []);

  useEffect(() => {
    if (userData === null) {
      Navigate("/login");
    }
  }, [userData]);

  useEffect(() => {
    getDeviceTypes();
  }, []);

  if (userData === "Loading") return <Loading />;

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
