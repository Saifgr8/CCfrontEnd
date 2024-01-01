import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import cards from "../videos/cards.json";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsList } from "../Redux/userDataSlice";

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  console.log(user?.cart);

  const cartItems = useSelector((state) => state.userData.cartItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/profile");
        setUser(response.data);

        // Dispatch only if the cart is empty in Redux state
        if (response.data && response.data.cart && cartItems.length === 0) {
          dispatch(cartItemsList(response.data.cart));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, cartItems.length]);

  return (
    <div className="flex flex-col justify-center items-center dark:bg-slate-800">
      <Lottie animationData={cards} className="h-96 w-96" />
      <h1 className="lg:text-3xl xl:text-3xl 2xl:text-3xl md:text-xl sm:text-lg dark:text-white">
        Personalize your cards{" "}
        <Link to="create">
          <button className="mx-2 py-1 px-3 shadow-2xl rounded-2xl bg-blue-300 dark:bg-blue-900 dark:text-white">
            here
          </button>
        </Link>
      </h1>
    </div>
  );
};

export default Body;
