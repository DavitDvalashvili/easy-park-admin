import { useState, ChangeEvent, useEffect } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { useParking } from "../App";
import { useNavigate, NavigateFunction } from "react-router-dom";

type authInfoType = {
  userName: string;
  password: string;
};

const Login = () => {
  const { API_URL, setUserData, userData } = useParking();
  const navigate: NavigateFunction = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [authInfo, setAuthInfo] = useState<authInfoType>({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChangeAuthInfo = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  const login = async (): Promise<void> => {
    if (!authInfo.userName || !authInfo.password) {
      setErrorMessage("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }
    await axios
      .post(`${API_URL}/login`, authInfo, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "success") {
          setUserData(res.data.userData);
          navigate("/");
        } else {
          setErrorMessage(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "ავტორიზაცია";
    if (userData && userData !== "Loading") navigate("/");
  }, []);

  return (
    <div className="h-screen p-[3rem] flex flex-col gap-[5rem] justify-center items-center font-firago">
      <div className="px-[3rem] py-[3.8rem] shadow-customShadow rounded-primary bg-white">
        <h2 className="text-[2.4rem] font-bold text-primary font-feature pb-8 text-center">
          მოგესალმებით
        </h2>
        <h5 className="text-[2.4rem] font-bold uppercase font-feature text-primary pb-[2.6rem] text-center">
          EASY PARK-ის ადმინ პანელში
        </h5>
        <form className="flex flex-col gap-8 ">
          <div className="w-[46rem] h-[6rem] border border-primary rounded-primary px-[2.6rem] py-[1.5rem] flex justify-center items-center">
            <input
              type="text"
              name="userName"
              id="username"
              className="w-full h-full focus:outline-none text-[1.6rem] font-normal"
              value={authInfo.userName}
              placeholder="მომხმარებლის სახელი"
              onChange={handleChangeAuthInfo}
            />
          </div>
          <div className="w-[46rem] h-[6rem] border border-primary rounded-primary px-[2.6rem] py-[1.5rem] flex justify-center items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="w-full h-full focus:outline-none text-[1.6rem] font-normal"
              value={authInfo.password}
              placeholder="პაროლი"
              onChange={handleChangeAuthInfo}
            />
            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="cursor-pointer text-primary"
            >
              {showPassword ? (
                <IoEyeOffOutline className="text-[2.5rem]" />
              ) : (
                <IoEyeOutline className="text-[2.5rem]" />
              )}
            </div>
          </div>
          <button
            type="button"
            className="text-[1.8rem] bg-primary rounded-primary text-center font-bold font-feature h-[6rem] w-[46rem] text-white"
            onClick={() => {
              login();
            }}
          >
            ავტორიზაცია
          </button>
          {errorMessage && (
            <div>
              <div className="border-errorRed rounded-primary text-[1.4rem] weight-normal p-[1.2rem] flex justify-center gap-[1.5rem] border-[0.05rem] border-solid">
                <span> {errorMessage}</span>
                <img src="/images/error.svg" alt="error" />
              </div>
            </div>
          )}
        </form>
      </div>
      <div>
        <img src="/images/logo.svg" alt="logo" className="h-[10.4rem]" />
      </div>
    </div>
  );
};

export default Login;
