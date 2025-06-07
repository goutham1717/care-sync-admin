import React from 'react';
import {
  Drawer,
  Typography,
  Button,
  Input,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import { useMutation } from '@apollo/client';
import { CREATE_BUSINESS } from '@/graphql/mutation/business';
import { ADD_CLINIC } from '@/graphql/mutation/clinic';

interface AddClinicDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface ClinicFormData {
  name: string;
  about: string;
  email: string;
  city_name: string;
  openTime: string;
  closeTime: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    pin: string;
  };
  phone_number: Array<{ n: string; name: string }>;
  speciality: Array<{ name: string }>;
}

const AddClinicDrawer: React.FC<AddClinicDrawerProps> = ({ open, onClose }) => {
  const [businessName, setBusinessName] = React.useState('');
  const [createdBusinessId, setCreatedBusinessId] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<'business' | 'clinic'>('business');

  const [clinicFormData, setClinicFormData] = React.useState<ClinicFormData>({
    name: '',
    about: '',
    email: '',
    city_name: '',
    openTime: '',
    closeTime: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      pin: '',
    },
    phone_number: [{ n: '', name: 'Mobile' }],
    speciality: [{ name: 'Dental' }],
  });

  const [createBusiness, { loading: creatingBusiness }] = useMutation(CREATE_BUSINESS, {
    onCompleted: (data) => {
      setCreatedBusinessId(data.createBusiness.id);
      setStep('clinic');
    },
    onError: (error) => {
      console.error('Error creating business:', error);
    }
  });

  const [addClinic, { loading: creatingClinic }] = useMutation(ADD_CLINIC, {
    onCompleted: () => {
      handleClose();
      // You might want to refresh the clinic list here
    },
    onError: (error) => {
      console.error('Error creating clinic:', error);
    }
  });

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBusiness({
      variables: {
        businessInput: {
          name: businessName
        }
      }
    });
  };

  const handleClinicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createdBusinessId) return;

    addClinic({
      variables: {
        businessId: createdBusinessId,
        clinicInput: clinicFormData
      }
    });
  };

  const handleClose = () => {
    onClose();
    setStep('business');
    setBusinessName('');
    setCreatedBusinessId(null);
    setClinicFormData({
      name: '',
      about: '',
      email: '',
      city_name: '',
      openTime: '',
      closeTime: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        country: '',
        pin: '',
      },
      phone_number: [{ n: '', name: 'Mobile' }],
      speciality: [{ name: 'Dental' }],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setClinicFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setClinicFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePhoneChange = (value: string) => {
    setClinicFormData(prev => ({
      ...prev,
      phone_number: [{ n: value, name: 'Mobile' }]
    }));
  };

  return (
    <Drawer
      size={window.innerWidth}
      open={open}
      onClose={handleClose}
      className="p-4"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography
          variant="h5"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {step === 'business' ? 'Create Business' : 'Create Clinic'}
        </Typography>
        <Button
          variant="text"
          color="blue-gray"
          onClick={handleClose}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>

      {step === 'business' && (
        <form onSubmit={handleBusinessSubmit} className="max-w-md mx-auto mt-8">
          <div className="mb-4">
            <Input
              type="text"
              label="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              crossOrigin={undefined}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            disabled={creatingBusiness}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {creatingBusiness ? (
              <div className="flex items-center gap-2">
                <Spinner
                  className="h-4 w-4"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                Creating Business...
              </div>
            ) : (
              'Create Business'
            )}
          </Button>
        </form>
      )}

      {step === 'clinic' && (
        <form onSubmit={handleClinicSubmit} className="max-w-2xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                type="text"
                label="Clinic Name"
                value={clinicFormData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                crossOrigin={undefined}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>

            <div className="col-span-2">
              <Textarea
                label="About"
                value={clinicFormData.about}
                onChange={(e) => handleInputChange('about', e.target.value)}
                required
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>

            <Input
              type="email"
              label="Email"
              value={clinicFormData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              crossOrigin={undefined}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />

            <Input
              type="text"
              label="City"
              value={clinicFormData.city_name}
              onChange={(e) => handleInputChange('city_name', e.target.value)}
              required
              crossOrigin={undefined}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />

            <Input
              type="time"
              label="Opening Time"
              value={clinicFormData.openTime}
              onChange={(e) => handleInputChange('openTime', e.target.value)}
              required
              crossOrigin={undefined}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />

            <Input
              type="time"
              label="Closing Time"
              value={clinicFormData.closeTime}
              onChange={(e) => handleInputChange('closeTime', e.target.value)}
              required
              crossOrigin={undefined}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />

            <div className="col-span-2">
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Address
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Line 1"
                  value={clinicFormData.address.line1}
                  onChange={(e) => handleAddressChange('line1', e.target.value)}
                  required
                  crossOrigin={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Input
                  type="text"
                  label="Line 2"
                  value={clinicFormData.address.line2}
                  onChange={(e) => handleAddressChange('line2', e.target.value)}
                  crossOrigin={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Input
                  type="text"
                  label="City"
                  value={clinicFormData.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  required
                  crossOrigin={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Input
                  type="text"
                  label="State"
                  value={clinicFormData.address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  required
                  crossOrigin={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Input
                  type="text"
                  label="Country"
                  value={clinicFormData.address.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  required
                  crossOrigin={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Input
                  type="text"
                  label="PIN Code"
                  value={clinicFormData.address.pin}
                  onChange={(e) => handleAddressChange('pin', e.target.value)}
                  required
                  crossOrigin={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
            </div>

            <div className="col-span-2">
              <Input
                type="tel"
                label="Phone Number"
                value={clinicFormData.phone_number[0]?.n || ''}
                onChange={(e) => handlePhoneChange(e.target.value)}
                required
                crossOrigin={undefined}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              disabled={creatingClinic}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {creatingClinic ? (
                <div className="flex items-center gap-2">
                  <Spinner
                    className="h-4 w-4"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                  Creating Clinic...
                </div>
              ) : (
                'Create Clinic'
              )}
            </Button>
          </div>
        </form>
      )}
    </Drawer>
  );
};

export default AddClinicDrawer; 