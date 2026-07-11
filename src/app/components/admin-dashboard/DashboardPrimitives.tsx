"use client";

import { Spinner, Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

export function DashboardLoading() {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
      <Spinner
        className="h-10 w-10"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
    </div>
  );
}

export function DashboardError({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-3xl border border-red-100 bg-red-50 p-6 shadow-sm">
      <Typography
        variant="h5"
        color="red"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {title}
      </Typography>
      <Typography
        color="gray"
        className="mt-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {message}
      </Typography>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        {eyebrow ? <div className="mb-2">{eyebrow}</div> : null}
        <Typography
          variant="h3"
          color="blue-gray"
          className="text-3xl font-semibold"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            color="gray"
            className="mt-2 text-base"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {subtitle}
          </Typography>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className || ""}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="text-xl font-semibold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {title}
          </Typography>
          {subtitle ? (
            <Typography
              color="gray"
              className="mt-1 text-sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {subtitle}
            </Typography>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "blue",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "blue" | "green" | "amber" | "slate";
}) {
  const toneStyles = {
    blue: "border-blue-100 bg-blue-50/60",
    green: "border-emerald-100 bg-emerald-50/70",
    amber: "border-amber-100 bg-amber-50/80",
    slate: "border-slate-200 bg-slate-50/70",
  }[tone];

  return (
    <div className={`rounded-2xl border p-5 ${toneStyles}`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function StatusPill({
  label,
  tone = "blue",
}: {
  label: string;
  tone?: "blue" | "green" | "amber" | "red" | "slate";
}) {
  const toneStyles = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    red: "bg-rose-50 text-rose-700 ring-rose-100",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
  }[tone];

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${toneStyles}`}>
      {label}
    </span>
  );
}
