'use client';

import { GET_CLINIC_DOCTORS } from "@/graphql/query/doctors";
import { useQuery, useMutation } from "@apollo/client";
import { Typography, Card, CardHeader, CardBody, Spinner, Button, Dialog, Option, Switch } from "@material-tailwind/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloclient";
import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import { ADD_DOCTOR_TO_CLINIC, UPDATE_PROFILE_PICTURE_URL } from "@/graphql/mutation/doctor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { gql } from "@apollo/client";

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

type Props = {
  params: {
    clinicId: string;
  };
};

const stepLabels = [
  {
    title: "Personal Information",
    subtitle: "About the Doctor",
  },
  {
    title: "Professional Information",
    subtitle: "About their Speciality",
  },
  {
    title: "Upload Image and Preview",
    subtitle: "Profile Picture",
  },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Tamil", label: "Tamil" },
  { value: "Hindi", label: "Hindi" },
  { value: "Telugu", label: "Telugu" },
  { value: "Kannada", label: "Kannada" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Bengali", label: "Bengali" },
  { value: "Marathi", label: "Marathi" },
  { value: "Gujarati", label: "Gujarati" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Odia", label: "Odia" },
  { value: "Urdu", label: "Urdu" },
  { value: "Assamese", label: "Assamese" },
  { value: "Maithili", label: "Maithili" },
  { value: "Santali", label: "Santali" },
];

const SPECIALISATIONS = [
  { value: "Cardiology", label: "Cardiology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Psychiatry", label: "Psychiatry" },
  { value: "Neurology", label: "Neurology" },
  { value: "Gastroenterology", label: "Gastroenterology" },
  { value: "Endocrinology", label: "Endocrinology" },
  { value: "Oncology", label: "Oncology" },
  { value: "Urology", label: "Urology" },
];

const TypeaheadMultiSelect = ({ options, label, handleChange, value }: any) => (
  <div>
    <Select
      id="typeahead"
      value={value}
      onChange={handleChange}
      options={options}
      isMulti
      styles={{
        control: (base: any) => ({
          ...base,
          borderRadius: 8,
          backgroundColor: '#f9fafb',
          minHeight: 42,
          borderColor: '#d1d5db',
          '&:hover': { borderColor: '#d1d5db' },
        }),
      }}
    />
  </div>
);

// Add Degree type
interface Degree {
  branch_name: string;
  college_name: string;
  name: string;
  start_year: string;
  end_year: string;
}

// Add FormValues type
interface FormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dob: string;
  language: string[];
  majorSpeciality: string;
  speciality: string[];
  about: string;
  degree: Degree[];
}

// Add mutation definition after the imports
const UPDATE_DOCTOR_ACTIVE_STATUS = gql`
  mutation UpdateDoctorActiveStatus($doctor_id: String!, $isActive: Boolean!) {
    updateDoctorActiveStatus(doctor_id: $doctor_id, isActive: $isActive)
  }
`;

const DoctorsList = ({ clinicId }: { clinicId: string }) => {
  const { data, loading, error, refetch } = useQuery(GET_CLINIC_DOCTORS, {
    variables: { clinicId },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [step, setStep] = useState(0);

  const { control, handleSubmit, setValue, getValues, watch } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      dob: "",
      language: [],
      majorSpeciality: "",
      speciality: [],
      about: "",
      degree: [],
    },
  });

  const degrees = watch('degree');
  const [degreeForm, setDegreeForm] = useState<Degree>({ branch_name: '', college_name: '', name: '', start_year: '', end_year: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const onNext = () => setStep((prev) => prev + 1);
  const onPrev = () => setStep((prev) => prev - 1);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [addDoctor] = useMutation(ADD_DOCTOR_TO_CLINIC);
  const [updateProfilePicUrl] = useMutation(UPDATE_PROFILE_PICTURE_URL);
  const [pictureBlob, setPictureBlob] = useState<File | null>(null);

  const [updateDoctorStatus] = useMutation(UPDATE_DOCTOR_ACTIVE_STATUS);

  function handleAddOrUpdateDegree() {
    const currentDegrees = getValues('degree') || [];
    if (editIndex !== null) {
      // Update
      const updated = [...currentDegrees];
      updated[editIndex] = degreeForm;
      setValue('degree', updated);
      setEditIndex(null);
    } else {
      // Add
      setValue('degree', [...currentDegrees, degreeForm]);
    }
    setDegreeForm({ branch_name: '', college_name: '', name: '', start_year: '', end_year: '' });
  }

  function handleEditDegree(idx: number) {
    setDegreeForm(degrees[idx]);
    setEditIndex(idx);
  }

  function handleRemoveDegree(idx: number) {
    const currentDegrees = getValues('degree') || [];
    setValue('degree', currentDegrees.filter((_: any, i: number) => i !== idx));
    if (editIndex === idx) {
      setDegreeForm({ branch_name: '', college_name: '', name: '', start_year: '', end_year: '' });
      setEditIndex(null);
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPictureBlob(file);
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleStatusToggle = async (doctorId: string, currentStatus: boolean) => {
    try {
      await updateDoctorStatus({
        variables: {
          doctor_id: doctorId,
          isActive: !currentStatus,
        },
      });
      // Refetch the doctors list to update the UI
      await refetch();
      toast.success("Doctor status updated successfully");
    } catch (error) {
      console.error("Error updating doctor status:", error);
      toast.error("Failed to update doctor status");
    }
  };

  async function onSave(formData: FormValues) {
    try {
      const s3 = new S3Client({
        region: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_REGION || '',
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_SECRET_KEY_ID || '',
        },
      });
      const doctorInput = {
        profile: {
          personal: {
            designation: "Dr",
            dob: formData.dob,
            email: formData.email,
            first_name: formData.firstName,
            gender: formData.gender.toUpperCase(),
            last_name: formData.lastName,
            phone_number: formData.phoneNumber,
          },
          professional: {
            about: formData.about,
            language: formData.language.map((name) => ({ name })),
            major_speciality: { name: formData.majorSpeciality },
            speciality: formData.speciality.map((name) => ({ name })),
            degree: formData.degree,
          },
        },
      };

      const response = await addDoctor({
        variables: {
          clinicIds: clinicId,
          doctorInput,
        },
      });

      // Handle profile picture upload if exists
      if (pictureBlob && response.data?.addDoctor?.doctor_id) {
        try {
          const fileName = response.data?.addDoctor?.doctor_id;
          const newFile = renameFile(pictureBlob, fileName);

          // Convert File to ArrayBuffer first
          const arrayBuffer = await newFile.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          const params = {
            Bucket: `${process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_BUCKET}`,
            Key: `clinic/${clinicId}/doctors/profile/picture/${newFile.name}`,
            Body: uint8Array,
            ContentType: newFile.type,
          };

          const command = new PutObjectCommand(params);
          await s3.send(command);

          const picture_url = `https://${process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_BUCKET}.s3.${process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_REGION}.amazonaws.com/clinic/${clinicId}/doctors/profile/picture/${fileName}`;

          const picUpdated = await updateProfilePicUrl({
            variables: {
              doctor_id: fileName,
              picture_url,
            },
          });

          console.log("PROFILE PIC UPDATED", picUpdated);
        } catch (error) {
          console.error("Error uploading profile picture:", error);
          toast.error("Failed to upload profile picture");
        }
      }

      toast.success("Doctor added successfully!");
      setOpen(false);
      //window.location.reload();
    } catch (err) {
      console.error("Error adding doctor:", err);
      toast.error("Failed to add doctor");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner
          className="h-12 w-12"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Typography
          color="red"
          variant="h6"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Error loading doctors: {error.message}
        </Typography>
      </div>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Card
        className="h-full w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex justify-between items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Doctors List
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              List of all doctors in this clinic
            </Typography>
          </div>
          <Button
            color="black"
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleOpen}
          >
            Add Doctor
          </Button>
        </CardHeader>
        <Dialog
          open={open}
          handler={handleOpen}
          size="lg"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="p-6 min-w-[700px] max-h-[80vh] overflow-y-auto">
            {/* Stepper UI */}
            <div className="flex items-center justify-center mb-8">
              {stepLabels.map((stepLabel, idx) => (
                <div key={stepLabel.title} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`rounded-full w-10 h-10 flex items-center justify-center border-2 text-lg font-bold transition-all duration-200 ${step === idx ? 'border-purple-500 text-purple-600 bg-white' : 'border-gray-300 text-gray-400 bg-white'}`}>{idx + 1}</div>
                    <div className={`mt-2 text-sm font-semibold ${step === idx ? 'text-purple-600' : 'text-gray-400'}`}>{stepLabel.title}</div>
                    <div className={`text-xs ${step === idx ? 'text-purple-400' : 'text-gray-300'}`}>{stepLabel.subtitle}</div>
                  </div>
                  {idx < stepLabels.length - 1 && (
                    <div className="w-16 h-1 bg-gray-200 mx-2" />
                  )}
                </div>
              ))}
            </div>
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={handleOpen}
              aria-label="Close"
            >
              ×
            </button>
            {/* Step 1 Form */}
            {step === 0 && (
              <form onSubmit={handleSubmit(onNext)}>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Enter First Name</label>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="First Name"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Enter Middle Name</label>
                    <Controller
                      name="middleName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="Middle Name"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Enter Last Name</label>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="Last Name"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Enter Phone Number</label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="Phone Number"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Select a Gender</label>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                          <option value="">Select Gender</option>
                          {genderOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Enter Email</label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="Email"
                          type="email"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Date of Birth</label>
                    <Controller
                      name="dob"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button
                    color="gray"
                    size="lg"
                    disabled
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Previous
                  </Button>
                  <Button
                    color="white"
                    size="lg"
                    type="submit"
                    className="border border-blue-900 text-blue-900 flex items-center gap-2"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Next
                    <span className="text-xl">→</span>
                  </Button>
                </div>
              </form>
            )}
            {step === 1 && (
              <form onSubmit={handleSubmit(onNext)}>
                <div className="flex flex-col gap-6 mb-8">
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Preferred Languages</label>
                    <Controller
                      control={control}
                      name="language"
                      rules={{ required: true }}
                      render={({ field: { onChange, value = [] } }) => {
                        const languageOptions =
                          Array.isArray(value) ? value.map((lang: string) => ({ value: lang, label: lang })) : [];
                        return (
                          <TypeaheadMultiSelect
                            options={LANGUAGES}
                            label="Select Languages"
                            handleChange={(selected: any) => {
                              const selectedLanguages = selected.map((item: any) => item.value);
                              onChange(selectedLanguages);
                            }}
                            value={languageOptions}
                          />
                        );
                      }}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Major Speciality</label>
                    <Controller
                      name="majorSpeciality"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="Major Speciality"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Other Specialities</label>
                    <Controller
                      control={control}
                      name="speciality"
                      rules={{ required: true }}
                      render={({ field: { onChange, value = [] } }) => {
                        const specialityOptions =
                          Array.isArray(value) ? value.map((spec: string) => ({ value: spec, label: spec })) : [];
                        return (
                          <TypeaheadMultiSelect
                            options={SPECIALISATIONS}
                            label="Select Specialities"
                            handleChange={(selected: any) => {
                              const selectedSpecialities = selected.map((item: any) => item.value);
                              onChange(selectedSpecialities);
                            }}
                            value={specialityOptions}
                          />
                        );
                      }}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">About</label>
                    <Controller
                      control={control}
                      name="about"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <div style={{ minHeight: "180px", marginBottom: "24px" }}>
                          <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={onChange}
                            style={{ height: "150px", boxSizing: "border-box", background: "#fff" }}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-gray-900">Degrees</label>
                    {/* List of degrees */}
                    {degrees && degrees.length > 0 && (
                      <ul className="mb-4">
                        {degrees.map((deg: Degree, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 mb-2">
                            <span className="flex-1">{deg.name} ({deg.branch_name}) - {deg.college_name} [{deg.start_year} to {deg.end_year}]</span>
                            <Button size="sm" color="blue" onClick={() => handleEditDegree(idx)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Edit</Button>
                            <Button size="sm" color="red" onClick={() => handleRemoveDegree(idx)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Delete</Button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* Degree form */}
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <input className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2" placeholder="Degree Name" value={degreeForm.name} onChange={e => setDegreeForm(f => ({ ...f, name: e.target.value }))} />
                      <input className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2" placeholder="Branch Name" value={degreeForm.branch_name} onChange={e => setDegreeForm(f => ({ ...f, branch_name: e.target.value }))} />
                      <input className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2" placeholder="College Name" value={degreeForm.college_name} onChange={e => setDegreeForm(f => ({ ...f, college_name: e.target.value }))} />
                      <input className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2" type="date" placeholder="Start Year" value={degreeForm.start_year} onChange={e => setDegreeForm(f => ({ ...f, start_year: e.target.value }))} />
                      <input className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2" type="date" placeholder="End Year" value={degreeForm.end_year} onChange={e => setDegreeForm(f => ({ ...f, end_year: e.target.value }))} />
                    </div>
                    <div className="flex gap-2 mb-4">
                      <Button size="sm" color="green" onClick={handleAddOrUpdateDegree} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{editIndex !== null ? 'Update Degree' : 'Add Degree'}</Button>
                      {editIndex !== null && (
                        <Button size="sm" color="gray" onClick={() => { setDegreeForm({ branch_name: '', college_name: '', name: '', start_year: '', end_year: '' }); setEditIndex(null); }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Cancel</Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button
                    color="white"
                    size="lg"
                    type="button"
                    className="border border-blue-900 text-blue-900"
                    onClick={onPrev}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Previous
                  </Button>
                  <Button
                    color="white"
                    size="lg"
                    type="submit"
                    className="border border-blue-900 text-blue-900 flex items-center gap-2"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Next
                    <span className="text-xl">→</span>
                  </Button>
                </div>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleSubmit(onSave)}>
                <div className="flex gap-8">
                  {/* Doctor Preview Card */}
                  <div className="bg-white rounded-xl shadow p-8 flex-1 flex flex-col items-center max-w-sm">
                    {croppedImageUrl ? (
                      <img src={croppedImageUrl} alt="Doctor" className="w-24 h-24 rounded-full object-cover mb-4" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <span className="text-gray-400 text-4xl">👤</span>
                      </div>
                    )}
                    <div className="text-xl font-bold text-center mb-1">
                      Dr. {control._formValues.firstName} {control._formValues.lastName}
                    </div>
                    <div className="text-gray-500 text-center mb-2">
                      {control._formValues.majorSpeciality}
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                      <span className="font-bold">Other specialities:</span><br />
                      {Array.isArray(control._formValues.speciality) ? control._formValues.speciality.join(' ') : ''}
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="font-bold">About:</span><br />
                      <span dangerouslySetInnerHTML={{ __html: control._formValues.about }} />
                    </div>
                  </div>
                  {/* Image Upload and Crop */}
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 min-h-[300px]">
                    {!uploadedImage ? (
                      <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-1m6 2a1 1 0 001-1v-1m-6 2a1 1 0 01-1-1v-1m0 0V4m0 0H5a1 1 0 00-1 1v12a1 1 0 001 1h2m0 0v1a1 1 0 001 1h4a1 1 0 001-1v-1"></path></svg>
                          <span className="font-bold text-gray-600">Click to upload or drag and drop</span>
                          <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (MAX. 800×400px)</span>
                        </div>
                      </label>
                    ) : (
                      <>
                        <ReactCrop
                          crop={crop}
                          onChange={c => setCrop(c)}
                          onComplete={c => setCompletedCrop(c)}
                          aspect={1}
                        >
                          <img
                            ref={imgRef}
                            src={uploadedImage}
                            alt="Crop me"
                            style={{ maxHeight: 200 }}
                            onLoad={e => {
                              const { width, height } = e.currentTarget;
                              setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 90 }, 1, width, height), width, height));
                            }}
                          />
                        </ReactCrop>
                        <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
                        <Button
                          color="gray"
                          size="sm"
                          className="mt-4"
                          onClick={() => {
                            setUploadedImage(null);
                            setCroppedImageUrl(null);
                          }}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    color="white"
                    size="lg"
                    type="button"
                    className="border border-blue-900 text-blue-900"
                    onClick={onPrev}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Previous
                  </Button>
                  <Button
                    color="blue"
                    size="lg"
                    type="submit"
                    className="flex items-center gap-2"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <span className="text-xl">✔</span> Save
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Dialog>
        <CardBody
          className="overflow-scroll px-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {["Name", "Speciality", "Languages", "Contact", "Status"].map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.getClinicDoctors.map((doctor: Doctor, index: number) => (
                <tr key={doctor.doctor_id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {doctor.profile.personal.designation} {doctor.profile.personal.first_name} {doctor.profile.personal.last_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {doctor.profile.professional.major_speciality.name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {doctor.profile.professional.language.map((lang: { name: string }) => lang.name).join(", ")}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {doctor.profile.personal.phone_number}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={doctor.isActive}
                        onChange={() => handleStatusToggle(doctor.doctor_id, doctor.isActive)}
                        color="green"
                        ripple={false}
                        className="h-full w-full checked:bg-green-500"
                        crossOrigin={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <Typography
                        variant="small"
                        color={doctor.isActive ? "green" : "red"}
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {doctor.profile.professional.active ? "Active" : "Inactive"}
                      </Typography>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <ToastContainer />
      </Card>
    </ApolloProvider>
  );
};

const ClinicDoctorsPage = ({ params }: Props) => {
  return (
    <ApolloProvider client={client}>
      <DoctorsList clinicId={params.clinicId} />
    </ApolloProvider>
  );
};

// Helpers for cropping
function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2d context');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const rotateRads = rotate * Math.PI / 180;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;
  ctx.save();
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );
  ctx.restore();
}

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: React.DependencyList,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn();
    }, waitTime);
    return () => {
      clearTimeout(t);
    };
  }, deps);
}

// Add helper function for renaming file
function renameFile(file: File, newName: string): File {
  const extension = file.name.split('.').pop();
  return new File([file], `${newName}.${extension}`, { type: file.type });
}

export default ClinicDoctorsPage; 