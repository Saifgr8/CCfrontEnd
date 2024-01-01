import React, { useEffect, useState } from "react";
import gif from "../videos/register.json";
import whitegif from "../videos/white.json";
import Lottie from "lottie-react";
import axios from "axios";
import { BiSolidHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const userTheme = localStorage.getItem("theme");
  const [animationData, setAnimationData] = useState(gif);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimationData(userTheme === "light" ? gif : whitegif);
  }, [userTheme]);

  const passwordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success(`welcome ${data.userName}!`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dark:bg-slate-800 pt-5">
      <div className="flex justify-center  dark:bg-slate-900 dark:text-white rounded-2xl shadow-2xl items-center mx-auto my-auto p-2 w-full md:w-1/2 lg:w-1/2 xl:w-96 h-[70vh] md:h-screen/2 lg:h-screen/2 xl:h-screen/2">
        <form onSubmit={handleLoginForm}>
          <h1 className="text-center mb-8 text-xl lg:text-3xl dark:text-white">
            Login
          </h1>
          <div className="flex flex-col items-center gap-6">
            <label>Email</label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="mx-2 p-2 rounded-lg shadow-lg z-50 dark:text-black"
              type="email"
              placeholder="Email"
            />
            <label>Password</label>
            <BiSolidHide
              onClick={passwordToggle}
              className="z-50 h-6 w-6 absolute mt-[165px] ml-36 cursor-pointer dark:text-black "
            />
            <input
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="mx-2 p-2 rounded-lg shadow-lg dark:text-black  z-40"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
            />
            <button
              className="cursor-pointer  text-black  dark:text-white py-2 px-5 rounded-2xl z-40"
              type="submit"
            >
              Submit
            </button>
            <Lottie
              animationData={animationData}
              className="h-96 w-44 absolute mt-20 z-30"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
