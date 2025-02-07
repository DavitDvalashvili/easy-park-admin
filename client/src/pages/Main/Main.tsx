import { useEffect } from "react";
import axios from "axios";
import { useParking } from "../../App";
import { Outlet } from "react-router-dom";
import { NavigationLayout } from "../../components/NavigationLayout";

const Main = () => {
  const { API_URL } = useParking();

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

  useEffect(() => {
    //checkSession();
  }, []);

  return (
    <div className="bg-red-800 w-screen h-screen flex justify-start items-start">
      <NavigationLayout />
      <div className="">
        <Outlet />
      </div>
      //notification
    </div>
  );
};

export default Main;
