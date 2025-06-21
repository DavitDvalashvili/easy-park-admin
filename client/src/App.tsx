import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { create } from "zustand";
import Login from "./pages/Login";
import Main from "./pages/Main/Main";
import DashBoard from "./pages/Main/DashBoard";
import { Services } from "./pages/Main/Services";
import PageNotFound from "./pages/PageNotFound";
import { Benefits } from "./pages/Main/Benefits";
import { Faq } from "./pages/Main/Faq";
import { Device } from "./pages/Main/Device";
import { About } from "./pages/Main/About";

type userData = {
  user_id: number | string;
  user_name: string;
};

type deviceType = {
  device_type_id: string | number;
  device_type: string;
  name: string;
};

type UserDataResponse = userData | "Network Error" | "Loading" | null;
type Language = "Ge" | "En";

export type UseParking = {
  readonly API_URL: string;
  userData: UserDataResponse;
  setUserData: (userData: UserDataResponse) => void;
  response: ResponseStatus | null;
  setResponse: (response: ResponseStatus | null) => void;
  language: Language;
  toggleLanguage: (Language: Language) => void;
  deviceTypes: deviceType[] | null;
  setDeviceTypes: (deviceTypes: deviceType[]) => void;
  getDeviceTypes: VoidFunction;
  checkSession: VoidFunction;
};

export const useParking = create<UseParking>((set, get) => ({
  API_URL: import.meta.env.VITE_API_URL,
  userData: "Loading",
  setUserData: (data: UserDataResponse) => set({ userData: data }),
  response: null,
  setResponse: (response: ResponseStatus | null) => set({ response }),
  language: "Ge",
  toggleLanguage: (language: Language) => set({ language }),
  deviceTypes: null,
  setDeviceTypes: (deviceTypes: deviceType[]) => set({ deviceTypes }),
  getDeviceTypes: async () => {
    const { API_URL, setDeviceTypes } = get();
    try {
      const res = await axios.get(`${API_URL}/deviceType`);
      if (res.status === 200) {
        setDeviceTypes(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  },
  checkSession: async () => {
    const { API_URL, setUserData } = get();
    await axios
      .get(API_URL + "/checkSession")
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            setUserData(res.data);
          } else {
            setUserData(null);
          }
        }
      })
      .catch((err) => {
        setUserData(err.message);
      });
  },
}));

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Main />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="services" element={<Services />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/device/:id" element={<Device />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
