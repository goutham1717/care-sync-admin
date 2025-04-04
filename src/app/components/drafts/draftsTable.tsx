"use client";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Spinner, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { APPROVE_OR_REJECT, GET_DRAFTS } from "@/graphql/query/drafts";
import { ApproveOrRejectQuery, GetAllDraftsQuery } from "@/gql/graphql";

type Props = {};

const DraftsTable = (props: Props) => {
  const { data, loading, error } = useQuery<GetAllDraftsQuery>(GET_DRAFTS);
  const [drafts, setDrafts] = useState<GetAllDraftsQuery["getAllDrafts"]>([]);
  const [approveOrReject] = useLazyQuery<ApproveOrRejectQuery>(APPROVE_OR_REJECT)


  useEffect(() => {
    if (data?.getAllDrafts) {
      setDrafts(data.getAllDrafts);
    }
  }, [data]);

  if (loading)
    return <Spinner color="green" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />;

  if (error)
    return <div>Error loading drafts.</div>;

  const handleApprove = async (id: string) => {
    console.log("Approved:", id);
    const response = await approveOrReject({
      variables: {
        id,
        status: "APPROVE"
      }
    });
    if (response.data?.approveOrReject) {
      setDrafts(prev => prev.filter(d => d?.id !== id));
    }
  };

  const handleReject = async (id: string) => {
    console.log("Rejected:", id);
    const response = await approveOrReject({
      variables: {
        id,
        status: "REJECT"
      }
    });
    if (response.data?.approveOrReject) {
      setDrafts(prev => prev.filter(d => d?.id !== id));
    }
  };
  const TABLE_HEAD = ["Name", "Type", "Clinic Name", "Doctor Name", "Actions"];
  return (
    <div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {drafts.map(({ name, type, doctorName, clinicName, id }, index) => (
            <tr key={id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  {type}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {doctorName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {clinicName}
                </Typography>
              </td>
              <td className="p-4 ">
                <Button
                  color="green"
                  size="sm"
                  onClick={() => handleApprove(id)}
                >
                  Approve
                </Button>
                <Button
                  color="red"
                  size="sm"
                  onClick={() => handleReject(id)}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DraftsTable;