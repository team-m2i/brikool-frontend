"use client";

import React, { useState, useEffect } from "react";
import { TFreelancerModel } from "@/definitions/models/freelancer-model-schema";
import { handleUpdateFreelancerActions } from "@/actions/freelancer/freelancerActions";
import { freelancerSchema } from "@/definitions/schema/freelancer-schema"; // Zod schema for validation
import regionsData from "@/raw/regions.json";
import citiesData from "@/raw/cities.json";

interface SettingBoxesProps {
  freelancer: TFreelancerModel;
}

const SettingBoxes: React.FC<SettingBoxesProps> = ({ freelancer }) => {
  const [formData, setFormData] = useState<TFreelancerModel>(freelancer);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isModified, setIsModified] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Filtered cities based on selected region
  const [filteredCities, setFilteredCities] = useState(
      citiesData.filter((city) => city.region_id === parseInt(freelancer.region))
  );

  useEffect(() => {
    const isDifferent = JSON.stringify(formData) !== JSON.stringify(freelancer);
    setIsModified(isDifferent);
  }, [formData, freelancer]);

  // Update filtered cities when region changes
  useEffect(() => {
    const updatedCities = citiesData.filter(
        (city) => city.region_id === parseInt(formData.region)
    );
    setFilteredCities(updatedCities);

    // Reset city if no longer valid
    if (!updatedCities.find((city) => city.id === formData.city)) {
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.region]);

  const validateField = (name: keyof TFreelancerModel, value: any) => {
    try {
      freelancerSchema.shape[name].parse(value);

      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        [name]: error.message || "Invalid value",
      }));
    }
  };

  const handleInputChange = (
      e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name as keyof TFreelancerModel, value);
  };

  const handleCancel = () => {
    setFormData(freelancer);
    setErrors({});
    setError(null);
    setSuccess(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    const validation = freelancerSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setSaving(false);
      return;
    }

    try {
      const formDataObject = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataObject.append(key, value.toString());
        }
      });

      const result = await handleUpdateFreelancerActions(formDataObject);

      if (result.status === "success") {
        setSuccess(true);
        setErrors({});
      } else {
        setError(result.message || "Failed to update freelancer.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Phone Number and Nickname */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                        htmlFor="phoneNumber"
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber || ""}
                        onChange={handleInputChange}
                        className={`w-full rounded-[7px] border-[1.5px] py-2.5 px-4 ${
                            errors.phoneNumber
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                    />
                    {errors.phoneNumber && (
                        <p className="mt-2 text-red-500 text-sm">
                          {errors.phoneNumber}
                        </p>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                        htmlFor="nickName"
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    >
                      Username
                    </label>
                    <input
                        id="nickName"
                        name="nickName"
                        value={formData.nickName || ""}
                        onChange={handleInputChange}
                        className={`w-full rounded-[7px] border-[1.5px] py-2.5 px-4 ${
                            errors.nickName
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                    />
                    {errors.nickName && (
                        <p className="mt-2 text-red-500 text-sm">
                          {errors.nickName}
                        </p>
                    )}
                  </div>
                </div>

                {/* Region and City */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                        htmlFor="region"
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    >
                      Region
                    </label>
                    <select
                        id="region"
                        name="region"
                        value={formData.region || ""}
                        onChange={handleInputChange}
                        className={`w-full rounded-[7px] border-[1.5px] py-2.5 px-4 ${
                            errors.region
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                    >
                      <option value="" disabled>
                        Select a region
                      </option>
                      {regionsData.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.names.en}
                          </option>
                      ))}
                    </select>
                    {errors.region && (
                        <p className="mt-2 text-red-500 text-sm">{errors.region}</p>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                        htmlFor="city"
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    >
                      City
                    </label>
                    <select
                        id="city"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleInputChange}
                        className={`w-full rounded-[7px] border-[1.5px] py-2.5 px-4 ${
                            errors.city
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                    >
                      <option value="" disabled>
                        Select a city
                      </option>
                      {filteredCities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.names.en}
                          </option>
                      ))}
                    </select>
                    {errors.city && (
                        <p className="mt-2 text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>
                </div>

                {/* Address and ZIP */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                        htmlFor="address"
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    >
                      Address
                    </label>
                    <input
                        id="address"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleInputChange}
                        className={`w-full rounded-[7px] border-[1.5px] py-2.5 px-4 ${
                            errors.address
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                    />
                    {errors.address && (
                        <p className="mt-2 text-red-500 text-sm">
                          {errors.address}
                        </p>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                        htmlFor="zip"
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    >
                      ZIP Code
                    </label>
                    <input
                        id="zip"
                        name="zip"
                        value={formData.zip || ""}
                        onChange={handleInputChange}
                        className={`w-full rounded-[7px] border-[1.5px] py-2.5 px-4 ${
                            errors.zip ? "border-red-500" : "border-stroke focus:border-primary"
                        }`}
                    />
                    {errors.zip && (
                        <p className="mt-2 text-red-500 text-sm">{errors.zip}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-5.5">
                  <label
                      htmlFor="publicEmail"
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                      id="publicEmail"
                      name="publicEmail"
                      value={formData.publicEmail || ""}
                      onChange={handleInputChange}
                      className={`w-full rounded-[7px] border-[1.5px] py-2.5 px-4 ${
                          errors.publicEmail
                              ? "border-red-500"
                              : "border-stroke focus:border-primary"
                      }`}
                  />
                  {errors.publicEmail && (
                      <p className="mt-2 text-red-500 text-sm">
                        {errors.publicEmail}
                      </p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-5.5">
                  <label
                      htmlFor="description"
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  >
                    BIO
                  </label>
                  <textarea
                      id="description"
                      name="description"
                      rows={6}
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      className={`w-full rounded-[7px] border-[1.5px] py-2.5 px-4 ${
                          errors.description
                              ? "border-red-500"
                              : "border-stroke focus:border-primary"
                      }`}
                  ></textarea>
                  {errors.description && (
                      <p className="mt-2 text-red-500 text-sm">
                        {errors.description}
                      </p>
                  )}
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                      type="button"
                      className="rounded-[7px] border px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                      onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                      type="button"
                      onClick={handleSave}
                      disabled={!isModified || saving}
                      className={`rounded-[7px] px-6 py-[7px] font-medium text-white ${
                          saving || !isModified
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-primary hover:bg-opacity-90"
                      }`}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
              {error && <p className="mt-4 text-green-500">{error}</p>}
              {success && (
                  <p className="mt-4 text-green-500">Profile updated successfully!</p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default SettingBoxes;
