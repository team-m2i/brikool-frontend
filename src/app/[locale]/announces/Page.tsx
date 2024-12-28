"use client";
import { Input } from "@/components/ui/input";
import { getAnnounces } from "@/data-access/public-announes";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HomeHeader from "@/components/HomeHeader/header";
import Footer from "@/components/Footer/footer";
import PaginationFooter from "./PaginationFooter";
import SearchBar from "../user/_components/seaarchBar";
import AnnounceCard from "./annonceCard"; // Correction : importation avec la majuscule
import Announces from "./annonces";

// -------------------------------------------

async function Page() {
  return (
    <div>
      <HomeHeader />
      <SearchBar />
      <Announces />
      <Footer />
    </div>
  );
}

export default Page;


