import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const DropdownOption = ({ label, onClick }) => {
  return (
    <li
      key={label}
      className={`px-4 py-2 text-sm text-center cursor-pointer rounded-lg 
      ${
        label === "Update"
          ? "text-blue hover:bg-blue hover:text-white"
          : label === "Delete"
          ? "text-red hover:bg-red hover:text-white"
          : " "
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-white text-black font-semibold py-2 px-4 rounded flex items-center w-full focus:outline-none"
        onClick={toggleDropdown}
      >
        <BsThreeDots className="text-4xl" />
      </button>

      {isOpen && (
        <ul className="relative w-fit rounded-md shadow-lg bg-white ring-1 right-1 bottom-2 ring-black ring-opacity-5 z-10 font-semibold">
          {options.map((option) => (
            <DropdownOption
              key={option.label}
              label={option.label}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
