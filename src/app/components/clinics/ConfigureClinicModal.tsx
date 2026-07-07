import { GetClinicsQuery } from "@/gql/graphql";
import { Dialog, Typography, Button, Spinner } from "@material-tailwind/react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_CLINIC_FEATURES,
  GET_CLINIC_FEATURES,
} from "@/graphql/query/clinicFeatures";
import {
  ASSIGN_CLINIC_FEATURES,
  REMOVE_CLINIC_FEATURES,
} from "@/graphql/mutation/clinicFeatures";
import { GET_CLINIC_MODULE_SUBSCRIPTION } from "@/graphql/query/clinicModuleSubscriptions";
import {
  UPDATE_CLINIC_MODULE_SUBSCRIPTION_STATUS,
  UPSERT_CLINIC_MODULE_SUBSCRIPTION,
} from "@/graphql/mutation/clinicModuleSubscriptions";
import Link from "next/link";
import React, { useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  clinic: GetClinicsQuery["getClinics"][0] | null;
  open: boolean;
  onClose: () => void;
};

type ClinicFeature = {
  id: string | null;
  value: string;
};

const INPATIENT_MODULE_KEY = "Inpatient";
const AI_PRESCRIPTION_ASSISTANT_KEY = "AiPrescriptionAssistant";

const FEATURE_COPY: Record<string, { label: string; description: string }> = {
  [AI_PRESCRIPTION_ASSISTANT_KEY]: {
    label: "AI Prescription Assistant",
    description:
      "Enable realtime consultation listening and prescription auto-fill for this clinic.",
  },
};

const todayInputValue = () => new Date().toISOString().slice(0, 10);

const oneYearFromTodayInputValue = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 10);
};

const toDateInputValue = (value?: string | null) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const formatDisplayDate = (value?: string | null) => {
  if (!value) return "Not set";
  return new Date(value).toLocaleDateString();
};

const getStatusLabel = (status?: string | null) => {
  if (!status) return "Not configured";
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const getStatusBadgeClass = (status?: string | null) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-50 text-green-700 border-green-200";
    case "TRIAL":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "SUSPENDED":
      return "bg-red-50 text-red-700 border-red-200";
    case "SUBSCRIPTION_DONE":
    case "TRIAL_ENDED":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getFeatureMeta = (value: string) =>
  FEATURE_COPY[value] || {
    label: value,
    description: "Clinic add-on enabled for this workspace.",
  };

const ConfigureClinicModal = ({ clinic, open, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<"addons" | "modules">("addons");
  const [selectedFeature, setSelectedFeature] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [inpatientStatus, setInpatientStatus] = useState("ACTIVE");
  const [inpatientStartDate, setInpatientStartDate] =
    useState(todayInputValue());
  const [inpatientEndDate, setInpatientEndDate] = useState(
    oneYearFromTodayInputValue(),
  );

  // Fetch all available clinic features
  const { data: allFeaturesData, loading: loadingAllFeatures } = useQuery(
    GET_ALL_CLINIC_FEATURES,
    {
      skip: !open || !clinic,
    },
  );

  // Fetch clinic's assigned features
  const {
    data: clinicFeaturesData,
    loading: loadingClinicFeatures,
    refetch: refetchClinicFeatures,
  } = useQuery(GET_CLINIC_FEATURES, {
    variables: { clinicId: clinic?.id || "" },
    skip: !open || !clinic,
  });
  const {
    data: inpatientSubscriptionData,
    loading: loadingInpatientSubscription,
    refetch: refetchInpatientSubscription,
  } = useQuery(GET_CLINIC_MODULE_SUBSCRIPTION, {
    variables: {
      clinicId: clinic?.id || "",
      moduleKey: INPATIENT_MODULE_KEY,
    },
    skip: !open || !clinic,
  });

  const [assignFeatures, { loading: assigning }] = useMutation(
    ASSIGN_CLINIC_FEATURES,
    {
      onCompleted: () => {
        refetchClinicFeatures();
        setSelectedFeature(null);
      },
      onError: (error) => {
        console.error("Error assigning features:", error);
      },
    },
  );

  const [removeFeatures, { loading: removing }] = useMutation(
    REMOVE_CLINIC_FEATURES,
    {
      onCompleted: () => {
        refetchClinicFeatures();
      },
      onError: (error) => {
        console.error("Error removing features:", error);
      },
    },
  );
  const [
    upsertClinicModuleSubscription,
    { loading: savingInpatientSubscription },
  ] = useMutation(UPSERT_CLINIC_MODULE_SUBSCRIPTION, {
    onError: (error) => {
      console.error("Error saving inpatient subscription:", error);
    },
  });
  const [
    updateClinicModuleSubscriptionStatus,
    { loading: removingInpatientSubscription },
  ] = useMutation(UPDATE_CLINIC_MODULE_SUBSCRIPTION_STATUS, {
    onError: (error) => {
      console.error("Error removing inpatient subscription:", error);
    },
  });

  const allFeatures: ClinicFeature[] = React.useMemo(
    () => allFeaturesData?.getAllClinicFeatures || [],
    [allFeaturesData],
  );
  const clinicFeatures: ClinicFeature[] = React.useMemo(
    () => clinicFeaturesData?.getClinicFeatures || [],
    [clinicFeaturesData],
  );
  const inpatientSubscription =
    inpatientSubscriptionData?.getClinicModuleSubscription;

  // Debug logging
  React.useEffect(() => {
    if (allFeaturesData) {
      console.log("All features data:", allFeaturesData);
      console.log("All features array:", allFeatures);
    }
    if (clinicFeaturesData) {
      console.log("Clinic features data:", clinicFeaturesData);
      console.log("Clinic features array:", clinicFeatures);
    }
  }, [allFeaturesData, clinicFeaturesData, allFeatures, clinicFeatures]);

  React.useEffect(() => {
    if (inpatientSubscription) {
      setInpatientStatus(inpatientSubscription.status || "ACTIVE");
      setInpatientStartDate(
        toDateInputValue(inpatientSubscription.startDate) || todayInputValue(),
      );
      setInpatientEndDate(
        toDateInputValue(inpatientSubscription.endDate) ||
          oneYearFromTodayInputValue(),
      );
      return;
    }

    if (open) {
      setInpatientStatus("ACTIVE");
      setInpatientStartDate(todayInputValue());
      setInpatientEndDate(oneYearFromTodayInputValue());
    }
  }, [inpatientSubscription, open]);

  // Get available features (not already assigned)
  const availableFeatures = allFeatures.filter(
    (feature) =>
      feature.value !== INPATIENT_MODULE_KEY &&
      !clinicFeatures.some((cf) => cf.value === feature.value),
  );

  // Convert to options for react-select
  const featureOptions = availableFeatures.map((feature) => ({
    value: feature.value,
    label: getFeatureMeta(feature.value).label,
  }));

  const handleAddFeature = () => {
    if (!selectedFeature || !clinic) return;

    assignFeatures({
      variables: {
        input: {
          clinicId: clinic.id,
          featureValues: [selectedFeature.value],
        },
      },
    });
  };

  const handleRemoveFeature = (featureValue: string) => {
    if (!clinic) return;
    if (featureValue === INPATIENT_MODULE_KEY) return;

    removeFeatures({
      variables: {
        input: {
          clinicId: clinic.id,
          featureValues: [featureValue],
        },
      },
    });
  };

  const handleSaveInpatientSubscription = async () => {
    if (!clinic) return;

    try {
      await upsertClinicModuleSubscription({
        variables: {
          input: {
            clinicId: clinic.id,
            moduleKey: INPATIENT_MODULE_KEY,
            status: inpatientStatus,
            startDate: inpatientStartDate,
            endDate: inpatientEndDate,
          },
        },
      });
      await Promise.all([
        refetchInpatientSubscription(),
        refetchClinicFeatures(),
      ]);
      toast.success("Inpatient module updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update Inpatient module");
    }
  };

  const handleRemoveInpatientSubscription = async () => {
    if (!inpatientSubscription?.id) {
      toast.info("Inpatient module is not configured for this clinic");
      return;
    }

    try {
      await updateClinicModuleSubscriptionStatus({
        variables: {
          input: {
            subscriptionId: inpatientSubscription.id,
            status: "SUSPENDED",
          },
        },
      });
      setInpatientStatus("SUSPENDED");
      await Promise.all([
        refetchInpatientSubscription(),
        refetchClinicFeatures(),
      ]);
      toast.success("Inpatient module removed from this clinic");
      onClose();
    } catch (error) {
      toast.error("Failed to remove Inpatient module");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        handler={onClose}
        size="lg"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Typography
              variant="h5"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Configure Clinic
            </Typography>
            <button
              className="text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          {clinic && (
            <div className="space-y-4">
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.name}
              </Typography>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("addons")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "addons"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Add Ons
                  </button>
                  <button
                    onClick={() => setActiveTab("modules")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "modules"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Modules
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === "addons" && (
                <div className="mt-6 space-y-6">
                  {/* Add Feature Section */}
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="mb-3"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Add Feature
                    </Typography>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        {loadingAllFeatures ? (
                          <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <Spinner
                              className="h-5 w-5"
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            />
                          </div>
                        ) : featureOptions.length === 0 ? (
                          <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <Typography
                              variant="small"
                              color="gray"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              {allFeatures.length === 0
                                ? "No features available"
                                : `All ${allFeatures.length} feature(s) are already assigned`}
                            </Typography>
                          </div>
                        ) : (
                          <Select
                            value={selectedFeature}
                            onChange={(option) => setSelectedFeature(option)}
                            options={featureOptions}
                            placeholder={`Select a feature to add (${featureOptions.length} available)`}
                            isSearchable={true}
                            isClearable={true}
                            styles={{
                              control: (base: any) => ({
                                ...base,
                                borderRadius: 8,
                                backgroundColor: "#f9fafb",
                                minHeight: 42,
                                borderColor: "#d1d5db",
                                "&:hover": { borderColor: "#d1d5db" },
                              }),
                              menu: (base: any) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                            }}
                          />
                        )}
                      </div>
                      <Button
                        onClick={handleAddFeature}
                        disabled={!selectedFeature || assigning}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {assigning ? (
                          <Spinner
                            className="h-4 w-4"
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        ) : (
                          "Add"
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Assigned Features Section */}
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="mb-3"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Assigned Features
                    </Typography>
                    {loadingClinicFeatures ? (
                      <div className="flex justify-center py-4">
                        <Spinner
                          className="h-6 w-6"
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                      </div>
                    ) : clinicFeatures.length === 0 ? (
                      <Typography
                        variant="small"
                        color="gray"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        No features assigned yet.
                      </Typography>
                    ) : (
                      <div className="space-y-2">
                        {clinicFeatures.map((feature, index) => (
                          <div
                            key={
                              feature.id || `feature-${index}-${feature.value}`
                            }
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="pr-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                {getFeatureMeta(feature.value).label}
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="mt-1"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                {getFeatureMeta(feature.value).description}
                              </Typography>
                            </div>
                            <Button
                              size="sm"
                              variant="text"
                              color="red"
                              onClick={() => handleRemoveFeature(feature.value)}
                              disabled={
                                removing ||
                                feature.value === INPATIENT_MODULE_KEY
                              }
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              {removing ? (
                                <Spinner
                                  className="h-4 w-4"
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                />
                              ) : feature.value === INPATIENT_MODULE_KEY ? (
                                "Managed in Modules"
                              ) : (
                                "Remove"
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "modules" && (
                <div className="mt-6 space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Inpatient Module
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-1"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Enable IP workflows for this clinic with a dated
                          module subscription.
                        </Typography>
                      </div>
                      {loadingInpatientSubscription && (
                        <Spinner
                          className="h-5 w-5"
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                      )}
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div className="rounded-md border border-gray-200 bg-white p-3">
                        <p className="text-xs font-medium uppercase text-gray-500">
                          Current Status
                        </p>
                        <span
                          className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(inpatientSubscription?.status)}`}
                        >
                          {getStatusLabel(inpatientSubscription?.status)}
                        </span>
                      </div>
                      <div className="rounded-md border border-gray-200 bg-white p-3">
                        <p className="text-xs font-medium uppercase text-gray-500">
                          Starts
                        </p>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {formatDisplayDate(inpatientSubscription?.startDate)}
                        </p>
                      </div>
                      <div className="rounded-md border border-gray-200 bg-white p-3">
                        <p className="text-xs font-medium uppercase text-gray-500">
                          Ends
                        </p>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {formatDisplayDate(inpatientSubscription?.endDate)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          value={inpatientStatus}
                          onChange={(event) =>
                            setInpatientStatus(event.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="TRIAL">Trial</option>
                          <option value="SUSPENDED">Suspended</option>
                          <option value="SUBSCRIPTION_DONE">
                            Subscription Done
                          </option>
                          <option value="TRIAL_ENDED">Trial Ended</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={inpatientStartDate}
                          onChange={(event) =>
                            setInpatientStartDate(event.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={inpatientEndDate}
                          onChange={(event) =>
                            setInpatientEndDate(event.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between gap-3">
                      <Button
                        color="red"
                        variant="outlined"
                        onClick={handleRemoveInpatientSubscription}
                        disabled={
                          !inpatientSubscription?.id ||
                          removingInpatientSubscription
                        }
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {removingInpatientSubscription ? (
                          <Spinner
                            className="h-4 w-4"
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        ) : (
                          "Remove Module"
                        )}
                      </Button>
                      <Button
                        color="blue"
                        onClick={handleSaveInpatientSubscription}
                        disabled={
                          savingInpatientSubscription ||
                          removingInpatientSubscription ||
                          !inpatientStartDate ||
                          !inpatientEndDate
                        }
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {savingInpatientSubscription ? (
                          <Spinner
                            className="h-4 w-4"
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        ) : (
                          "Save Inpatient Subscription"
                        )}
                      </Button>
                    </div>

                    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            Inpatient Defaults
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="mt-1"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            Manage ward tariffs, charge heads, packages, tax,
                            invoice, and auto-post settings on a full page.
                          </Typography>
                        </div>
                        <Link href={`/clinics/${clinic.id}/inpatient-defaults`}>
                          <Button
                            color="blue"
                            variant="outlined"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            Open Defaults
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default ConfigureClinicModal;
