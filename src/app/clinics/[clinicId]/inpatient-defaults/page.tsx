"use client";

import { ApolloProvider, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "@/lib/apolloclient";
import { UPSERT_INPATIENT_MODULE_SETTINGS } from "@/graphql/mutation/inpatientModuleSettings";
import { GET_INPATIENT_MODULE_SETTINGS } from "@/graphql/query/inpatientModuleSettings";
import { GET_CLINICS } from "@/graphql/query/clinics";

type Props = {
  params: {
    clinicId: string;
  };
};

const DEFAULT_INPATIENT_SETTINGS = {
  wardBedTariffs: [
    {
      wardType: "General",
      bedType: "Standard",
      dailyRate: 2500,
      nursingRate: 500,
    },
    {
      wardType: "ICU",
      bedType: "ICU Bed",
      dailyRate: 12000,
      nursingRate: 1500,
    },
  ],
  chargeHeads: [
    {
      code: "BED",
      name: "Bed Charges",
      chargeType: "BED",
      taxRate: 0,
      department: "IPD",
    },
    {
      code: "PROCEDURE",
      name: "Procedure Charges",
      chargeType: "PROCEDURE",
      taxRate: 0,
      department: "Clinical",
    },
  ],
  packageTemplates: [
    {
      name: "Standard IP Package",
      amount: 25000,
      includedChargeTypes: ["BED", "NURSING"],
      excludedChargeTypes: ["PHARMACY", "LAB"],
    },
  ],
  taxSettings: {
    defaultTaxRate: 0,
    gstin: "",
    sacCode: "",
    applyTaxTo: ["PROCEDURE", "CONSUMABLE"],
  },
  invoiceSettings: {
    prefix: "IP",
    showCancelledLines: true,
    showVoidedPayments: true,
    footerNote: "This is a computer generated bill.",
  },
  autoPostSettings: {
    bedCharges: false,
    orders: false,
    mar: false,
    inventory: false,
  },
};

type InpatientSettingsKey = keyof typeof DEFAULT_INPATIENT_SETTINGS;

const SETTINGS_FIELDS: Array<{
  key: InpatientSettingsKey;
  label: string;
  helper: string;
}> = [
  {
    key: "wardBedTariffs",
    label: "Ward and Bed Tariffs",
    helper: "Default bed, ward, and nursing tariffs for daily IP billing.",
  },
  {
    key: "chargeHeads",
    label: "Charge Heads",
    helper:
      "Reusable charge heads for bed, procedure, nursing, pharmacy, lab, and consumables.",
  },
  {
    key: "packageTemplates",
    label: "Package Templates",
    helper: "Package definitions with included and excluded charge types.",
  },
  {
    key: "taxSettings",
    label: "Tax Settings",
    helper: "GST/SAC and taxable charge configuration.",
  },
  {
    key: "invoiceSettings",
    label: "Invoice Settings",
    helper: "Print prefix, correction visibility, and bill footer defaults.",
  },
  {
    key: "autoPostSettings",
    label: "Auto-post Settings",
    helper:
      "Controls for future automated charge posting from inpatient workflows.",
  },
];

const stringifyJson = (value: any) => JSON.stringify(value, null, 2);

const buildDefaultSettingsState = () =>
  Object.keys(DEFAULT_INPATIENT_SETTINGS).reduce(
    (acc, key) => {
      const settingsKey = key as InpatientSettingsKey;
      acc[settingsKey] = stringifyJson(DEFAULT_INPATIENT_SETTINGS[settingsKey]);
      return acc;
    },
    {} as Record<InpatientSettingsKey, string>,
  );

const InpatientDefaultsPageContent = ({ clinicId }: { clinicId: string }) => {
  const [settingsJson, setSettingsJson] = useState<
    Record<InpatientSettingsKey, string>
  >(buildDefaultSettingsState());

  const { data: clinicsData } = useQuery(GET_CLINICS);
  const {
    data: settingsData,
    loading: loadingSettings,
    refetch,
  } = useQuery(GET_INPATIENT_MODULE_SETTINGS, {
    variables: { clinicId },
  });

  const [upsertSettings, { loading: savingSettings }] = useMutation(
    UPSERT_INPATIENT_MODULE_SETTINGS,
  );

  const clinicName = useMemo(() => {
    const clinic = clinicsData?.getClinics?.find(
      (item: any) => item.id === clinicId,
    );
    return clinic?.name || "Clinic";
  }, [clinicsData, clinicId]);

  const settings = settingsData?.getInpatientModuleSettings;

  useEffect(() => {
    if (!settings) {
      setSettingsJson(buildDefaultSettingsState());
      return;
    }

    setSettingsJson({
      wardBedTariffs: stringifyJson(
        settings.wardBedTariffs ?? DEFAULT_INPATIENT_SETTINGS.wardBedTariffs,
      ),
      chargeHeads: stringifyJson(
        settings.chargeHeads ?? DEFAULT_INPATIENT_SETTINGS.chargeHeads,
      ),
      packageTemplates: stringifyJson(
        settings.packageTemplates ??
          DEFAULT_INPATIENT_SETTINGS.packageTemplates,
      ),
      taxSettings: stringifyJson(
        settings.taxSettings ?? DEFAULT_INPATIENT_SETTINGS.taxSettings,
      ),
      invoiceSettings: stringifyJson(
        settings.invoiceSettings ?? DEFAULT_INPATIENT_SETTINGS.invoiceSettings,
      ),
      autoPostSettings: stringifyJson(
        settings.autoPostSettings ??
          DEFAULT_INPATIENT_SETTINGS.autoPostSettings,
      ),
    });
  }, [settings]);

  const updateField = (key: InpatientSettingsKey, value: string) => {
    setSettingsJson((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const parseSettingsJson = (key: InpatientSettingsKey, label: string) => {
    try {
      return JSON.parse(settingsJson[key]);
    } catch {
      throw new Error(`${label} should contain valid JSON`);
    }
  };

  const handleResetExamples = () => {
    setSettingsJson(buildDefaultSettingsState());
  };

  const handleSave = async () => {
    try {
      await upsertSettings({
        variables: {
          input: {
            clinicId,
            wardBedTariffs: parseSettingsJson(
              "wardBedTariffs",
              "Ward and bed tariffs",
            ),
            chargeHeads: parseSettingsJson("chargeHeads", "Charge heads"),
            packageTemplates: parseSettingsJson(
              "packageTemplates",
              "Package templates",
            ),
            taxSettings: parseSettingsJson("taxSettings", "Tax settings"),
            invoiceSettings: parseSettingsJson(
              "invoiceSettings",
              "Invoice settings",
            ),
            autoPostSettings: parseSettingsJson(
              "autoPostSettings",
              "Auto-post settings",
            ),
          },
        },
      });
      await refetch();
      toast.success("Inpatient defaults saved successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save inpatient defaults");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/clinics"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Back to clinics
            </Link>
            <Typography
              variant="h3"
              color="blue-gray"
              className="mt-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Inpatient Defaults
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {clinicName}
            </Typography>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outlined"
              color="gray"
              onClick={handleResetExamples}
              disabled={savingSettings}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Reset Examples
            </Button>
            <Button
              color="blue"
              onClick={handleSave}
              disabled={savingSettings || loadingSettings}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {savingSettings ? (
                <Spinner
                  className="h-4 w-4"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              ) : (
                "Save Defaults"
              )}
            </Button>
          </div>
        </div>

        <Card
          className="w-full"
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
              variant="h5"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Billing and Operational Defaults
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              These defaults are stored as structured JSON so clinic-specific
              billing rules can evolve without schema churn.
            </Typography>
          </CardHeader>
          <CardBody
            className="space-y-5"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {loadingSettings ? (
              <div className="flex justify-center py-16">
                <Spinner
                  className="h-8 w-8"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {SETTINGS_FIELDS.map((field) => (
                  <div
                    key={field.key}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <label className="block text-base font-semibold text-gray-800">
                      {field.label}
                    </label>
                    <p className="mt-1 text-sm text-gray-500">{field.helper}</p>
                    <textarea
                      value={settingsJson[field.key]}
                      onChange={(event) =>
                        updateField(field.key, event.target.value)
                      }
                      rows={14}
                      className="mt-3 w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm leading-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
};

export default function InpatientDefaultsPage({ params }: Props) {
  return (
    <ApolloProvider client={client}>
      <InpatientDefaultsPageContent clinicId={params.clinicId} />
    </ApolloProvider>
  );
}
