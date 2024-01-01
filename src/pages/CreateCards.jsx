import React, { useEffect, useState } from "react";
import { FcSimCardChip } from "react-icons/fc";
import { LuNfc } from "react-icons/lu";
import { RiVisaFill } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  incrementCartItemCounter,
  cartItemsList,
  clearUserData
} from "../Redux/userDataSlice";
import { newImgData } from "../config/imagesDS";
import { Link } from "react-router-dom";

const CreateCards = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [updatedUserName, setupdatedUserName] = useState(user?.userName);
  const [genre, setGenre] = useState("Anime");

  const addToCartHandler = () => {
    const cartInfo = {
      name: newImgData[0]?.[genre][currentIndex]?.name,
      type: genre,
      username: user?.userName,
      cardImg: newImgData[0]?.[genre][currentIndex]?.front,
      cost: newImgData[0]?.[genre][currentIndex]?.cost,
    };
    dispatch(cartItemsList(cartInfo));
    dispatch(incrementCartItemCounter());
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) => (prev + 1) % newImgData[0][genre].length);
  };

  const prevClick = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + newImgData[0][genre].length) % newImgData[0][genre].length
    );
  };

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => setUser(data));
    }
  }, [user]);

  return (
    <div className="dark:bg-slate-800">
      <div className="flex justify-center gap-5 pt-5 dark:bg-slate-800">
        <button
          onClick={() => {
            setGenre("Anime");
            setCurrentIndex(0);
          }}
          className=" text-sm w-14 h-7 xl:h-10  dark:text-white dark:bg-gradient-to-r dark:from-red-800 dark:via-red-500 dark:to-red-300 bg-gradient-to-r from-red-300 via-red-500 to-red-800  rounded-lg"
        >
          Anime
        </button>
        <button
          onClick={() => {
            setGenre("Nature");
            setCurrentIndex(0);
          }}
          className=" text-sm w-14 h-7 xl:h-10  dark:text-white dark:bg-gradient-to-r dark:from-green-800 dark:via-green-500 dark:to-green-300 bg-gradient-to-r from-green-300 via-green-500 to-green-800 rounded-lg"
        >
          Nature
        </button>
        <button
          onClick={() => {
            setGenre("Gym");
            setCurrentIndex(0);
          }}
          className="text-sm w-14 h-7 xl:h-10  dark:text-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-500 dark:to-gray-300 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-800 rounded-lg"
        >
          Gym
        </button>
      </div>
      <div className="diff aspect-[16/9] max-w-screen-sm mx-auto p-4 dark:bg-slate-800">
        <div className="diff-item-1 rounded-xl">
          {/* //back */}
          <img alt="daisy" src={newImgData[0]?.[genre][currentIndex]?.back} />
          <div className="flex flex-col justify-center items-end gap-3">
            <input type="text" className="bg-black w-full h-10" />
            <div className="flex w-full">
              <input type="text" className="bg-gray-200 w-full h-7" />
              <h1 className=" pr-3 text-sm xl:text-xl bg-white text-black text-center">
                CVV
              </h1>
            </div>
            <FcSimCardChip className="h-6 w-6 xl:h-10 xl:w-10 mr-5" />
          </div>
        </div>
        <div className="diff-item-2 rounded-xl">
          {/* //front */}
          <img alt="daisy" src={newImgData[0]?.[genre][currentIndex]?.front} />
          <div className="flex  flex-col xl:gap-10 2xl:gap-10 lg:gap-8 md:gap-8 sm:gap-8 gap-3 justify-center">
            <h1 className="text-white text-sm pl-7 relative">
              <span className="bg-black bg-opacity-50 p-1 rounded">
                BANK_NAME
              </span>
            </h1>
            <div className="flex justify-around">
              <h1 className=" text-white  pr-7">
                <FcSimCardChip className="h-6 w-6 xl:h-10 xl:w-10" />
              </h1>
              <h1 className=" text-white">
                <LuNfc className="h-6 w-6 xl:h-10 xl:w-10" />
              </h1>
            </div>
            <h1 className="text-white text-sm pl-7 relative">
              <span className="bg-black bg-opacity-50 p-1 rounded">
                XXXX-XXXX-XXXX-2456
              </span>
            </h1>

            <h1 className="text-white text-sm pl-7 relative">
              <span className="bg-black bg-opacity-50 p-1 rounded ">
                {updatedUserName}
              </span>
            </h1>

            <div className="flex justify-around">
              <h1 className="text-white text-sm pl-7 relative">
                <span className="bg-black bg-opacity-50 p-1 rounded">
                  EXP:02/37
                </span>
              </h1>
              <h1 className=" text-white">
                <RiVisaFill className="h-6 w-6 xl:h-10 xl:w-10" />
              </h1>
            </div>
          </div>
        </div>
        <div className="diff-resizer"></div>
      </div>
      <div className="flex justify-center">
        <h1 className="dark:text-white">
          Cost: {newImgData[0]?.[genre][currentIndex]?.cost}$
        </h1>
      </div>

      <div className="flex justify-center">
        <label className="my-2 dark:text-white mx-2 text-sm xl:mx-4 xl:text-base">
          Edit your card name:
        </label>
        <input
          className="flex justify-center my-1 rounded-lg border border-gray-600 pl-2"
          type="text"
          placeholder={user?.userName}
          value={updatedUserName}
          onChange={(e) => setupdatedUserName(e.target.value)}
        />
      </div>

      <div>
        <h1 className="text-center dark:text-white mx-2 ">
          "{newImgData[0]?.[genre][currentIndex]?.text}"
        </h1>
      </div>
      <div className="flex justify-center m-2 p-2 gap-10 xl:gap-10">
        <FaAngleLeft onClick={prevClick} className="dark:text-white" />
        <FaAngleRight onClick={handleNextClick} className="dark:text-white" />
      </div>
      <div className="flex justify-center">
        <button
          onClick={addToCartHandler}
          className="bg-red-400 px-3 py-1 rounded-xl ml-2 hover:bg-green-500 dark:bg-red-800 dark:text-white "
        >
          Add to cart
        </button>
        <Link to="/payment">
          <button 
           className="bg-red-400 px-3 py-1 rounded-xl ml-2 hover:bg-green-500 dark:bg-red-800 dark:text-white ">
            Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateCards;
