
"use client";
import React from "react";
import CpgForm from "./components/cpg-details/CpgForm";
import { ThemeProvider } from "@material-tailwind/react";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="flex flex-col items-center px-24 mt-2" style={{ background: 'rgb(101 198 198 / 10%)' }}>
        <header className="text-3xl"> CARE SYNC ADMIN</header>
        <CpgForm />
      </main>
    </ThemeProvider>
  );
}
