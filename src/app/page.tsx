"use client";

import Hero from "@/components/Hero/hero";
import MainContent from "@/components/MainContent/mainContent";
import { UserContext } from "@/context/user";
import { useContext, useEffect } from "react";

export default function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <MainContent />
    </>
  );
}
