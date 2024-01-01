import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearUserData,
  handleIncrement,
  handleDecrement,
  cartItemsList,
} from "../Redux/userDataSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { clearAllPaymentCarts } from "../Redux/userPaymentSlice";
import { allCartItems } from "../Redux/userPaymentSlice";

const Navbar = () => {
  const [savedUser, setSavedUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allCartItemList = useSelector((store) => store.userData.cartItems);

  useEffect(() => {
    if (!savedUser) {
      axios
        .get("/profile", { withCredentials: true })
        .then(({ data }) => setSavedUser(data));
    }
  }, [savedUser]);

  //calculate total cost
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
  const totalPrice = totalCost(allCartItemList);

  //calculate all items
  const counterForAllCartItems = (cartItemList) => {
    if (!Array.isArray(cartItemList)) {
      console.error("Invalid cartItemList. Expected an array.");
      return 0;
    }

    const sumQuantity = cartItemList.reduce((total, item) => {
      return total + (item.quantity || 0);
    }, 0);

    return sumQuantity;
  };

  //saveCartItems
  const saveItems = async () => {
    try {
      const { data } = await axios.post("/save", allCartItemList);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Cart items saved, proceeding to payment");
    } catch (error) {
      console.error(error);
    }
  };

  //logout
  const handleLogout = async () => {
    dispatch(clearUserData());
    localStorage.removeItem("reduxState");
    dispatch(clearAllPaymentCarts());
    navigate("login");
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        toast.success("Logout Successful");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar bg-base-100 dark:bg-slate-900">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl dark:text-white">
          CustomCards
        </a>
      </div>
      <Link to="create">
        <button className="dark:text-white hover:bg-slate-300 py-2 px-1 rounded-lg">
          Browse Styles
        </button>
      </Link>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <span className="badge badge-sm indicator-item">
                {counterForAllCartItems(allCartItemList)}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body h-96 overflow-y-scroll">
              <ul>
                {allCartItemList.map((item, index) => {
                  return (
                    <li key={index} className="my-2">
                      <img src={item?.cardImg} alt="" />
                      <h1>Name: {item?.name}</h1>
                      <h1>Genre: {item?.type}</h1>
                      <h1>Quantity: {item?.quantity}</h1>
                      <h1>${item?.quantity * item?.cost}</h1>
                      <div className="flex gap-2 justify-center">
                        <FiPlus
                          onClick={() =>
                            dispatch(handleIncrement({ name: item?.name }))
                          }
                          className=" h-6 w-6 cursor-pointer text-green-500 hover:text-green-700 transition duration-300 ease-in-out"
                        />
                        <FiMinus
                          onClick={() =>
                            dispatch(handleDecrement({ name: item?.name }))
                          }
                          className=" h-6 w-6 cursor-pointer text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <h1 className="text-center">Total: ${totalPrice}</h1>
              <div className="flex flex-col justify-center items-center">
                <Link to="payment">
                  <button
                    onClick={saveItems}
                    className="m-2 py-2 px-6 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-800 rounded-xl hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-500 hover:to-blue-300"
                  >
                    Proceed to payment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <FaUser className="h-9 w-9 dark:text-white" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                onClick={() => {
                  dispatch(clearAllPaymentCarts());
                  dispatch(clearUserData());
                }}
                to="/register"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  dispatch(clearAllPaymentCarts());
                  dispatch(clearUserData());
                }}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <div onClick={handleLogout}>Logout</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
