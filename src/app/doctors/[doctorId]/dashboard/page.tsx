"use client";

import { ApolloProvider, useQuery } from "@apollo/client";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  BuildingOffice2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { client } from "@/lib/apolloclient";
import { GET_DOCTOR_ADMIN_DASHBOARD } from "@/graphql/query/adminDashboard";
import {
  DashboardError,
  DashboardLoading,
  PageHeader,
  SectionCard,
  StatCard,
  StatusPill,
} from "@/app/components/admin-dashboard/DashboardPrimitives";

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DoctorDashboardContent({ doctorId }: { doctorId: string }) {
  const { data, loading, error } = useQuery(GET_DOCTOR_ADMIN_DASHBOARD, {
    variables: { doctorId },
  });

  if (loading) return <DashboardLoading />;

  if (error || !data?.getDoctorAdminDashboard) {
    return (
      <DashboardError
        title="Unable to load doctor dashboard"
        message={error?.message || "The requested doctor summary is unavailable."}
      />
    );
  }

  const dashboard = data.getDoctorAdminDashboard;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
        }
        title={dashboard.doctor.fullName}
        subtitle={`${dashboard.doctor.designation || "Doctor"}${dashboard.doctor.speciality ? ` • ${dashboard.doctor.speciality}` : ""}${dashboard.doctor.phoneNumber ? ` • ${dashboard.doctor.phoneNumber}` : ""}`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill
              label={dashboard.doctor.isActive ? "Active" : "Inactive"}
              tone={dashboard.doctor.isActive ? "green" : "slate"}
            />
            {dashboard.subscriptionStatus ? (
              <StatusPill
                label={dashboard.subscriptionStatus}
                tone={dashboard.subscriptionStatus === "ACTIVE" ? "blue" : "amber"}
              />
            ) : null}
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Linked clinics"
          value={`${dashboard.clinicCount}`}
          hint={dashboard.clinicNames.slice(0, 2).join(", ") || "No clinics linked"}
          tone="blue"
        />
        <StatCard
          label="Appointments"
          value={`${dashboard.totalAppointments}`}
          hint={`${dashboard.appointmentsThisMonth} created this month`}
          tone="green"
        />
        <StatCard
          label="AI bookings"
          value={`${dashboard.aiAppointmentsThisMonth}`}
          hint="Bookings attributed to the AI agent"
          tone="amber"
        />
        <StatCard
          label="Patients seen"
          value={`${dashboard.totalPatientsSeen}`}
          hint={`${dashboard.totalPrescriptions} prescriptions generated`}
          tone="slate"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <SectionCard
          title="Subscription and limits"
          subtitle="Useful operational controls for this doctor profile."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <CalendarDaysIcon className="h-5 w-5 text-slate-500" />
                <p className="text-sm font-medium text-slate-500">Subscription</p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center justify-between">
                  <span>Status</span>
                  <span className="font-semibold text-slate-900">
                    {dashboard.subscriptionStatus || "Not set"}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Ends on</span>
                  <span className="font-semibold text-slate-900">
                    {formatDate(dashboard.subscriptionEndsAt)}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Days remaining</span>
                  <span className="font-semibold text-slate-900">
                    {dashboard.subscriptionDaysRemaining ?? "—"}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <ChartBarSquareIcon className="h-5 w-5 text-slate-500" />
                <p className="text-sm font-medium text-slate-500">Quota</p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center justify-between">
                  <span>Appointment limit</span>
                  <span className="font-semibold text-slate-900">
                    {dashboard.appointmentLimit ?? "—"}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Used</span>
                  <span className="font-semibold text-slate-900">
                    {dashboard.appointmentsUsed ?? "—"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Linked clinics"
          subtitle="Where this doctor profile is currently active."
        >
          <div className="space-y-3">
            {dashboard.linkedClinics.map((clinic: any) => (
              <div
                key={clinic.clinicId}
                className="rounded-2xl border border-slate-200 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{clinic.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {clinic.cityName} • {clinic.openTime} to {clinic.closeTime}
                    </p>
                  </div>
                  <Link
                    href={`/clinics/${clinic.clinicId}/dashboard`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Recent appointments"
        subtitle="Latest patient activity for this doctor."
      >
        <div className="grid gap-3">
          {dashboard.recentAppointments.length ? (
            dashboard.recentAppointments.map((appointment: any) => (
              <div
                key={appointment.appointmentId}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                    <UsersIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{appointment.patientName}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.patientMobile || "—"} • {appointment.serviceType}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill
                    label={appointment.creationSource || "MANUAL"}
                    tone={appointment.creationSource === "AI_AGENT" ? "blue" : "slate"}
                  />
                  <StatusPill
                    label={appointment.paymentStatus || "Pending"}
                    tone={
                      appointment.paymentStatus?.toUpperCase() === "PAID"
                        ? "green"
                        : "amber"
                    }
                  />
                  <span className="text-sm text-slate-500">
                    {new Date(appointment.startTime).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No appointments recorded yet for this doctor.</p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

export default function DoctorAdminDashboardPage({
  params,
}: {
  params: { doctorId: string };
}) {
  return (
    <ApolloProvider client={client}>
      <DoctorDashboardContent doctorId={params.doctorId} />
    </ApolloProvider>
  );
}
