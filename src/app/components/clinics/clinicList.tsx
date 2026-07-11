import { GetClinicsQuery } from "@/gql/graphql";
import { GET_CLINICS } from "@/graphql/query/clinics";
import { CREATE_BUSINESS } from "@/graphql/mutation/business";
import { useQuery, useMutation } from "@apollo/client";
import React, { useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Spinner,
  Button,
  Drawer,
  Input,
} from "@material-tailwind/react";
import ClinicDetailsDrawer from "./ClinicDetailsDrawer";
import Link from "next/link";
import AddClinicDrawer from "./AddClinicDrawer";

type Props = {};

const ClinicList = (props: Props) => {
  const { data, loading, error, refetch } =
    useQuery<GetClinicsQuery>(GET_CLINICS);
  const [selectedClinic, setSelectedClinic] = React.useState<
    GetClinicsQuery["getClinics"][0] | null
  >(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openAddClinicDrawer, setOpenAddClinicDrawer] = React.useState(false);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [businessName, setBusinessName] = React.useState("");
  const [createdBusinessId, setCreatedBusinessId] = React.useState<
    string | null
  >(null);
  const [step, setStep] = React.useState<"business" | "clinic">("business");

  const [createBusiness, { loading: creatingBusiness }] = useMutation(
    CREATE_BUSINESS,
    {
      onCompleted: (data) => {
        setCreatedBusinessId(data.createBusiness.id);
        setStep("clinic");
      },
      onError: (error) => {
        console.error("Error creating business:", error);
        // You might want to show an error message to the user here
      },
    },
  );

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBusiness({
      variables: {
        businessInput: {
          name: businessName,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner
          className="h-12 w-12"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Typography
          color="red"
          variant="h6"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Error loading clinics: {error.message}
        </Typography>
      </div>
    );
  }

  const handleClinicClick = (clinic: GetClinicsQuery["getClinics"][0]) => {
    setSelectedClinic(clinic);
    setOpenDrawer(true);
  };

  return (
    <>
      <Card
        className="h-full w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex justify-between items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Clinics List
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              List of all registered clinics
            </Typography>
          </div>
          <Button
            size="sm"
            color="black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => setOpenAddClinicDrawer(true)}
          >
            Add Clinic
          </Button>
        </CardHeader>
        <CardBody
          className="overflow-scroll px-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {["Name", "About", "City", "Timing", "Contact", "Actions"].map(
                  (head) => (
                    <th
                      key={head}
                      className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${head === "About" ? "max-w-xs" : ""}`}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {head}
                      </Typography>
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {data?.getClinics.map((clinic, index) => (
                <tr key={clinic.id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal cursor-pointer hover:text-blue-700"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      onClick={() => handleClinicClick(clinic)}
                    >
                      {clinic.name}
                    </Typography>
                  </td>
                  <td className="p-4 max-w-xs">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal break-words"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {clinic.about}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {clinic.city_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {clinic.openTime} - {clinic.closeTime}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {clinic.phone_number[0]?.n}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div
                      className="relative"
                      ref={openMenuId === clinic.id ? menuRef : null}
                    >
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === clinic.id ? null : clinic.id,
                          )
                        }
                        className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      {openMenuId === clinic.id && (
                        <div className="absolute right-0 z-10 mt-1 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <Link
                              href={`/clinics/${clinic.id}/doctors`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setOpenMenuId(null)}
                            >
                              View Doctors
                            </Link>
                            <Link
                              href={`/clinics/${clinic.id}/staff`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setOpenMenuId(null)}
                            >
                              View Staff
                            </Link>
                            <Link
                              href={`/clinics/${clinic.id}/inpatient-defaults`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setOpenMenuId(null)}
                            >
                              Inpatient Defaults
                            </Link>
                            <Link
                              href={`/clinics/${clinic.id}/configure`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setOpenMenuId(null)}
                            >
                              Configure
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {selectedClinic && (
        <ClinicDetailsDrawer
          clinic={selectedClinic}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
      )}

      <AddClinicDrawer
        open={openAddClinicDrawer}
        clinics={data?.getClinics || []}
        onClinicCreated={() => refetch()}
        onClose={() => setOpenAddClinicDrawer(false)}
      />
    </>
  );
};

export default ClinicList;
