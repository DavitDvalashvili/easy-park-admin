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

type ResponseStatus = "Success" | "Loading" | "Server Error" | null;

export type UseParking = {
  readonly API_URL: string;
  responseStatus: ResponseStatus;
  setResponseStatus: (responseStatus: ResponseStatus) => void;
};

export const useParking = create<UseParking>((set) => ({
  API_URL: import.meta.env.VITE_API_URL,
  responseStatus: "Loading",
  setResponseStatus: (responseStatus: ResponseStatus) =>
    set({ responseStatus }),
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
