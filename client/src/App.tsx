import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

type UserDataResponse = userData | "Network Error" | "Loading" | null;

export type UseParking = {
  readonly API_URL: string;
  userData: UserDataResponse;
  setUserData: (userData: UserDataResponse) => void;
};

export const useParking = create<UseParking>((set) => ({
  API_URL: import.meta.env.VITE_API_URL,
  userData: "Loading",
  setUserData: (data: UserDataResponse) => set({ userData: data }),
}));

const App = () => {
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
