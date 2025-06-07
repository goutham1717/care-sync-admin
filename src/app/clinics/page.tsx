"use client";

import ClinicList from "../components/clinics/clinicList";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloclient";

export default function Clinics() {
  return (
    <ApolloProvider client={client}>
      <div>
        <ClinicList />
      </div>
    </ApolloProvider>
  )
}