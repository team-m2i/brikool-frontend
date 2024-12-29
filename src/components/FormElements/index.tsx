"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectGroupThree from "@/components/FormElements/SelectGroup/SelectGroupThree";
import { handleAddServiceAction } from "@/actions/service/serviceActions";
import { TServiceModel } from "@/definitions/models/service-model-schema";

const FormElements = () => {

    const [formData, setFormData] = useState<TServiceModel>({
        titre: "",
        description: "",
        prix: 0,
        pathImage: "default path",
        freelancerId: 1,
        categorie: 2,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "prix" ? parseFloat(value) : value,
        }));
    };

    const handleCategoryChange = (selectedCategoryId: number) => {
        setFormData((prev) => ({ ...prev, categorie: selectedCategoryId }));
    };


    const validateForm = () => {
        const validationErrors: { [key: string]: string } = {};

        if (!formData.titre.trim()) {
            validationErrors.titre = "Titre est obligatoire.";
        }
        if (!formData.description.trim()) {
            validationErrors.description = "Description est obligatoire.";
        }
        if (formData.prix <= 0) {
            validationErrors.prix = "Prix doit être un nombre positif.";
        }
        if (formData.categorie <= 0) {
            validationErrors.categorie = "Veuillez sélectionner une catégorie.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async () => {
        setSaving(true);
        setError(null);
        setSuccess(false);

        if (!validateForm()) {
            setSaving(false);
            return;
        }

        try {
            // Convert formData (TServiceModel) to FormData
            const formDataObject = new FormData();
            formDataObject.append("titre", formData.titre);
            formDataObject.append("description", formData.description);
            formDataObject.append("prix", formData.prix.toString());
            formDataObject.append("freelancerId", formData.freelancerId.toString());
            formDataObject.append("categorie", formData.categorie.toString());

            // If there's an image path, append it
            if (formData.pathImage) {
                formDataObject.append("image", formData.pathImage);
            }
            if (formData.pathImage) {
                formDataObject.append("pathImage", formData.pathImage);
            }
            const result = await handleAddServiceAction(formDataObject); // Pass FormData object here

            if (result.status === "success") {
                setSuccess(true);
                setFormData({
                    titre: "",
                    description: "",
                    prix: 0,
                    pathImage: "default path",
                    freelancerId: 1,
                    categorie: 1,
                }); // Reset the form
            } else {
                setError(result.message || "Failed to add service.");
            }
        } catch (err: any) {
            console.error("Error submitting service:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Breadcrumb pageName="FormElements" />

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        {/* Titre de Service */}
                        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                                <h3 className="font-medium text-dark dark:text-white">
                                    Titre de service
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <input
                                    type="text"
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleInputChange}
                                    placeholder="Ajouter un Titre"
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                                {errors.titre && <p className="text-red-500">{errors.titre}</p>}
                            </div>
                        </div>

                        {/* Image de Service */}
                        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                                <h3 className="font-medium text-dark dark:text-white">
                                    Image de service
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <input
                                    type="file"
                                    name="pathImage"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            pathImage:
                                                e.target.files && e.target.files[0]
                                                    ? e.target.files[0].name
                                                    : "default path",
                                        }))
                                    }
                                    className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] dark:border-dark-3 dark:bg-dark-2 dark:file:bg-white/30 dark:file:text-white"
                                />
                            </div>
                        </div>

                        {/* Prix de Service */}
                        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                                <h3 className="font-medium text-dark dark:text-white">
                                    Prix de service
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <input
                                    type="number"
                                    name="prix"
                                    value={formData.prix}
                                    onChange={handleInputChange}
                                    placeholder="Ajouter une description de vos prix"
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                                {errors.prix && <p className="text-red-500">{errors.prix}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-9">
                        {/* Description de Service */}
                        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                                <h3 className="font-medium text-dark dark:text-white">
                                    Description de service
                                </h3>
                            </div>
                            <div className="flex flex-col gap-6 p-6.5">
                <textarea
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Ajouter une description de votre service"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                ></textarea>
                                {errors.description && (
                                    <p className="text-red-500">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Catégories */}
                        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                                <h3 className="font-medium text-dark dark:text-white">
                                    Séléctionner les catégories de votre service
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <SelectGroupThree onChange={handleCategoryChange} />
                                {errors.categorie && (
                                    <p className="text-red-500">{errors.categorie}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="reset"
                        onClick={() =>
                            setFormData({
                                titre: "",
                                description: "",
                                prix: 0,
                                pathImage: "default path",
                                freelancerId: 1,
                                categorie: 1,
                            })
                        }
                        className="px-6 py-3 rounded-[7px] bg-gray-500 text-white hover:bg-gray-600"
                    >
                        Reset
                    </button>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={saving}
                        className={`px-6 py-3 rounded-[7px] text-white ${
                            saving
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-primary hover:bg-opacity-90"
                        }`}
                    >
                        {saving ? "Saving..." : "Submit"}
                    </button>
                </div>

                {error && <p className="mt-4 text-green-500">{error}</p>}
                {success && (
                    <p className="mt-4 text-green-500">Service added successfully!</p>
                )}
            </form>
        </>
    );
};

export default FormElements;
