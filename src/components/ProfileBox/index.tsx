"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TFreelancerModel } from "@/definitions/models/freelancer-model-schema";

// Import JSON files
import regionsData from "@/raw/regions.json";
import citiesData from "@/raw/cities.json";

interface ProfileBoxProps {
  freelancer: TFreelancerModel;
  canEditCover: boolean; // Add a new prop to control visibility of the edit button
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ freelancer, canEditCover }) => {
  const { data: session } = useSession();
  const user = session?.user || {};

  // Lookup maps
  const regionLookup = Object.fromEntries(
      regionsData.map((region) => [region.id, region.names.en]) // Change "en" to "fr" or "ar" as needed
  );
  const cityLookup = Object.fromEntries(
      citiesData.map((city) => [city.id, city.names.en]) // Change "en" to "fr" or "ar" as needed
  );

  // Resolve region and city names
  const regionName = regionLookup[freelancer.region] || "Unknown Region";
  const cityName = cityLookup[freelancer.city] || "Unknown City";

  const [isEditingCover, setIsEditingCover] = useState(false);
  const [currentCoverImage, setCurrentCoverImage] = useState(
      "/images/cover/cover-01.png"
  );
  const coverImageOptions = [
    "/images/cover/cover-01.png",
    "/images/cover/cover-02.jpg",
    "/images/cover/cover-03.jpg",
  ];

  const handleEditCover = () => {
    setIsEditingCover(true);
  };

  const handleSelectCoverImage = (image: string) => {
    setCurrentCoverImage(image);
    setIsEditingCover(false);
  };

  return (
      <>
        <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          {/* Cover Image Section */}
          <div className="relative z-20 h-35 md:h-65">
            <Image
                src={currentCoverImage}
                alt="profile cover"
                className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
                width={970}
                height={260}
            />
            {canEditCover && (
                <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
                  <button
                      onClick={handleEditCover}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-[3px] bg-primary px-[15px] py-[5px] text-body-sm font-medium text-white hover:bg-opacity-90"
                  >
                    <span>Edit</span>
                  </button>
                </div>
            )}
            {isEditingCover && (
                <div className="absolute top-0 left-0 z-30 flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-dark-2">
                  {coverImageOptions.map((image, index) => (
                      <div
                          key={index}
                          className="cursor-pointer"
                          onClick={() => handleSelectCoverImage(image)}
                      >
                        <Image
                            src={image}
                            alt={`Option ${index + 1}`}
                            width={150}
                            height={90}
                            className="h-24 w-40 rounded-md object-cover hover:opacity-80"
                        />
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                    src={user.image || "/images/user/default.png"}
                    width={160}
                    height={160}
                    className="overflow-hidden rounded-full"
                    alt="profile"
                />
              </div>
            </div>

            {/* Freelancer Info */}
            <div className="mt-4">
              <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
                {session?.user?.name || "Utilisateur"} (
                {freelancer.nickName || "nickname utilisateur"})
              </h3>

              <div className="mx-auto mb-5.5 mt-5 grid max-w-[600px] grid-cols-3 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                  <span className="text-body-sm">Phone Number</span>
                  <span className="font-medium text-dark dark:text-white">
                  {freelancer.phoneNumber || "Phone number"}
                </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                  <span className="text-body-sm">Public Email</span>
                  <span className="font-medium text-dark dark:text-white">
                  {freelancer.publicEmail || "Email utilisateur"}
                </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="text-body-sm">Region + City</span>
                  <span className="font-medium text-dark dark:text-white">
                  {regionName} : {cityName}
                </span>
                </div>
              </div>

              {/* About Section */}
              <div className="mx-auto max-w-[720px]">
                <h4 className="font-medium text-dark dark:text-white">
                  About Me
                </h4>
                <p className="mt-4">
                  {freelancer.description || "Description utilisateur"}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-4.5">
                <h4 className="mb-3.5 font-medium text-dark dark:text-white">
                  Follow me on
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  <Link href="#" className="hover:text-primary" aria-label="social-icon">
                    <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* SVG path for social icon */}
                    </svg>
                  </Link>

                  {/* Add more links as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default ProfileBox;
