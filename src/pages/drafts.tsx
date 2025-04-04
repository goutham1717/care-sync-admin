"use client";
import React from 'react';
import { Card, CardHeader, ThemeProvider, Typography, CardBody } from '@material-tailwind/react'
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloclient";
import DraftsTable from '@/app/components/drafts/draftsTable';
import "../app/globals.css";

type Props = {}

const Drafts = (props: Props) => {

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <main
          className="flex flex-col items-center px-24 pt-5"
          style={{ background: "#fff", height: "100vh", width: "100vw" }}
        >
          <Card className="h-full w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Typography variant="h2" color="purple" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Aprrove or reject symptom, medication & diagnosis
              </Typography>
            </CardHeader>
            <CardBody children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <DraftsTable />
            </CardBody>
          </Card>
        </main>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default Drafts