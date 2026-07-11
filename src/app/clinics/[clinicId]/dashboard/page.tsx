"use client";

import { ApolloProvider, useQuery } from "@apollo/client";
import Link from "next/link";
import { Button, Typography } from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  BanknotesIcon,
  BoltIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { client } from "@/lib/apolloclient";
import { GET_CLINIC_ADMIN_DASHBOARD } from "@/graphql/query/adminDashboard";
import {
  DashboardError,
  DashboardLoading,
  PageHeader,
  SectionCard,
  StatCard,
  StatusPill,
} from "@/app/components/admin-dashboard/DashboardPrimitives";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function moduleLabel(moduleKey: string) {
  return moduleKey
    .split("_")
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function ClinicDashboardContent({ clinicId }: { clinicId: string }) {
  const { data, loading, error } = useQuery(GET_CLINIC_ADMIN_DASHBOARD, {
    variables: { clinicId },
  });

  if (loading) return <DashboardLoading />;

  if (error || !data?.getClinicAdminDashboard) {
    return (
      <DashboardError
        title="Unable to load clinic dashboard"
        message={error?.message || "The requested clinic summary is unavailable."}
      />
    );
  }

  const dashboard = data.getClinicAdminDashboard;
  const creditRows: Array<[string, number]> = [
    ["SMS", dashboard.smsCredits],
    ["WhatsApp", dashboard.whatsappCredits],
    ["Video", dashboard.videoCredits],
    ["Call", dashboard.callCredits],
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={
          <Link
            href="/clinics"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to clinics
          </Link>
        }
        title={dashboard.clinic.name}
        subtitle={`${dashboard.clinic.city_name} • ${dashboard.clinic.openTime} to ${dashboard.clinic.closeTime}${dashboard.clinic.ownerDoctorName ? ` • Owner: ${dashboard.clinic.ownerDoctorName}` : ""}`}
        action={
          <div className="flex flex-wrap gap-2">
            <Link href={`/clinics/${clinicId}/configure`}>
              <Button
                variant="outlined"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Configure clinic
              </Button>
            </Link>
            <Link href={`/clinics/${clinicId}/doctors`}>
              <Button
                color="blue"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                View doctors
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Doctors"
          value={`${dashboard.totalDoctors}`}
          hint={`${dashboard.activeDoctors} active right now`}
          tone="blue"
        />
        <StatCard
          label="Patients reached"
          value={`${dashboard.totalPatients}`}
          hint={`${dashboard.totalAppointments} total appointments`}
          tone="green"
        />
        <StatCard
          label="This month"
          value={`${dashboard.appointmentsThisMonth}`}
          hint={`${dashboard.aiAppointmentsThisMonth} created by AI`}
          tone="amber"
        />
        <StatCard
          label="Revenue collected"
          value={formatCurrency(dashboard.revenueCollected)}
          hint={`${formatCurrency(dashboard.walletBalanceInr)} wallet balance`}
          tone="slate"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard
          title="Operational snapshot"
          subtitle="A quick read on the clinic’s current setup and activity."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <UserGroupIcon className="h-5 w-5 text-slate-500" />
                <p className="text-sm font-medium text-slate-500">Team</p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center justify-between">
                  <span>Doctors</span>
                  <span className="font-semibold text-slate-900">
                    {dashboard.activeDoctors} / {dashboard.totalDoctors}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Staff</span>
                  <span className="font-semibold text-slate-900">
                    {dashboard.activeStaff} / {dashboard.totalStaff}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <BanknotesIcon className="h-5 w-5 text-slate-500" />
                <p className="text-sm font-medium text-slate-500">Billing</p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center justify-between">
                  <span>Total bills</span>
                  <span className="font-semibold text-slate-900">{dashboard.totalBillings}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Paid</span>
                  <span className="font-semibold text-emerald-700">{dashboard.paidBillings}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Pending</span>
                  <span className="font-semibold text-amber-700">{dashboard.pendingBillings}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Outstanding</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(dashboard.outstandingAmount)}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <BoltIcon className="h-5 w-5 text-slate-500" />
                <p className="text-sm font-medium text-slate-500">Credits</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {creditRows.map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200">
                    <p className="text-slate-500">{label}</p>
                    <p className="mt-1 font-semibold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-5 w-5 text-slate-500" />
                <p className="text-sm font-medium text-slate-500">Milestones</p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center justify-between">
                  <span>Running now</span>
                  <span className="font-semibold text-slate-900">{dashboard.activeMilestones}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Rewards unlocked</span>
                  <span className="font-semibold text-emerald-700">{dashboard.achievedMilestones}</span>
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Modules" subtitle="Feature access and subscription window.">
          <div className="flex flex-wrap gap-2">
            {dashboard.activeModules.length ? (
              dashboard.activeModules.map((moduleKey: string) => (
                <StatusPill
                  key={moduleKey}
                  label={moduleLabel(moduleKey)}
                  tone="blue"
                />
              ))
            ) : (
              <p className="text-sm text-slate-500">No active add-on modules yet.</p>
            )}
          </div>
          <div className="mt-5 space-y-3">
            {dashboard.moduleSubscriptions.slice(0, 5).map((subscription: any) => (
              <div
                key={`${subscription.moduleKey}-${subscription.endDate}`}
                className="rounded-2xl border border-slate-200 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">
                    {moduleLabel(subscription.moduleKey)}
                  </p>
                  <StatusPill
                    label={subscription.status}
                    tone={subscription.status === "ACTIVE" ? "green" : "slate"}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(subscription.startDate)} to {formatDate(subscription.endDate)}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard
          title="Recent doctors"
          subtitle="The latest updated clinic profiles."
        >
          <div className="space-y-3">
            {dashboard.recentDoctors.map((doctor: any) => (
              <div
                key={doctor.doctorId}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{doctor.fullName}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {[doctor.designation, doctor.speciality].filter(Boolean).join(" • ") || "Profile available"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill label={doctor.isActive ? "Active" : "Inactive"} tone={doctor.isActive ? "green" : "slate"} />
                  <Link href={`/doctors/${doctor.doctorId}/dashboard`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Recent milestone rewards"
          subtitle="The latest milestone outcomes for this clinic."
        >
          <div className="space-y-3">
            {dashboard.recentMilestones.length ? (
              dashboard.recentMilestones.map((milestone: any) => (
                <div
                  key={milestone.achievementId}
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900">{milestone.title}</p>
                    <StatusPill
                      label={milestone.status}
                      tone={milestone.status === "APPLIED" ? "green" : milestone.status === "FAILED" ? "red" : "amber"}
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    {milestone.progressValue} / {milestone.targetValue} • {milestone.rewardType} • value {milestone.rewardValue}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No milestone events yet for this clinic.</p>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Recent appointments"
        subtitle="Latest booking activity across the clinic."
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs uppercase tracking-[0.08em] text-slate-500">
                <th className="px-4 py-3 font-semibold">Patient</th>
                <th className="px-4 py-3 font-semibold">Visit</th>
                <th className="px-4 py-3 font-semibold">Starts</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {dashboard.recentAppointments.map((appointment: any) => (
                <tr key={appointment.appointmentId}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{appointment.patientName}</p>
                    <p className="mt-1 text-sm text-slate-500">{appointment.patientMobile || "—"}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <p>{appointment.serviceType}</p>
                    <p className="mt-1 text-slate-500">{appointment.status}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {new Date(appointment.startTime).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{appointment.creationSource || "MANUAL"}</td>
                  <td className="px-4 py-3">
                    <StatusPill
                      label={appointment.paymentStatus || "Pending"}
                      tone={
                        appointment.paymentStatus?.toUpperCase() === "PAID"
                          ? "green"
                          : "amber"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

export default function ClinicAdminDashboardPage({
  params,
}: {
  params: { clinicId: string };
}) {
  return (
    <ApolloProvider client={client}>
      <ClinicDashboardContent clinicId={params.clinicId} />
    </ApolloProvider>
  );
}
