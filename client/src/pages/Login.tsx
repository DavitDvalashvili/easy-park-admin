import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { useParking } from "../App";

type authInfoType = {
  userName: string;
  password: string;
};
const Login = () => {
  const { API_URL } = useParking();

  let [authInfo, setAuthInfo] = useState<authInfoType>({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChangeAuthInfo = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  const login = async (): Promise<void> => {
    if (authInfo.userName && authInfo.password) {
      await axios
        .post(`http://localhost:4000/login`, authInfo)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    document.title = "ავტორიზაცია";
  }, []);

  return (
    <div className="h-screen p-[6rem] flex flex-col gap-[10rem] justify-center items-center font-firago">
      <div className="px-[9rem] py-[7.8rem] shadow-customShadow rounded-custom bg-white">
        <h2 className="text-[4.4rem] font-bold text-primary font-feature pb-8 text-center">
          მოგესალმებით
        </h2>
        <h5 className="text-[2.4rem] font-bold uppercase font-feature text-primary pb-[5.6rem] text-center">
          EASY PARK-ის ადმინ პანელში
        </h5>
        <form className="flex flex-col gap-8">
          <div className="w-[56rem] h-[6rem] border border-primary rounded-custom px-[2.6rem] py-[1.5rem] flex justify-center items-center">
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
          <div className="w-[56rem] h-[6rem] border border-primary rounded-custom px-[2.6rem] py-[1.5rem] flex justify-center items-center">
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
            className="text-[1.8rem] bg-primary rounded-custom text-center font-bold font-feature h-[6rem] w-[56rem] text-white"
            onClick={() => {
              login();
            }}
          >
            ავტორიზაცია
          </button>
        </form>
      </div>
      <div>
        <img src="/images/logo.svg" alt="logo" className="h-[10.4rem]" />
      </div>
    </div>
  );
};

export default Login;
