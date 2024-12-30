"use client";

import React, { useState } from "react";
import { TServiceModel } from "@/definitions/models/service-model-schema";
import { deleteServiceAction } from "@/actions/service/serviceActions";

interface MyServicesProps {
    services: TServiceModel[];
}

const MyServices: React.FC<MyServicesProps> = ({ services: initialServices }) => {
    const [services, setServices] = useState<TServiceModel[]>(initialServices);
    const [deletingServiceId, setDeletingServiceId] = useState<number | null>(null);


    // Define an array of image paths
    const imageOptions = [
        "/images/carousel/carousel-01.jpg",
        "/images/carousel/carousel-02.jpg",
        "/images/carousel/carousel-03.jpg",
        "/images/cards/cards-01.png",
        "/images/cards/cards-02.png",
        "/images/cards/cards-03.png",
        "/images/cards/cards-04.png",
        "/images/cards/cards-05.png",
        "/images/cards/cards-06.png",
        "/images/cards/1.jpg",
        "/images/cards/2.jpg",
        "/images/cards/3.jpg",
        "/images/cards/4.jpg",
        "/images/cards/5.jpg",
        "/images/cards/6.jpg",
        "/images/cards/7.jpg",
        "/images/cards/8.jpg",
        "/images/cards/9.jpg",


    ];

    // Function to randomly select an image
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imageOptions.length);
        return imageOptions[randomIndex];
    };

    const handleDelete = async (serviceId: number | undefined) => {
        if (!serviceId) {
            console.error("Service ID is undefined.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this service?");
        if (!confirmDelete) return;

        try {
            setDeletingServiceId(serviceId);
            await deleteServiceAction(serviceId);

            setServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));
        } catch (error) {
            {
            //    console.error("Failed to delete service:", error);
            }
            alert("service deleted successfuly!.");
            window.location.reload();
        } finally {
            setDeletingServiceId(null);
        }
    };


    if (services.length === 0) {
        return <p>No services available.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Mes Services</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="rounded-lg border border-stroke bg-white shadow-md dark:bg-gray-dark dark:border-dark-3"
                    >
                        <img
                            src={getRandomImage()}
                            alt={service.titre}
                            className="h-40 w-full object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-2">{service.titre}</h2>
                            <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                            <p className="text-sm text-gray-700 mb-4">
                                <span className="font-bold">Category:</span> {service.categorie}
                            </p>
                            <p className="text-xl font-bold text-primary mb-4">
                                ${service.prix.toFixed(2)}
                            </p>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className={`px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500 ${
                                    deletingServiceId === service.id ? "cursor-not-allowed opacity-50" : ""
                                }`}
                                disabled={deletingServiceId === service.id}
                            >
                                {deletingServiceId === service.id ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyServices;
