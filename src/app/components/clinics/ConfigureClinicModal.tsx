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
import {
  CREATE_CLINIC_MILESTONE,
  DELETE_CLINIC_MILESTONE,
  EVALUATE_CLINIC_MILESTONES,
  UPDATE_CLINIC_MILESTONE,
} from "@/graphql/mutation/clinicMilestones";
import {
  GET_CLINIC_MILESTONE_PROGRESS,
  GET_CLINIC_MILESTONES,
} from "@/graphql/query/clinicMilestones";
import Link from "next/link";
import React, { useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  clinic: GetClinicsQuery["getClinics"][0] | null;
  open: boolean;
  onClose: () => void;
  standalone?: boolean;
};

type ClinicFeature = {
  id: string | null;
  value: string;
};

const INPATIENT_MODULE_KEY = "Inpatient";
const AI_PRESCRIPTION_ASSISTANT_KEY = "AiPrescriptionAssistant";
const MILESTONES_FEATURE_KEY = "Milestones";

type MilestoneTab = "addons" | "modules" | "milestones";

type MilestoneMetricType =
  | "APPOINTMENTS_CREATED"
  | "AI_APPOINTMENTS_CREATED"
  | "BILLINGS_CREATED";

type MilestoneRewardType =
  | "OWNER_SUBSCRIPTION_DAYS"
  | "CLINIC_WALLET_INR"
  | "WHATSAPP_CREDITS"
  | "SMS_CREDITS"
  | "VIDEO_CREDITS";

type MilestoneFormState = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  metricType: MilestoneMetricType;
  targetValue: number;
  rewardType: MilestoneRewardType;
  rewardValue: number;
  repeatable: boolean;
  sortOrder: number;
};

const FEATURE_COPY: Record<string, { label: string; description: string }> = {
  [AI_PRESCRIPTION_ASSISTANT_KEY]: {
    label: "AI Prescription Assistant",
    description:
      "Enable realtime consultation listening and prescription auto-fill for this clinic.",
  },
  [MILESTONES_FEATURE_KEY]: {
    label: "Milestones",
    description:
      "Unlock rewards automatically when a clinic hits configured activity goals.",
  },
};

const METRIC_OPTIONS: { value: MilestoneMetricType; label: string }[] = [
  { value: "APPOINTMENTS_CREATED", label: "Appointments created" },
  { value: "AI_APPOINTMENTS_CREATED", label: "AI-booked appointments" },
  { value: "BILLINGS_CREATED", label: "Billings created" },
];

const REWARD_OPTIONS: { value: MilestoneRewardType; label: string }[] = [
  { value: "OWNER_SUBSCRIPTION_DAYS", label: "Owner subscription days" },
  { value: "CLINIC_WALLET_INR", label: "Clinic wallet (INR)" },
  { value: "WHATSAPP_CREDITS", label: "WhatsApp credits" },
  { value: "SMS_CREDITS", label: "SMS credits" },
  { value: "VIDEO_CREDITS", label: "Video credits" },
];

const DEFAULT_MILESTONE_DURATION_DAYS = 30;

const DEFAULT_MILESTONE_FORM: MilestoneFormState = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  metricType: "APPOINTMENTS_CREATED",
  targetValue: 100,
  rewardType: "OWNER_SUBSCRIPTION_DAYS",
  rewardValue: 30,
  repeatable: false,
  sortOrder: 0,
};

const getDefaultMilestoneForm = (): MilestoneFormState => ({
  ...DEFAULT_MILESTONE_FORM,
  startDate: todayInputValue(),
  endDate: daysFromTodayInputValue(DEFAULT_MILESTONE_DURATION_DAYS),
});

const todayInputValue = () => new Date().toISOString().slice(0, 10);

const daysFromTodayInputValue = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

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

const formatDateRange = (startDate?: string | null, endDate?: string | null) => {
  if (!startDate || !endDate) return "No window set";
  return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
};

const getMilestoneWindowLabel = (status?: string | null) => {
  switch (status) {
    case "UPCOMING":
      return "Upcoming";
    case "ACTIVE":
      return "Active";
    case "EXPIRED":
      return "Expired";
    case "PAUSED":
      return "Paused";
    default:
      return "Unknown";
  }
};

const getMilestoneWindowBadgeClass = (status?: string | null) => {
  switch (status) {
    case "UPCOMING":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "ACTIVE":
      return "border-green-200 bg-green-50 text-green-700";
    case "EXPIRED":
      return "border-red-200 bg-red-50 text-red-700";
    case "PAUSED":
      return "border-gray-200 bg-gray-50 text-gray-600";
    default:
      return "border-gray-200 bg-gray-50 text-gray-600";
  }
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

const ConfigureClinicModal = ({ clinic, open, onClose, standalone = false }: Props) => {
  const [activeTab, setActiveTab] = useState<MilestoneTab>("addons");
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
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
  const [milestoneForm, setMilestoneForm] = useState<MilestoneFormState>(
    getDefaultMilestoneForm(),
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
  const {
    data: milestonesData,
    loading: loadingMilestones,
    refetch: refetchMilestones,
  } = useQuery(GET_CLINIC_MILESTONES, {
    variables: { clinicId: clinic?.id || "" },
    skip: !open || !clinic,
  });
  const {
    data: milestoneProgressData,
    loading: loadingMilestoneProgress,
    refetch: refetchMilestoneProgress,
  } = useQuery(GET_CLINIC_MILESTONE_PROGRESS, {
    variables: { clinicId: clinic?.id || "" },
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
  const [createClinicMilestone, { loading: creatingMilestone }] = useMutation(
    CREATE_CLINIC_MILESTONE,
    {
      onError: (error) => {
        console.error("Error creating milestone:", error);
      },
    },
  );
  const [updateClinicMilestone, { loading: updatingMilestone }] = useMutation(
    UPDATE_CLINIC_MILESTONE,
    {
      onError: (error) => {
        console.error("Error updating milestone:", error);
      },
    },
  );
  const [deleteClinicMilestone, { loading: deletingMilestone }] = useMutation(
    DELETE_CLINIC_MILESTONE,
    {
      onError: (error) => {
        console.error("Error deleting milestone:", error);
      },
    },
  );
  const [evaluateClinicMilestones, { loading: evaluatingMilestones }] =
    useMutation(EVALUATE_CLINIC_MILESTONES, {
      onError: (error) => {
        console.error("Error evaluating milestones:", error);
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
  const milestones: any[] = React.useMemo(
    () => milestonesData?.getClinicMilestones || [],
    [milestonesData],
  );
  const milestoneProgress: any[] = React.useMemo(
    () => milestoneProgressData?.getClinicMilestoneProgress || [],
    [milestoneProgressData],
  );
  const inpatientSubscription =
    inpatientSubscriptionData?.getClinicModuleSubscription;
  const isMilestonesEnabled = clinicFeatures.some(
    (feature) => feature.value === MILESTONES_FEATURE_KEY,
  );

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

  React.useEffect(() => {
    if (!open) {
      setMilestoneForm(getDefaultMilestoneForm());
      setEditingMilestoneId(null);
      setActiveTab("addons");
    }
  }, [open]);

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

  const handleEditMilestone = (milestone: any) => {
    setEditingMilestoneId(milestone.id);
    setMilestoneForm({
      title: milestone.title || "",
      description: milestone.description || "",
      startDate: toDateInputValue(milestone.startDate) || todayInputValue(),
      endDate:
        toDateInputValue(milestone.endDate) ||
        daysFromTodayInputValue(DEFAULT_MILESTONE_DURATION_DAYS),
      metricType: milestone.metricType,
      targetValue: Number(milestone.targetValue),
      rewardType: milestone.rewardType,
      rewardValue: Number(milestone.rewardValue),
      repeatable: Boolean(milestone.repeatable),
      sortOrder: Number(milestone.sortOrder || 0),
    });
  };

  const handleCancelMilestoneEdit = () => {
    setEditingMilestoneId(null);
    setMilestoneForm(getDefaultMilestoneForm());
  };

  const handleSaveMilestone = async () => {
    if (!clinic) return;

    try {
      if (editingMilestoneId) {
        await updateClinicMilestone({
          variables: {
            input: {
              milestoneId: editingMilestoneId,
              title: milestoneForm.title.trim(),
              description: milestoneForm.description.trim() || undefined,
              startDate: milestoneForm.startDate,
              endDate: milestoneForm.endDate,
              metricType: milestoneForm.metricType,
              targetValue: Number(milestoneForm.targetValue),
              rewardType: milestoneForm.rewardType,
              rewardValue: Number(milestoneForm.rewardValue),
              repeatable: milestoneForm.repeatable,
              sortOrder: Number(milestoneForm.sortOrder),
            },
          },
        });
      } else {
        await createClinicMilestone({
          variables: {
            input: {
              clinicId: clinic.id,
              title: milestoneForm.title.trim(),
              description: milestoneForm.description.trim() || undefined,
              startDate: milestoneForm.startDate,
              endDate: milestoneForm.endDate,
              metricType: milestoneForm.metricType,
              targetValue: Number(milestoneForm.targetValue),
              rewardType: milestoneForm.rewardType,
              rewardValue: Number(milestoneForm.rewardValue),
              repeatable: milestoneForm.repeatable,
              isActive: true,
              sortOrder: Number(milestoneForm.sortOrder),
            },
          },
        });
      }
      await Promise.all([refetchMilestones(), refetchMilestoneProgress()]);
      setMilestoneForm(getDefaultMilestoneForm());
      setEditingMilestoneId(null);
      toast.success(
        editingMilestoneId
          ? "Milestone updated successfully"
          : "Milestone created successfully",
      );
    } catch (error) {
      toast.error(
        editingMilestoneId
          ? "Failed to update milestone"
          : "Failed to create milestone",
      );
    }
  };

  const handleToggleMilestone = async (
    milestoneId: string,
    nextIsActive: boolean,
  ) => {
    try {
      await updateClinicMilestone({
        variables: {
          input: {
            milestoneId,
            isActive: nextIsActive,
          },
        },
      });
      await Promise.all([refetchMilestones(), refetchMilestoneProgress()]);
      toast.success(
        nextIsActive ? "Milestone activated" : "Milestone paused",
      );
    } catch (error) {
      toast.error("Failed to update milestone");
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    try {
      await deleteClinicMilestone({
        variables: { milestoneId },
      });
      await Promise.all([refetchMilestones(), refetchMilestoneProgress()]);
      toast.success("Milestone removed");
    } catch (error) {
      toast.error("Failed to remove milestone");
    }
  };

  const handleEvaluateMilestones = async () => {
    if (!clinic) return;

    try {
      const result = await evaluateClinicMilestones({
        variables: { clinicId: clinic.id },
      });
      await Promise.all([refetchMilestones(), refetchMilestoneProgress()]);
      const count = result.data?.evaluateClinicMilestones?.length || 0;
      toast.success(
        count > 0
          ? `${count} reward${count > 1 ? "s" : ""} issued`
          : "No new rewards unlocked",
      );
    } catch (error) {
      toast.error("Failed to evaluate milestones");
    }
  };

  const getMetricLabel = (value: string) =>
    METRIC_OPTIONS.find((option) => option.value === value)?.label || value;

  const getRewardLabel = (value: string) =>
    REWARD_OPTIONS.find((option) => option.value === value)?.label || value;

  const formatRewardValue = (type: string, value: number) => {
    if (type === "OWNER_SUBSCRIPTION_DAYS") return `${value} day${value > 1 ? "s" : ""}`;
    if (type === "CLINIC_WALLET_INR") return `₹${value}`;
    return `${value} credit${value > 1 ? "s" : ""}`;
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

  const body = (
    <div className={standalone ? "rounded-2xl border border-gray-200 bg-white shadow-sm" : ""}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Configure Clinic
            </Typography>
            {standalone && clinic && (
              <Typography
                variant="small"
                color="gray"
                className="mt-1"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Manage add-ons, modules, and milestone rewards for {clinic.name}
              </Typography>
            )}
          </div>
          {!standalone && (
            <button
              className="text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          )}
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
            {!standalone && (
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
                  <button
                    onClick={() => setActiveTab("milestones")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "milestones"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Milestones
                  </button>
                </nav>
              </div>
            )}
            {standalone && (
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex flex-wrap gap-6">
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
                  <button
                    onClick={() => setActiveTab("milestones")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "milestones"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Milestones
                  </button>
                </nav>
              </div>
            )}
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

              {activeTab === "milestones" && (
                <div className="mt-6 space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Milestone rewards
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-1"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Define activity-based rewards for this clinic and let
                          the backend apply them automatically.
                        </Typography>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                            isMilestonesEnabled
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-amber-200 bg-amber-50 text-amber-700"
                          }`}
                        >
                          {isMilestonesEnabled
                            ? "Milestones add-on enabled"
                            : "Enable the Milestones add-on in Add Ons"}
                        </span>
                        <Button
                          color="blue"
                          variant="outlined"
                          onClick={handleEvaluateMilestones}
                          disabled={evaluatingMilestones || !clinic}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {evaluatingMilestones ? "Checking..." : "Run evaluation"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-4"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {editingMilestoneId ? "Edit milestone" : "Create milestone"}
                      </Typography>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Title
                          </label>
                          <input
                            type="text"
                            value={milestoneForm.title}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                title: event.target.value,
                              }))
                            }
                            placeholder="100 appointments unlocks +30 days"
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            value={milestoneForm.description}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                description: event.target.value,
                              }))
                            }
                            rows={2}
                            placeholder="Reward the clinic when the threshold is met."
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Start date
                          </label>
                          <input
                            type="date"
                            value={milestoneForm.startDate}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                startDate: event.target.value,
                              }))
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            End date
                          </label>
                          <input
                            type="date"
                            value={milestoneForm.endDate}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                endDate: event.target.value,
                              }))
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Metric
                          </label>
                          <select
                            value={milestoneForm.metricType}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                metricType: event.target.value as MilestoneMetricType,
                              }))
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {METRIC_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Target
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={milestoneForm.targetValue}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                targetValue: Number(event.target.value),
                              }))
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Reward
                          </label>
                          <select
                            value={milestoneForm.rewardType}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                rewardType: event.target.value as MilestoneRewardType,
                              }))
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {REWARD_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Reward value
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={milestoneForm.rewardValue}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                rewardValue: Number(event.target.value),
                              }))
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Sort order
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={milestoneForm.sortOrder}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                sortOrder: Number(event.target.value),
                              }))
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-7">
                          <input
                            id="repeatable-milestone"
                            type="checkbox"
                            checked={milestoneForm.repeatable}
                            onChange={(event) =>
                              setMilestoneForm((prev) => ({
                                ...prev,
                                repeatable: event.target.checked,
                              }))
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="repeatable-milestone"
                            className="text-sm font-medium text-gray-700"
                          >
                            Repeatable reward
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-3">
                        {editingMilestoneId && (
                          <Button
                            color="blue-gray"
                            variant="text"
                            onClick={handleCancelMilestoneEdit}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          color="blue"
                          onClick={handleSaveMilestone}
                          disabled={
                            creatingMilestone ||
                            updatingMilestone ||
                            !clinic ||
                            !milestoneForm.title.trim() ||
                            !milestoneForm.startDate ||
                            !milestoneForm.endDate ||
                            milestoneForm.targetValue < 1 ||
                            milestoneForm.rewardValue < 1
                          }
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {creatingMilestone || updatingMilestone
                            ? "Saving..."
                            : editingMilestoneId
                              ? "Save changes"
                              : "Create milestone"}
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Current progress
                        </Typography>
                        {(loadingMilestones || loadingMilestoneProgress) && (
                          <Spinner
                            className="h-5 w-5"
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        )}
                      </div>
                      <div className="space-y-3">
                        {milestoneProgress.length === 0 ? (
                          <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                            No milestones configured for this clinic yet.
                          </div>
                        ) : (
                          milestoneProgress.map((milestone) => (
                            <div
                              key={milestone.id}
                              className="rounded-lg border border-gray-200 p-4"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {milestone.title}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500">
                                    {getMetricLabel(milestone.metricType)}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500">
                                    {formatDateRange(
                                      milestone.startDate,
                                      milestone.endDate,
                                    )}
                                  </p>
                                </div>
                                <span
                                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getMilestoneWindowBadgeClass(
                                    milestone.windowStatus,
                                  )}`}
                                >
                                  {getMilestoneWindowLabel(
                                    milestone.windowStatus,
                                  )}
                                </span>
                              </div>
                              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                                <div
                                  className="h-full rounded-full bg-blue-500"
                                  style={{
                                    width: `${Math.min(milestone.progressPercent, 100)}%`,
                                  }}
                                />
                              </div>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>
                                  {milestone.currentProgress} / {milestone.targetValue}
                                </span>
                                <span>
                                  {formatRewardValue(
                                    milestone.rewardType,
                                    milestone.rewardValue,
                                  )}
                                </span>
                              </div>
                              <div className="mt-3 flex items-center justify-between gap-2">
                                <div className="text-xs text-gray-500">
                                  <div>
                                    Unlocked {milestone.achievedCount} time
                                    {milestone.achievedCount === 1 ? "" : "s"}
                                  </div>
                                  <div className="mt-1">
                                    {milestone.windowStatus === "UPCOMING"
                                      ? `Starts in ${milestone.daysUntilStart} day${
                                          milestone.daysUntilStart === 1
                                            ? ""
                                            : "s"
                                        }`
                                      : milestone.windowStatus === "ACTIVE"
                                        ? `${milestone.daysRemaining} day${
                                            milestone.daysRemaining === 1
                                              ? ""
                                              : "s"
                                          } left`
                                        : milestone.windowStatus === "EXPIRED"
                                          ? "Window expired"
                                          : "Paused"}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outlined"
                                    color={milestone.isActive ? "blue-gray" : "green"}
                                    onClick={() =>
                                      handleToggleMilestone(
                                        milestone.id,
                                        !milestone.isActive,
                                      )
                                    }
                                    disabled={updatingMilestone}
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                  >
                                    {milestone.isActive ? "Pause" : "Activate"}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="text"
                                    color="red"
                                    onClick={() =>
                                      handleDeleteMilestone(milestone.id)
                                    }
                                    disabled={deletingMilestone}
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {milestones.length > 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-4"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Configured milestones
                      </Typography>
                      <div className="space-y-3">
                        {milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {milestone.title}
                                  </p>
                                  {milestone.repeatable && (
                                    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                                      Repeatable
                                    </span>
                                  )}
                                  <span
                                    className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${getMilestoneWindowBadgeClass(
                                      milestone.windowStatus,
                                    )}`}
                                  >
                                    {getMilestoneWindowLabel(
                                      milestone.windowStatus,
                                    )}
                                  </span>
                                </div>
                                {milestone.description && (
                                  <p className="mt-1 text-sm text-gray-500">
                                    {milestone.description}
                                  </p>
                                )}
                                <div className="mt-3 grid gap-2 text-xs text-gray-600 md:grid-cols-5">
                                  <span>
                                    Window:{" "}
                                    {formatDateRange(
                                      milestone.startDate,
                                      milestone.endDate,
                                    )}
                                  </span>
                                  <span>Metric: {getMetricLabel(milestone.metricType)}</span>
                                  <span>Target: {milestone.targetValue}</span>
                                  <span>
                                    Reward: {getRewardLabel(milestone.rewardType)}
                                  </span>
                                  <span>
                                    Value:{" "}
                                    {formatRewardValue(
                                      milestone.rewardType,
                                      milestone.rewardValue,
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outlined"
                                  color="blue"
                                  onClick={() => handleEditMilestone(milestone)}
                                  placeholder={undefined}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {standalone ? (
        body
      ) : (
        <Dialog
          open={open}
          handler={onClose}
          size="lg"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {body}
        </Dialog>
      )}
      <ToastContainer />
    </>
  );
};

export default ConfigureClinicModal;
