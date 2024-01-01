import React, { useEffect, useState } from "react";
import WhiteR from "../videos/whiteR.json";
import axios from "axios";
import Lottie from "lottie-react";
import BlackR from "../videos/BlackR.json";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiSolidHide, BiHide } from "react-icons/bi";

const UserRegister = () => {
  const navigation = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animationData, setAnimationData] = useState(WhiteR);
  const userTheme = localStorage.getItem("theme");
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setAnimationData(userTheme === "light" ? BlackR : WhiteR);
  }, [userTheme]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { userName, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const { data } = await axios.post(
        "/register",
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success(`Register Successful, Please log in`);
        navigation("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setConfirmPassword((prev) => !prev);
  };

  return (
    <div className="dark:bg-slate-800 pt-5">
      <div className="flex justify-center dark:bg-slate-900 dark:text-white rounded-2xl shadow-2xl items-center mx-auto my-auto p-2 w-full md:w-1/2 lg:w-1/2 xl:w-96 h-[70vh] md:h-screen/2 lg:h-screen/2 xl:h-screen/2">
        <form onSubmit={handleRegister}>
          <h1 className="text-center mb-8 text-xl lg:text-3xl dark:text-white">
            Sign up
          </h1>
          <div className="flex flex-col items-center gap-2">
            <label>Username</label>
            <input
              onChange={(e) => setData({ ...data, userName: e.target.value })}
              className="mx-2 p-2 rounded-lg shadow-lg z-50 dark:text-black"
              type="text"
              placeholder="name"
            />
            <label>Email</label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="mx-2 p-2 rounded-lg shadow-lg z-50 dark:text-black"
              type="email"
              placeholder="Email"
            />
            <label>Password</label>
            <BiSolidHide
              onClick={togglePassword}
              className="absolute h-6 w-6 mt-[200px] ml-36 z-[1000] cursor-pointer dark:text-black"
            />
            <input
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="mx-2 p-2 rounded-lg shadow-lg z-50 dark:text-black"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
            />
            <label>Confirm Password</label>
            <BiSolidHide
              onClick={toggleConfirmPassword}
              className="absolute h-6 w-6 mt-[280px] ml-36 z-[1000] cursor-pointer dark:text-black"
            />
            <input
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              className="mx-2 p-2 rounded-lg shadow-lg z-50 dark:text-black"
              type={confirmPassword ? "text" : "password"}
              placeholder="Password"
              value={data.confirmPassword}
            />
            <button
              className="cursor-pointer mt-2 text-white  dark:text-black py-2 px-5 rounded-2xl z-40"
              type="submit"
            >
              Submit
            </button>
            <Lottie
              animationData={animationData}
              className="h-96 w-44 absolute mt-40 z-30"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
