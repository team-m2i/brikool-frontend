"use client";
import React, { useState } from "react";

interface SelectGroupThreeProps {
  onChange: (selectedCategoryId: number) => void; // Callback function to pass selected value
}

const SelectGroupThree: React.FC<SelectGroupThreeProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);

    // Notify the parent component about the change
    if (onChange) {
      onChange(Number(value)); // Convert the value to a number
    }
  };

  return (
      <div className="mb-5.5">
        <div className="dark:bg-form-input relative z-20 bg-transparent">
          <select
              value={selectedOption}
              onChange={handleChange}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
          >
            <option value="" disabled>
              Sélectionner les catégories de votre service
            </option>
            <option value="1">Education & Tutoring</option>
            <option value="2">UX/UI Designer</option>
            <option value="3">Web Developer</option>
            <option value="4">Mobile App Development</option>
            <option value="5">Content Writing</option>
            <option value="6">Photography & Videography</option>
            <option value="7">Digital Marketing</option>
            <option value="8">Translation & Language Services</option>
            <option value="9">Virtual Assistance</option>
            <option value="10">Data Analysis & AI Services</option>
          </select>
        </div>
      </div>
  );
};

export default SelectGroupThree;
