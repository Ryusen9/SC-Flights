import { useState, useRef, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { MdEventSeat, MdOutlineKeyboardArrowDown } from "react-icons/md";

const BookingInputs = () => {
  const trips = [
    { value: "round-trip", label: "Round-trip" },
    { value: "one-way", label: "One-way" },
    { value: "multi-city", label: "Multi-city" },
  ];

  const cabins = [
    { value: "economy", label: "Economy" },
    { value: "premium-economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ];

  // Passenger data
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infantsSeat: 0,
    infantsLap: 0,
  });

  // State for trip and cabin
  const [tripType, setTripType] = useState(null);
  const [cabinClass, setCabinClass] = useState(null);

  // Dropdown open state
  const [openDropdown, setOpenDropdown] = useState(null);

  // Refs
  const tripRef = useRef(null);
  const passengerRef = useRef(null);
  const cabinRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        tripRef.current?.contains(e.target) ||
        passengerRef.current?.contains(e.target) ||
        cabinRef.current?.contains(e.target)
      ) {
        return;
      }
      setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Increment/decrement
  const increment = (type) =>
    setPassengers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  const decrement = (type) =>
    setPassengers((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));

  // Generic dropdown
  const Dropdown = ({ label, icon: Icon, options, selected, setSelected, name, refProp }) => (
    <div ref={refProp} className="flex items-center">
      <div className="text-black border relative border-white p-1.5 rounded-lg flex items-center cursor-pointer justify-center space-x-1 group">
        <Icon className="text-white" />
        <button
          type="button"
          className="w-36 cursor-pointer flex items-center justify-between text-white"
          onClick={() => setOpenDropdown(openDropdown === name ? null : name)}
        >
          {selected ? selected.label : label}
          <MdOutlineKeyboardArrowDown
            className={`transition-transform duration-300 ${openDropdown === name ? "rotate-180" : ""}`}
          />
        </button>

        {/* Options */}
        <ul
          className={`absolute shadow-md rounded-md w-full top-11 p-2 bg-white flex flex-col space-y-1 z-10 transition-all duration-300 ${
            openDropdown === name
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="cursor-pointer hover:bg-blue-500 hover:text-white duration-300 rounded-lg py-1 px-3"
              onClick={() => {
                setSelected(option);
                setOpenDropdown(null);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Passenger dropdown UI
  const PassengerDropdown = () => {
    const totalPassengers =
      passengers.adults +
      passengers.children +
      passengers.infantsSeat +
      passengers.infantsLap;

    const passengerLabel =
      totalPassengers === 1
        ? "1 Passenger"
        : `${totalPassengers} Passengers`;

    return (
      <div ref={passengerRef} className="flex items-center">
        <div className="text-black border relative border-white p-1.5 rounded-lg flex items-center cursor-pointer justify-center space-x-1 group">
          <FaRegUser className="text-white" />
          <button
            type="button"
            className="w-36 cursor-pointer flex items-center justify-between text-white"
            onClick={() => setOpenDropdown(openDropdown === "passengers" ? null : "passengers")}
          >
            {passengerLabel}
            <MdOutlineKeyboardArrowDown
              className={`transition-transform duration-300 ${openDropdown === "passengers" ? "rotate-180" : ""}`}
            />
          </button>

          {/* Passenger Dropdown */}
          <div
            className={`absolute w-64 top-11 bg-white text-black rounded-md shadow-lg p-4 z-10 transition-all duration-300 ${
              openDropdown === "passengers"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {[
              { label: "Adults", type: "adults" },
              { label: "Children", type: "children", sub: "Aged 2–11" },
              { label: "Infants", type: "infantsSeat", sub: "In seat" },
              { label: "Infants", type: "infantsLap", sub: "On lap" },
            ].map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p>{item.label}</p>
                  {item.sub && (
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.type)}
                    className="bg-white text-black border shadow-lg px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{passengers[item.type]}</span>
                  <button
                    onClick={() => increment(item.type)}
                    className="bg-white text-black border shadow-lg px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="flex justify-between mt-4 text-sm">
              <button
                onClick={() =>
                  setPassengers({ adults: 1, children: 0, infantsSeat: 0, infantsLap: 0 })
                }
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpenDropdown(null)}
                className="text-blue-400 hover:text-blue-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-w-5xl h-[35vh] border-t border-l border-r border-white rounded-xl backdrop-blur-xs p-8 shadow-md">
      <div className="w-full h-full flex justify-start items-start space-x-6">
        {/* Trip Type Dropdown */}
        <Dropdown
          label="Trip type"
          icon={GoArrowSwitch}
          options={trips}
          selected={tripType}
          setSelected={setTripType}
          name="trip"
          refProp={tripRef}
        />

        {/* Passenger Dropdown */}
        <PassengerDropdown />

        {/* Cabin Class Dropdown */}
        <Dropdown
          label="Cabin class"
          icon={MdEventSeat}
          options={cabins}
          selected={cabinClass}
          setSelected={setCabinClass}
          name="cabin"
          refProp={cabinRef}
        />
      </div>
    </div>
  );
};

export default BookingInputs;