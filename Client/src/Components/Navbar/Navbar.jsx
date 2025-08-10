import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import Context from "../../Context/Context";

const animatedComponents = makeAnimated();
//show only currency code
const CustomSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      {props.data.shortLabel}
    </components.SingleValue>
  );
};

const Navbar = () => {
  const { currCurrency, setCurrCurrency } = useContext(Context);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    axios
      .get("https://openexchangerates.org/api/currencies.json")
      .then((res) => {
        const formatted = Object.entries(res.data).map(([code, name]) => ({
          value: code,
          label: `${code} - ${name}`,
          shortLabel: code,
        }));
        setCurrency(formatted);
      });
  }, []);

  const handleChange = (selectedOption) => {
    setCurrCurrency(selectedOption.value);
  };

  // Navbar showing functionality
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full font-rubik z-50 h-14 p-1 flex items-center justify-center transition-transform duration-300 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-[150%]"
      }`}
    >
      {/* Navbar main */}
      <div className="w-3/5 py-2 mt-4 shadow-md px-4 rounded-xl flex justify-between items-center bg-white">

        {/* LOGO */}
        <p className="text-lg uppercase font-semibold">SC-Flights</p>

        {/* Menu */}
        <ul className="flex items-center justify-center space-x-3">
          <li className="text-base relative group">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : ""
              }
            >
              Home
            </NavLink>
            <span className="absolute rounded-full h-0.5 bottom-0 left-0 bg-black w-full transition-all duration-300 scale-0 group-hover:scale-100"></span>
          </li>
          <li className="text-base relative group">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : ""
              }
            >
              Dashboard
            </NavLink>
            <span className="absolute rounded-full h-0.5 bottom-0 left-0 bg-black w-full transition-all duration-300 scale-0 group-hover:scale-100"></span>
          </li>
        </ul>

        {/* Utils */}
        <div className="flex items-center justify-between space-x-2.5">
          {/* Currency dropdown */}
          <div className="flex items-center justify-center w-40">
            <MdAttachMoney className="text-2xl" />
            <Select
              options={currency}
              closeMenuOnSelect={true}
              components={{
                ...animatedComponents,
                SingleValue: CustomSingleValue,
              }}
              placeholder="Currency"
              className="w-full text-sm"
              onChange={handleChange}
              value={currency.find((opt) => opt.value === currCurrency) || null}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
