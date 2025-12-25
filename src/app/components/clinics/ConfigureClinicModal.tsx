import { GetClinicsQuery } from '@/gql/graphql';
import {
  Dialog,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_CLINIC_FEATURES, GET_CLINIC_FEATURES } from '@/graphql/query/clinicFeatures';
import { ASSIGN_CLINIC_FEATURES, REMOVE_CLINIC_FEATURES } from '@/graphql/mutation/clinicFeatures';
import React, { useState } from 'react';
import Select from 'react-select';

type Props = {
  clinic: GetClinicsQuery['getClinics'][0] | null;
  open: boolean;
  onClose: () => void;
}

type ClinicFeature = {
  id: string | null;
  value: string;
}

const ConfigureClinicModal = ({ clinic, open, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<'addons'>('addons');
  const [selectedFeature, setSelectedFeature] = useState<{ value: string; label: string } | null>(null);

  // Fetch all available clinic features
  const { data: allFeaturesData, loading: loadingAllFeatures } = useQuery(GET_ALL_CLINIC_FEATURES, {
    skip: !open || !clinic,
  });

  // Fetch clinic's assigned features
  const { data: clinicFeaturesData, loading: loadingClinicFeatures, refetch: refetchClinicFeatures } = useQuery(
    GET_CLINIC_FEATURES,
    {
      variables: { clinicId: clinic?.id || '' },
      skip: !open || !clinic,
    }
  );

  const [assignFeatures, { loading: assigning }] = useMutation(ASSIGN_CLINIC_FEATURES, {
    onCompleted: () => {
      refetchClinicFeatures();
      setSelectedFeature(null);
    },
    onError: (error) => {
      console.error('Error assigning features:', error);
    },
  });

  const [removeFeatures, { loading: removing }] = useMutation(REMOVE_CLINIC_FEATURES, {
    onCompleted: () => {
      refetchClinicFeatures();
    },
    onError: (error) => {
      console.error('Error removing features:', error);
    },
  });

  const allFeatures: ClinicFeature[] = allFeaturesData?.getAllClinicFeatures || [];
  const clinicFeatures: ClinicFeature[] = clinicFeaturesData?.getClinicFeatures || [];

  // Debug logging
  React.useEffect(() => {
    if (allFeaturesData) {
      console.log('All features data:', allFeaturesData);
      console.log('All features array:', allFeatures);
    }
    if (clinicFeaturesData) {
      console.log('Clinic features data:', clinicFeaturesData);
      console.log('Clinic features array:', clinicFeatures);
    }
  }, [allFeaturesData, clinicFeaturesData, allFeatures, clinicFeatures]);

  // Get available features (not already assigned)
  const availableFeatures = allFeatures.filter(
    (feature) => !clinicFeatures.some((cf) => cf.value === feature.value)
  );

  // Convert to options for react-select
  const featureOptions = availableFeatures.map((feature) => ({
    value: feature.value,
    label: feature.value,
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

    removeFeatures({
      variables: {
        input: {
          clinicId: clinic.id,
          featureValues: [featureValue],
        },
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
                  onClick={() => setActiveTab('addons')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'addons'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  Add Ons
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'addons' && (
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
                              ? 'No features available'
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

export default ConfigureClinicModal;

