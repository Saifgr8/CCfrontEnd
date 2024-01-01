import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  allCartItems,
  handleIncrementPayment,
  handleDecrementPayment,
  clearAllPaymentCarts,
} from "../Redux/userPaymentSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../Redux/userDataSlice";

const ShimmerEffect = () => (
  <div className="animate-pulse xl:h-40 xl:w-80  h-20 w-40 bg-gray-300 rounded-md"></div>
);

const Payment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const finalCartItems = useSelector(
    (store) => store.userPayment.paymentCartList
  );
  console.log(finalCartItems);

  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const totalCost = (cartItems) => {
    if (!Array.isArray(cartItems)) {
      console.error("Expected an array");
      return 0;
    }
    const sumCost = cartItems.reduce((total, item) => {
      return total + item.cost * item.quantity;
    }, 0);
    return sumCost;
  };
  const totalPrice = totalCost(finalCartItems);

  const fetchData = async () => {
    const response = await axios.get("/profile");
    setUser(response.data);
    dispatch(allCartItems(response?.data?.cart));
    setLoading(false);
  };

  const handlePayment = async () => {
    dispatch(clearAllPaymentCarts());
    dispatch(clearUserData())
    try {
      if (finalCartItems.length > 0) {
        const username = finalCartItems[0].username;

        const { data } = await axios.post("/pay", { username });

        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Payment success");
          navigate("/");
        }
      } else {
        toast.error("No items in the cart");
      }
    } catch (error) {
      console.error(error);
      console.log("Failed to make payment");
      // Handle error or dispatch actions accordingly
    }
  };

  return (
    <div className="dark:bg-slate-800 py-2">
      <div className="m-2 p-2 mt-10">
        <ul className="flex justify-evenly flex-wrap">
          {loading ? (
            // Show shimmer effect while loading
            <div className="flex flex-wrap justify-evenly gap-6">
              {Array.from({ length: 4 }).map((_, index) => {
                return <ShimmerEffect key={index} />;
              })}
            </div>
          ) : (
            // Render actual data
            finalCartItems.map((item, index) => (
              <li className="my-2" key={index}>
                <img
                  src={item?.cardImg}
                  className="xl:h-96 xl:w-[500px] h-20 w-40 rounded-lg"
                  alt=""
                />

                <div className="text-center flex flex-col gap-2">
                  <h1 className="dark:text-white">Name: {item?.name}</h1>
                  <h1 className="dark:text-white">Genre: {item?.type}</h1>
                  <h1 className="dark:text-white">
                    Quantity: {item?.quantity}
                  </h1>
                  <h1 className="dark:text-white">
                    ${item?.quantity * item?.cost}
                  </h1>
                  
                </div>
              </li>
            ))
          )}
        </ul>
        <h1 className="text-center dark:text-white ">Total: ${totalPrice} </h1>
        <div className="flex justify-center">
          <Link to="payment">
            <button
              onClick={handlePayment}
              className="m-2 py-2 px-6 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-800 rounded-xl hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-500 hover:to-blue-300"
            >
              Pay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
