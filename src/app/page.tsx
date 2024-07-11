"use client";
import React from "react";
import CpgForm from "./components/cpg-details/CpgForm";
import { ThemeProvider } from "@material-tailwind/react";

export default function Home() {
  return (
    <ThemeProvider>
      <main
        className="flex flex-col items-center px-24 pt-5"
        style={{ background: "#dad7cd", height: "100vh", width: "100vw" }}
      >
        <header className="text-2xl"> Care Sync - Admin</header>
        <CpgForm />
      </main>
    </ThemeProvider>
  );
}
