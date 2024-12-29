"use client";

import React, { useState, useEffect } from "react";
import { TFreelancerModel } from "@/definitions/models/freelancer-model-schema";
import { handleUpdateFreelancerActions } from "@/actions/freelancer/freelancerActions";
import { freelancerSchema } from "@/definitions/schema/freelancer-schema"; // Zod schema for validation

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

  // Check if the formData is different from the initial freelancer data
  useEffect(() => {
    const isDifferent = JSON.stringify(formData) !== JSON.stringify(freelancer);
    setIsModified(isDifferent);
  }, [formData, freelancer]);

  const validateField = (name: keyof TFreelancerModel, value: any) => {
    try {
      // Check for special characters (example: no special characters except spaces, letters, and numbers)
      const specialCharRegex = /^[a-zA-Z0-9\s]*$/;

      if (["nickName", "region", "city", "address", "description"].includes(name)) {
        if (!specialCharRegex.test(value)) {
          throw new Error("Special characters are not allowed.");
        }
      }

      // Validate the specific field using `.shape` for the field schema
      freelancerSchema.shape[name].parse(value);

      // Clear the error for the field if validation passes
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    } catch (error: any) {
      // Set the error message for the field if validation fails
      setErrors((prev) => ({
        ...prev,
        [name]: error.message || "Invalid value",
      }));
    }
  };


  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the field
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

      console.log("Payload being sent:", formDataObject);

      const result = await handleUpdateFreelancerActions(formDataObject);

      if (result.status === "success") {
        setSuccess(true);
        setErrors({});
      } else if (result.status === "forbidden") {
        console.warn("Received 403 Forbidden, but changes might be applied.");
        setSuccess(true);
      } else {
        setError(result.message || "Failed to update freelancer.");
      }
    } catch (err: any) {
      console.error("Error updating freelancer:", err);
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
                {/* Phone Number */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                        htmlFor="phoneNumber"
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                        className={`w-full rounded-[7px] border-[1.5px] text-white py-2.5 px-4 focus-visible:outline-none ${
                            errors.phoneNumber
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber || ""}
                        onChange={handleInputChange}
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
                        className={`w-full rounded-[7px] border-[1.5px] text-white py-2.5 px-4 focus-visible:outline-none ${
                            errors.nickName
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                        type="text"
                        id="nickName"
                        name="nickName"
                        value={formData.nickName || ""}
                        onChange={handleInputChange}
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
                    <input
                        className={`w-full rounded-[7px] border-[1.5px]  text-white py-2.5 px-4 focus-visible:outline-none ${
                            errors.region
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                        type="text"
                        id="region"
                        name="region"
                        value={formData.region || ""}
                        onChange={handleInputChange}
                    />
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
                    <input
                        className={`w-full rounded-[7px] border-[1.5px]  text-white py-2.5 px-4 focus-visible:outline-none ${
                            errors.city
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleInputChange}
                    />
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
                        className={`w-full rounded-[7px] border-[1.5px]  text-white py-2.5 px-4 focus-visible:outline-none ${
                            errors.address
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleInputChange}
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
                        className={`w-full rounded-[7px] border-[1.5px]  text-white py-2.5 px-4 focus-visible:outline-none ${
                            errors.zip
                                ? "border-red-500"
                                : "border-stroke focus:border-primary"
                        }`}
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip || ""}
                        onChange={handleInputChange}
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
                      className={`w-full rounded-[7px] border-[1.5px]  text-white py-2.5 px-4 focus-visible:outline-none ${
                          errors.publicEmail
                              ? "border-red-500"
                              : "border-stroke focus:border-primary"
                      }`}
                      type="email"
                      id="publicEmail"
                      name="publicEmail"
                      value={formData.publicEmail || ""}
                      onChange={handleInputChange}
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
                      className={`w-full rounded-[7px] border-[1.5px]  text-white py-2.5 px-4 focus-visible:outline-none ${
                          errors.description
                              ? "border-red-500"
                              : "border-stroke focus:border-primary"
                      }`}
                      value={formData.description || ""}
                      onChange={handleInputChange}
                  ></textarea>
                  {errors.description && (
                      <p className="mt-2 text-red-500 text-sm">
                        {errors.description}
                      </p>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                      type="button"
                      className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                      onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                      type="button"
                      onClick={handleSave}
                      disabled={!isModified || saving}
                      className={`flex justify-center rounded-[7px] px-6 py-[7px] font-medium text-white ${
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
