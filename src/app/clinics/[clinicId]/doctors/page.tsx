'use client';

import { GET_CLINIC_DOCTORS } from "@/graphql/query/doctors";
import { useQuery } from "@apollo/client";
import { Typography, Card, CardHeader, CardBody, Spinner } from "@material-tailwind/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloclient";

type Doctor = {
  doctor_id: string;
  profile: {
    personal: {
      designation: string;
      first_name: string;
      last_name: string;
      phone_number: string;
    };
    professional: {
      active: boolean;
      major_speciality: {
        name: string;
      };
      language: Array<{
        name: string;
      }>;
    };
  };
};

type Props = {
  params: {
    clinicId: string;
  };
};

const DoctorsList = ({ clinicId }: { clinicId: string }) => {
  const { data, loading, error } = useQuery(GET_CLINIC_DOCTORS, {
    variables: { clinicId },
  });

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
          Error loading doctors: {error.message}
        </Typography>
      </div>
    );
  }

  return (
    <Card
      className="h-full w-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h4"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Doctors List
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          List of all doctors in this clinic
        </Typography>
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
              {["Name", "Speciality", "Languages", "Contact", "Status"].map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.getClinicDoctors.map((doctor: Doctor, index: number) => (
              <tr key={doctor.doctor_id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {doctor.profile.personal.designation} {doctor.profile.personal.first_name} {doctor.profile.personal.last_name}
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
                    {doctor.profile.professional.major_speciality.name}
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
                    {doctor.profile.professional.language.map((lang: { name: string }) => lang.name).join(", ")}
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
                    {doctor.profile.personal.phone_number}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color={doctor.profile.professional.active ? "green" : "red"}
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {doctor.profile.professional.active ? "Active" : "Inactive"}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

const ClinicDoctorsPage = ({ params }: Props) => {
  return (
    <ApolloProvider client={client}>
      <DoctorsList clinicId={params.clinicId} />
    </ApolloProvider>
  );
};

export default ClinicDoctorsPage; 