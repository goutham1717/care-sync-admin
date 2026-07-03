import {
  Dialog,
  Typography,
  Button,
  Spinner,
  Input,
} from "@material-tailwind/react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOM_FEATURES, GET_DOCTOR } from '@/graphql/query/customFeatures';
import { ASSIGN_CUSTOM_FEATURES_TO_DOCTOR, REMOVE_CUSTOM_FEATURES_FROM_DOCTOR } from '@/graphql/mutation/customFeatures';
import { GET_DOCTOR_SUBSCRIPTION } from '@/graphql/query/subscription';
import { CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION_STATUS } from '@/graphql/mutation/subscription';
import { GET_DOCTOR_APPOINTMENT_LIMIT, GET_DOCTOR_CLINIC_ACCESS, GET_DOCTOR_SETTINGS } from '@/graphql/query/doctors';
import { ASSIGN_DOCTOR_TO_CLINICS, UPDATE_DOCTOR_APPOINTMENT_LIMIT, RECHARGE_APPOINTMENT_LIMIT } from '@/graphql/mutation/doctor';
import { GET_CLINICS } from '@/graphql/query/clinics';
import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';

type Doctor = {
  doctor_id: string;
  isActive: boolean;
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

type CustomFeature = {
  id: string | null;
  value: string;
};

type Clinic = {
  id: string;
  name: string;
  business_id: string;
  city_name?: string | null;
};

type ClinicOption = {
  value: string;
  label: string;
  businessId: string;
};

type Subscription = {
  id: string;
  doctorId: string;
  status: string;
  startDate: string;
  endDate: string;
  trialStartDate: string;
  trialEndDate: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  doctor: Doctor | null;
  currentClinicId?: string;
  open: boolean;
  onClinicAccessSaved?: () => void;
  onClose: () => void;
}

const SUBSCRIPTION_STATUSES = [
  { value: 'TRIAL', label: 'TRIAL - Doctor is in trial period' },
  { value: 'ACTIVE', label: 'ACTIVE - Doctor has an active paid subscription' },
  { value: 'SUSPENDED', label: 'SUSPENDED - Subscription is temporarily suspended' },
  { value: 'TRIAL_ENDED', label: 'TRIAL_ENDED - Trial period has ended, no active subscription' },
  { value: 'SUBSCRIPTION_DONE', label: 'SUBSCRIPTION_DONE - Subscription period has completed/expired' },
];

const ConfigureDoctorModal = ({ doctor, currentClinicId, open, onClinicAccessSaved, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<'subscription' | 'customFeatures' | 'appointmentLimit' | 'clinicAccess'>('subscription');
  const [selectedFeature, setSelectedFeature] = useState<{ value: string; label: string } | null>(null);
  const [selectedClinics, setSelectedClinics] = useState<ClinicOption[]>([]);

  // Subscription form state
  const [subscriptionForm, setSubscriptionForm] = useState({
    status: 'TRIAL',
    startDate: '',
    endDate: '',
    trialStartDate: '',
    trialEndDate: '',
  });

  // Fetch doctor's subscription
  const { data: subscriptionData, loading: loadingSubscription, refetch: refetchSubscription } = useQuery(
    GET_DOCTOR_SUBSCRIPTION,
    {
      variables: { doctorId: doctor?.doctor_id || '' },
      skip: !open || !doctor || activeTab !== 'subscription',
    }
  );

  const subscription: Subscription | null = subscriptionData?.getDoctorSubscription || null;
  const hasSubscription = !!subscription;

  // Update form when subscription data loads
  useEffect(() => {
    if (subscription) {
      setSubscriptionForm({
        status: subscription.status,
        startDate: subscription.startDate ? new Date(subscription.startDate).toISOString().slice(0, 16) : '',
        endDate: subscription.endDate ? new Date(subscription.endDate).toISOString().slice(0, 16) : '',
        trialStartDate: subscription.trialStartDate ? new Date(subscription.trialStartDate).toISOString().slice(0, 16) : '',
        trialEndDate: subscription.trialEndDate ? new Date(subscription.trialEndDate).toISOString().slice(0, 16) : '',
      });
    } else {
      // Reset to defaults if no subscription
      setSubscriptionForm({
        status: 'TRIAL',
        startDate: '',
        endDate: '',
        trialStartDate: '',
        trialEndDate: '',
      });
    }
  }, [subscription]);

  const [createSubscription, { loading: creatingSubscription }] = useMutation(CREATE_SUBSCRIPTION, {
    onCompleted: () => {
      refetchSubscription();
    },
    onError: (error) => {
      console.error('Error creating subscription:', error);
    },
  });

  const [updateSubscription, { loading: updatingSubscription }] = useMutation(UPDATE_SUBSCRIPTION, {
    onCompleted: () => {
      refetchSubscription();
    },
    onError: (error) => {
      console.error('Error updating subscription:', error);
    },
  });

  const [updateSubscriptionStatus, { loading: updatingStatus }] = useMutation(UPDATE_SUBSCRIPTION_STATUS, {
    onCompleted: () => {
      refetchSubscription();
    },
    onError: (error) => {
      console.error('Error updating subscription status:', error);
    },
  });

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;

    const formatDate = (dateString: string) => {
      if (!dateString) return null;
      return new Date(dateString).toISOString();
    };

    if (hasSubscription && subscription) {
      // Update existing subscription
      updateSubscription({
        variables: {
          input: {
            subscriptionId: subscription.id,
            status: subscriptionForm.status,
            startDate: formatDate(subscriptionForm.startDate),
            endDate: formatDate(subscriptionForm.endDate),
            trialStartDate: formatDate(subscriptionForm.trialStartDate),
            trialEndDate: formatDate(subscriptionForm.trialEndDate),
          },
        },
      });
    } else {
      // Create new subscription
      createSubscription({
        variables: {
          input: {
            doctorId: doctor.doctor_id,
            status: subscriptionForm.status,
            startDate: formatDate(subscriptionForm.startDate),
            endDate: formatDate(subscriptionForm.endDate),
            trialStartDate: formatDate(subscriptionForm.trialStartDate),
            trialEndDate: formatDate(subscriptionForm.trialEndDate),
          },
        },
      });
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (!subscription) return;
    
    updateSubscriptionStatus({
      variables: {
        input: {
          subscriptionId: subscription.id,
          status: newStatus,
        },
      },
    });
  };

  // Fetch all available custom features
  const { data: allFeaturesData, loading: loadingAllFeatures } = useQuery(GET_CUSTOM_FEATURES, {
    skip: !open || !doctor || activeTab !== 'customFeatures',
  });

  // Fetch doctor's assigned custom features
  const { data: doctorData, loading: loadingDoctorFeatures, refetch: refetchDoctorFeatures } = useQuery(
    GET_DOCTOR,
    {
      variables: { doctor_id: doctor?.doctor_id || '' },
      skip: !open || !doctor || activeTab !== 'customFeatures',
    }
  );

  const [assignFeatures, { loading: assigning }] = useMutation(ASSIGN_CUSTOM_FEATURES_TO_DOCTOR, {
    onCompleted: () => {
      refetchDoctorFeatures();
      setSelectedFeature(null);
    },
    onError: (error) => {
      console.error('Error assigning custom features:', error);
    },
  });

  const [removeFeatures, { loading: removing }] = useMutation(REMOVE_CUSTOM_FEATURES_FROM_DOCTOR, {
    onCompleted: () => {
      refetchDoctorFeatures();
    },
    onError: (error) => {
      console.error('Error removing custom features:', error);
    },
  });

  const allFeatures: CustomFeature[] = allFeaturesData?.getCustomFeatures || [];
  const doctorFeatures: CustomFeature[] = doctorData?.getDoctor?.customFeatures || [];

  // Clinic access
  const { data: clinicsData, loading: loadingClinics } = useQuery(GET_CLINICS, {
    skip: !open || !doctor || activeTab !== 'clinicAccess',
  });

  const {
    data: doctorClinicAccessData,
    loading: loadingDoctorClinicAccess,
    refetch: refetchDoctorClinicAccess,
  } = useQuery(
    GET_DOCTOR_CLINIC_ACCESS,
    {
      variables: { doctor_id: doctor?.doctor_id || '' },
      skip: !open || !doctor || activeTab !== 'clinicAccess',
    }
  );

  const allClinics: Clinic[] = useMemo(() => clinicsData?.getClinics || [], [clinicsData]);
  const assignedClinics: Clinic[] = useMemo(
    () => doctorClinicAccessData?.getDoctor?.profile?.professional?.clinic || [],
    [doctorClinicAccessData]
  );
  const clinicOptions: ClinicOption[] = useMemo(() => {
    const routeClinic = allClinics.find((clinic) => clinic.id === currentClinicId);
    const businessIdForClinicAccess = assignedClinics[0]?.business_id || routeClinic?.business_id || '';
    const businessClinics = businessIdForClinicAccess
      ? allClinics.filter((clinic) => clinic.business_id === businessIdForClinicAccess)
      : allClinics;

    return businessClinics.map((clinic) => ({
      value: clinic.id,
      label: clinic.city_name ? `${clinic.name} - ${clinic.city_name}` : clinic.name,
      businessId: clinic.business_id,
    }));
  }, [allClinics, assignedClinics, currentClinicId]);
  const assignedClinicIds = useMemo(() => assignedClinics.map((clinic) => clinic.id), [assignedClinics]);
  const savingClinicAccessDisabled = loadingClinics || loadingDoctorClinicAccess || clinicOptions.length === 0 || selectedClinics.length === 0;

  useEffect(() => {
    if (activeTab !== 'clinicAccess') return;

    const assignedOptions = clinicOptions.filter((option) => assignedClinicIds.includes(option.value));
    setSelectedClinics(assignedOptions);
  }, [activeTab, assignedClinicIds, clinicOptions]);

  const [assignDoctorToClinics, { loading: savingClinicAccess }] = useMutation(ASSIGN_DOCTOR_TO_CLINICS, {
    onCompleted: () => {
      refetchDoctorClinicAccess();
      onClinicAccessSaved?.();
    },
    onError: (error) => {
      console.error('Error assigning doctor to clinics:', error);
    },
  });

  // Appointment Limit
  const [newLimit, setNewLimit] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');

  const { data: doctorSettingsData, loading: loadingAppointmentLimit, refetch: refetchAppointmentLimit } = useQuery(
    GET_DOCTOR_SETTINGS,
    {
      variables: { doctor_id: doctor?.doctor_id || '' },
      skip: !open || !doctor || activeTab !== 'appointmentLimit',
    }
  );

  const currentLimit: number | null = doctorSettingsData?.getDoctorSettings?.appointmentLimit ?? null;
  const appointmentsUsed: number | null = doctorSettingsData?.getDoctorSettings?.appointmentsUsed ?? null;

  const [updateAppointmentLimit, { loading: updatingLimit }] = useMutation(UPDATE_DOCTOR_APPOINTMENT_LIMIT, {
    onCompleted: () => {
      refetchAppointmentLimit();
      setNewLimit('');
    },
    onError: (error) => {
      console.error('Error updating appointment limit:', error);
    },
  });

  const [rechargeLimit, { loading: recharging }] = useMutation(RECHARGE_APPOINTMENT_LIMIT, {
    onCompleted: () => {
      refetchAppointmentLimit();
      setRechargeAmount('');
    },
    onError: (error) => {
      console.error('Error recharging appointment limit:', error);
    },
  });

  const handleUpdateLimit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor || !newLimit) return;
    updateAppointmentLimit({
      variables: { doctor_id: doctor.doctor_id, appointmentLimit: parseInt(newLimit, 10) },
    });
  };

  const handleRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor || !rechargeAmount) return;
    rechargeLimit({
      variables: { doctor_id: doctor.doctor_id, amount: parseInt(rechargeAmount, 10) },
    });
  };

  // Get available features (not already assigned)
  const availableFeatures = allFeatures.filter(
    (feature) => !doctorFeatures.some((df) => df.value === feature.value)
  );

  // Convert to options for react-select
  const featureOptions = availableFeatures.map((feature) => ({
    value: feature.value,
    label: feature.value,
  }));

  const handleAddFeature = () => {
    if (!selectedFeature || !doctor) return;

    assignFeatures({
      variables: {
        input: {
          doctor_id: doctor.doctor_id,
          featureValues: [selectedFeature.value],
        },
      },
    });
  };

  const handleRemoveFeature = (featureValue: string) => {
    if (!doctor) return;

    removeFeatures({
      variables: {
        input: {
          doctor_id: doctor.doctor_id,
          featureValues: [featureValue],
        },
      },
    });
  };

  const handleClinicAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;

    assignDoctorToClinics({
      variables: {
        doctorId: doctor.doctor_id,
        clinicIds: selectedClinics.map((clinic) => clinic.value),
      },
    });
  };

  return (
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
            Configure Doctor
          </Typography>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {doctor && (
          <div className="space-y-4">
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-4"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {doctor.profile.personal.designation} {doctor.profile.personal.first_name} {doctor.profile.personal.last_name}
            </Typography>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('subscription')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'subscription'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Subscription
                </button>
                <button
                  onClick={() => setActiveTab('customFeatures')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'customFeatures'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Custom Features
                </button>
                <button
                  onClick={() => setActiveTab('appointmentLimit')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'appointmentLimit'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Appointment Limit
                </button>
                <button
                  onClick={() => setActiveTab('clinicAccess')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'clinicAccess'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Clinic Access
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'subscription' && (
              <div className="mt-6 space-y-6">
                {loadingSubscription ? (
                  <div className="flex justify-center py-4">
                    <Spinner
                      className="h-6 w-6"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  </div>
                ) : (
                  <>
                    {/* Current Status Display */}
                    {hasSubscription && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold mb-2"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Current Status: {subscription.status}
                        </Typography>
                        <div className="flex gap-2 flex-wrap">
                          {SUBSCRIPTION_STATUSES.map((status) => (
                            <Button
                              key={status.value}
                              size="sm"
                              variant={subscription.status === status.value ? "filled" : "outlined"}
                              color={subscription.status === status.value ? "blue" : "gray"}
                              onClick={() => handleStatusChange(status.value)}
                              disabled={updatingStatus || subscription.status === status.value}
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              {status.value}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Subscription Form */}
                    <form onSubmit={handleSubscriptionSubmit} className="space-y-4">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-3"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {hasSubscription ? 'Update Subscription' : 'Create Subscription'}
                      </Typography>

                      <div>
                        <label className="block mb-1 font-bold text-gray-900 text-sm">Status</label>
                        <select
                          value={subscriptionForm.status}
                          onChange={(e) => setSubscriptionForm({ ...subscriptionForm, status: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        >
                          {SUBSCRIPTION_STATUSES.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 font-bold text-gray-900 text-sm">Trial Start Date</label>
                          <Input
                            type="datetime-local"
                            value={subscriptionForm.trialStartDate}
                            onChange={(e) => setSubscriptionForm({ ...subscriptionForm, trialStartDate: e.target.value })}
                            crossOrigin={undefined}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-bold text-gray-900 text-sm">Trial End Date</label>
                          <Input
                            type="datetime-local"
                            value={subscriptionForm.trialEndDate}
                            onChange={(e) => setSubscriptionForm({ ...subscriptionForm, trialEndDate: e.target.value })}
                            crossOrigin={undefined}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-bold text-gray-900 text-sm">Subscription Start Date</label>
                          <Input
                            type="datetime-local"
                            value={subscriptionForm.startDate}
                            onChange={(e) => setSubscriptionForm({ ...subscriptionForm, startDate: e.target.value })}
                            crossOrigin={undefined}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-bold text-gray-900 text-sm">Subscription End Date</label>
                          <Input
                            type="datetime-local"
                            value={subscriptionForm.endDate}
                            onChange={(e) => setSubscriptionForm({ ...subscriptionForm, endDate: e.target.value })}
                            crossOrigin={undefined}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          disabled={creatingSubscription || updatingSubscription}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {creatingSubscription || updatingSubscription ? (
                            <Spinner
                              className="h-4 w-4"
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            />
                          ) : hasSubscription ? (
                            'Update Subscription'
                          ) : (
                            'Create Subscription'
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}

            {activeTab === 'appointmentLimit' && (
              <div className="mt-6 space-y-6">
                {/* Current Limit Display */}
                {loadingAppointmentLimit ? (
                  <div className="flex justify-center py-4">
                    <Spinner className="h-6 w-6" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex gap-8">
                    <div>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-medium uppercase tracking-wide text-xs mb-1"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Total Limit
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {currentLimit !== null ? currentLimit : '—'}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-medium uppercase tracking-wide text-xs mb-1"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Consumed
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {appointmentsUsed !== null ? appointmentsUsed : '—'}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-medium uppercase tracking-wide text-xs mb-1"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Remaining
                      </Typography>
                      <Typography
                        variant="h5"
                        color={
                          currentLimit !== null && appointmentsUsed !== null && currentLimit - appointmentsUsed <= 10
                            ? 'red'
                            : 'green'
                        }
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {currentLimit !== null && appointmentsUsed !== null
                          ? currentLimit - appointmentsUsed
                          : '—'}
                      </Typography>
                    </div>
                  </div>
                )}

                {/* Recharge (Top-up) */}
                <form onSubmit={handleRecharge} className="space-y-3">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Recharge (Top-up)
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Add to the existing limit.
                  </Typography>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="block mb-1 font-bold text-gray-900 text-sm">Amount to Add</label>
                      <input
                        type="number"
                        min="1"
                        value={rechargeAmount}
                        onChange={(e) => setRechargeAmount(e.target.value)}
                        placeholder="e.g. 50"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={recharging || !rechargeAmount}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {recharging ? (
                        <Spinner className="h-4 w-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                      ) : (
                        'Recharge'
                      )}
                    </Button>
                  </div>
                </form>

                <hr className="border-gray-200" />

                {/* Set Limit */}
                <form onSubmit={handleUpdateLimit} className="space-y-3">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Set Limit
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Override the appointment limit to a specific value.
                  </Typography>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="block mb-1 font-bold text-gray-900 text-sm">New Limit</label>
                      <input
                        type="number"
                        min="0"
                        value={newLimit}
                        onChange={(e) => setNewLimit(e.target.value)}
                        placeholder="e.g. 100"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={updatingLimit || !newLimit}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {updatingLimit ? (
                        <Spinner className="h-4 w-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                      ) : (
                        'Update'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'clinicAccess' && (
              <form onSubmit={handleClinicAccessSubmit} className="mt-6 space-y-6">
                {loadingClinics || loadingDoctorClinicAccess ? (
                  <div className="flex justify-center py-4">
                    <Spinner className="h-6 w-6" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold mb-1"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {selectedClinics.length} clinic{selectedClinics.length === 1 ? '' : 's'} selected
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Clinics are limited to the doctor's current business when that business can be identified.
                      </Typography>
                    </div>

                    <div>
                      <label className="block mb-1 font-bold text-gray-900 text-sm">Clinic Access</label>
                      {clinicOptions.length === 0 ? (
                        <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                          <Typography
                            variant="small"
                            color="gray"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            No clinics available for this doctor.
                          </Typography>
                        </div>
                      ) : (
                        <Select
                          value={selectedClinics}
                          onChange={(options) => setSelectedClinics([...(options || [])] as ClinicOption[])}
                          options={clinicOptions}
                          placeholder={`Select clinics (${clinicOptions.length} available)`}
                          isMulti={true}
                          isSearchable={true}
                          closeMenuOnSelect={false}
                          styles={{
                            control: (base: any) => ({
                              ...base,
                              borderRadius: 8,
                              backgroundColor: '#f9fafb',
                              minHeight: 42,
                              borderColor: '#d1d5db',
                              '&:hover': { borderColor: '#d1d5db' },
                            }),
                            menu: (base: any) => ({
                              ...base,
                              zIndex: 9999,
                            }),
                          }}
                        />
                      )}
                    </div>

                    {assignedClinics.length > 0 && (
                      <div>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="mb-3"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Current Access
                        </Typography>
                        <div className="space-y-2">
                          {assignedClinics.map((clinic) => (
                            <div
                              key={clinic.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                {clinic.name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                {clinic.business_id}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        disabled={savingClinicAccess || savingClinicAccessDisabled}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {savingClinicAccess ? (
                          <Spinner className="h-4 w-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                        ) : (
                          'Save Clinic Access'
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            )}

            {activeTab === 'customFeatures' && (
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
                    Add Custom Feature
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
                              ? 'No custom features available'
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
                              backgroundColor: '#f9fafb',
                              minHeight: 42,
                              borderColor: '#d1d5db',
                              '&:hover': { borderColor: '#d1d5db' },
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
                        'Add'
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
                    Assigned Custom Features
                  </Typography>
                  {loadingDoctorFeatures ? (
                    <div className="flex justify-center py-4">
                      <Spinner
                        className="h-6 w-6"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    </div>
                  ) : doctorFeatures.length === 0 ? (
                    <Typography
                      variant="small"
                      color="gray"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      No custom features assigned yet.
                    </Typography>
                  ) : (
                    <div className="space-y-2">
                      {doctorFeatures.map((feature, index) => (
                        <div
                          key={feature.id || `feature-${index}-${feature.value}`}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {feature.value}
                          </Typography>
                          <Button
                            size="sm"
                            variant="text"
                            color="red"
                            onClick={() => handleRemoveFeature(feature.value)}
                            disabled={removing}
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
                            ) : (
                              'Remove'
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default ConfigureDoctorModal;
