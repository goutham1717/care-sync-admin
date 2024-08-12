"use client";
import React from "react";
import CpgForm from "./components/cpg-details/CpgForm";
import { Button, ThemeProvider } from "@material-tailwind/react";
import axios from "axios";
import CpgList from "./components/cpg-details/CpgList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient()
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <main
          className="flex flex-col items-center px-24 pt-5"
          style={{ background: "#dad7cd", height: "100vh", width: "100vw" }}
        >
          <header className="text-2xl"> Care Sync - Admin</header>
          <CpgList />
        </main>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
