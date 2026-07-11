"use client";

import { ApolloProvider, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { client } from "@/lib/apolloclient";
import { GET_CLINICS } from "@/graphql/query/clinics";
import ConfigureClinicModal from "@/app/components/clinics/ConfigureClinicModal";

const ConfigureClinicPageContent = ({ clinicId }: { clinicId: string }) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CLINICS);

  const clinic =
    data?.getClinics?.find((item: { id: string }) => item.id === clinicId) ||
    null;

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <Spinner
          className="h-10 w-10"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <Typography
          variant="h6"
          color="red"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Unable to load clinic configuration
        </Typography>
        <Typography
          color="gray"
          className="mt-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {error.message}
        </Typography>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <Typography
          variant="h6"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Clinic not found
        </Typography>
        <Typography
          color="gray"
          className="mt-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          The clinic you are trying to configure is unavailable.
        </Typography>
        <div className="mt-4">
          <Link href="/clinics">
            <Button
              variant="outlined"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Back to clinics
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/clinics"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Back to clinics
          </Link>
          <Typography
            variant="h4"
            color="blue-gray"
            className="mt-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Configure {clinic.name}
          </Typography>
        </div>
        <Button
          variant="outlined"
          onClick={() => router.push("/clinics")}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Done
        </Button>
      </div>

      <ConfigureClinicModal
        clinic={clinic}
        open={true}
        onClose={() => router.push("/clinics")}
        standalone
      />
    </div>
  );
};

export default function ConfigureClinicPage({
  params,
}: {
  params: { clinicId: string };
}) {
  return (
    <ApolloProvider client={client}>
      <ConfigureClinicPageContent clinicId={params.clinicId} />
    </ApolloProvider>
  );
}
