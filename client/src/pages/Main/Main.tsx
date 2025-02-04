import { useEffect } from "react";
import axios from "axios";
import { useParking } from "../../App";

const Main = () => {
  const { API_URL } = useParking();

  const checkSession = async () => {
    await axios
      .get(`${API_URL}/checkSession`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkSession();
  }, []);

  return <div>Main</div>;
};

export default Main;
