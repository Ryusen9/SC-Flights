import { useState, useRef, useEffect } from "react";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const BookingInputs = () => {
  const trips = [
    { value: "round-trip", label: "Round-trip" },
    { value: "one-way", label: "One-way" },
    { value: "multi-city", label: "Multi-city" },
  ];

  const [tripType, setTripType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleTripChange = (trip) => {
    setTripType(trip);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-w-5xl h-[35vh] border-t border-l border-r border-white rounded-xl backdrop-blur-xs p-8 shadow-md">
      <div className="w-full h-full">
        <div className="flex items-center">
          <div
            ref={dropdownRef}
            className="text-black border relative border-white p-1.5 rounded-lg flex items-center cursor-pointer justify-center space-x-1 group"
          >
            <GoArrowSwitch className="text-white" />
            <button
              type="button"
              className="w-28 cursor-pointer flex items-center justify-between text-white"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {tripType ? tripType.label : "Trip type"}
              <MdOutlineKeyboardArrowDown
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            <ul
              className={`absolute shadow-md rounded-md w-full top-11 p-2 bg-white flex flex-col space-y-1 z-10 transition-all duration-300 ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {trips.map((trip) => (
                <li
                  key={trip.value}
                  className="cursor-pointer hover:bg-blue-500 hover:text-white duration-300 rounded-lg py-1 px-3"
                  onClick={() => handleTripChange(trip)}
                >
                  {trip.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInputs;