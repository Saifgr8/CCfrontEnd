import React, { useEffect } from "react";
import { IoMoonSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";
import axios from "axios";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./Redux/store";
import CreateCards from "./pages/CreateCards";
import Payment from "./pages/Payment";

axios.defaults.baseURL = "https://customcardsbackend.azurewebsites.net/";

//https://customcardsbackend.azurewebsites.net/
axios.defaults.withCredentials = true;

const App = () => {
  // Theme vars
  localStorage.setItem("color-theme", "light");
  // Theme toggle
  const iconToggle = () => {
    setMoonIconVisible((prev) => !prev);
    setSunIconVisible((prev) => !prev);
  };

  // Initial theme
  const themeCheck = () => {
    if (
      localStorage.getItem("color-theme") === "dark" &&
      (!("color-theme" in localStorage) ||
        !window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setMoonIconVisible(false);
    } else {
      document.documentElement.classList.remove("dark");
      setMoonIconVisible(false);
    }
  };

  // Manually theme switch
  const themeSwitch = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
    iconToggle();
  };

  useEffect(() => {
    themeCheck();
  }, []); // Run themeCheck on mount

  const [sunIconVisible, setSunIconVisible] = React.useState(true);
  const [moonIconVisible, setMoonIconVisible] = React.useState(true);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <div className="flex justify-center pt-5 dark:bg-slate-800">
            {sunIconVisible && (
              <MdSunny
                className="sun h-9 w-9 dark:text-white"
                onClick={themeSwitch}
                style={{ cursor: "pointer" }}
              />
            )}
            {moonIconVisible && (
              <IoMoonSharp
                className="moon h-9 w-9 dark:text-white"
                onClick={themeSwitch}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
          <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/" element={<Body />} />
            <Route path="/create" element={<CreateCards />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
