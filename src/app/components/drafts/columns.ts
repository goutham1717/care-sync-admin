"use client";
import { DraftModel } from "@/gql/graphql";
import { createColumnHelper } from "@tanstack/react-table";

export const DRAFTS_COLUMNS = [

  { accessorKey: "name", header: "Name" },
  { accessorKey: "type", header: "Type" },
];