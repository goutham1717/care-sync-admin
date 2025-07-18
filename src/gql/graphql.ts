/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  pin: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type AddressDto = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  line1: Scalars['String']['input'];
  line2?: InputMaybe<Scalars['String']['input']>;
  pin: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type AgeGroupStats = {
  __typename?: 'AgeGroupStats';
  count: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
};

export type AppointmentCount = {
  __typename?: 'AppointmentCount';
  appointmentcount: Scalars['Float']['output'];
  day: Scalars['DateTime']['output'];
};

export type AppointmentDetails = {
  __typename?: 'AppointmentDetails';
  Prescription?: Maybe<PrescriptionDetails>;
  aid: Scalars['String']['output'];
  channel: Scalars['String']['output'];
  end_time: Scalars['String']['output'];
  patientProfile: PatientProfile;
  paymentDetails?: Maybe<PaymentDetails>;
  reference_id?: Maybe<Scalars['String']['output']>;
  service_type: Scalars['String']['output'];
  start_time: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type AppointmentDetailsDto = {
  age?: InputMaybe<Scalars['String']['input']>;
  aid?: InputMaybe<Scalars['String']['input']>;
  channel: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  dob?: InputMaybe<Scalars['String']['input']>;
  doctor_id: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Float']['input']>;
  patientProfileId: Scalars['String']['input'];
  service_type: Scalars['String']['input'];
  start_Time?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type AppointmentStats = {
  __typename?: 'AppointmentStats';
  appointments: Scalars['Float']['output'];
  percentageChange: Scalars['Float']['output'];
};

export type Business = {
  __typename?: 'Business';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type BusinessDto = {
  name: Scalars['String']['input'];
};

export type Cpg = {
  __typename?: 'CPG';
  barCode: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  healthScore: Scalars['String']['output'];
  imageURL: Scalars['String']['output'];
  ingrediants: Scalars['String']['output'];
  nutritionalFacts: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  size: Scalars['String']['output'];
  suggestion?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CpgEdge = {
  __typename?: 'CPGEdge';
  cursor: Scalars['String']['output'];
  node: Cpg;
};

export type ChannelCount = {
  __typename?: 'ChannelCount';
  appointmentcount: Scalars['Float']['output'];
  channel: Scalars['String']['output'];
};

export type ChannelStats = {
  __typename?: 'ChannelStats';
  channel: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Clinic = {
  __typename?: 'Clinic';
  about: Scalars['String']['output'];
  address: Address;
  business_id: Scalars['String']['output'];
  city_name: Scalars['String']['output'];
  closeTime: Scalars['String']['output'];
  doctors?: Maybe<Array<Doctor>>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  location: Array<Scalars['String']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  openTime: Scalars['String']['output'];
  phone_number: Array<PhoneNumber>;
  speciality?: Maybe<Array<Speciality>>;
  workingDays: Array<Scalars['Boolean']['output']>;
};

export type ClinicCoordinatesDto = {
  clinicId: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type ClinicDto = {
  about: Scalars['String']['input'];
  address: AddressDto;
  city_name: Scalars['String']['input'];
  closeTime?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  location?: InputMaybe<Array<Scalars['String']['input']>>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  openTime?: InputMaybe<Scalars['String']['input']>;
  phone_number: Array<PhoneNumberDto>;
  speciality: Array<SpecailityDto>;
  workingDays?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type ClinicDetailDto = {
  addressValue?: InputMaybe<AddressDto>;
  clinicId: Scalars['String']['input'];
  field: Scalars['String']['input'];
  phoneValue?: InputMaybe<Array<PhoneNumberDto>>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};

export type ClinicPatient = {
  __typename?: 'ClinicPatient';
  id: Scalars['String']['output'];
  profiles: PatientProfileLastVisited;
};

export type ClinicPatientBasicInfo = {
  __typename?: 'ClinicPatientBasicInfo';
  first_name: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  mobile: Scalars['String']['output'];
};

export type ClinicPatientsResponse = {
  __typename?: 'ClinicPatientsResponse';
  patients: Array<ClinicPatientBasicInfo>;
};

export type ClinicWorkingHoursDto = {
  closeTime: Scalars['String']['input'];
  openTime: Scalars['String']['input'];
  workingDays: Array<Scalars['Boolean']['input']>;
};

export type CpgDto = {
  barCode: Scalars['String']['input'];
  imageURL: Scalars['String']['input'];
  ingrediants: Scalars['String']['input'];
  nutritionalFacts: Scalars['String']['input'];
  productName: Scalars['String']['input'];
  size: Scalars['String']['input'];
};

export type CreditsUpdateDto = {
  call?: InputMaybe<Scalars['Float']['input']>;
  clinicId: Scalars['String']['input'];
  sms?: InputMaybe<Scalars['Float']['input']>;
  videoCall?: InputMaybe<Scalars['Float']['input']>;
  whatsapp?: InputMaybe<Scalars['Float']['input']>;
};

export type Degree = {
  __typename?: 'Degree';
  branch_name: Scalars['String']['output'];
  college_name: Scalars['String']['output'];
  end_year: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  start_year: Scalars['DateTime']['output'];
};

export type DegreeDto = {
  branch_name: Scalars['String']['input'];
  college_name: Scalars['String']['input'];
  end_year: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  start_year: Scalars['DateTime']['input'];
};

export type Diagnosis = {
  name: Scalars['String']['input'];
  properties?: InputMaybe<Scalars['JSON']['input']>;
};

export type DiagnosisList = {
  __typename?: 'DiagnosisList';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Doctor = {
  __typename?: 'Doctor';
  createdAt: Scalars['DateTime']['output'];
  doctor_id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  profile: Profile;
  updatedAt: Scalars['DateTime']['output'];
};

export type DoctorDto = {
  profile: ProfileDto;
};

export type Draft = {
  __typename?: 'Draft';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DraftModel = {
  __typename?: 'DraftModel';
  clinicName: Scalars['String']['output'];
  doctorName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DraftsDto = {
  clinic_id: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type DrugList = {
  __typename?: 'DrugList';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type GenderGroup = {
  __typename?: 'GenderGroup';
  age_0_17: AgeGroupStats;
  age_18_24: AgeGroupStats;
  age_25_34: AgeGroupStats;
  age_35_44: AgeGroupStats;
  age_45_64: AgeGroupStats;
  age_65_plus: AgeGroupStats;
};

export type GraphData = {
  __typename?: 'GraphData';
  timestamp: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type GroupedPatients = {
  __typename?: 'GroupedPatients';
  FEMALE: GenderGroup;
  MALE: GenderGroup;
};

export type Language = {
  __typename?: 'Language';
  name: Scalars['String']['output'];
};

export type LanguageDto = {
  name: Scalars['String']['input'];
};

export type LastVisited = {
  __typename?: 'LastVisited';
  visit_checkin: Scalars['String']['output'];
};

export type MajorSpecaility = {
  __typename?: 'MajorSpecaility';
  name: Scalars['String']['output'];
};

export type MajorSpecailityDto = {
  name: Scalars['String']['input'];
};

export type Medication = {
  __typename?: 'Medication';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  from: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  prescriptionURL?: Maybe<Scalars['String']['output']>;
  schedule: Array<Schedule>;
  to: Scalars['DateTime']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type MedicationDto = {
  comment?: Scalars['String']['input'];
  from: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  prescriptionURL?: Scalars['String']['input'];
  schedule: Array<ScheduleDto>;
  to: Scalars['DateTime']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MedicationStatus = {
  __typename?: 'MedicationStatus';
  id: Scalars['String']['output'];
  medicationId: Scalars['String']['output'];
  scheduleId: Scalars['String']['output'];
  taken: Scalars['String']['output'];
  time: Scalars['DateTime']['output'];
};

export type MedicationStatusDto = {
  medicationId: Scalars['String']['input'];
  scheduleId: Scalars['String']['input'];
  taken: Scalars['String']['input'];
  time: Scalars['DateTime']['input'];
};

export type MedicationViaPhoneDto = {
  clinicId: Scalars['String']['input'];
  comment?: Scalars['String']['input'];
  from: Scalars['DateTime']['input'];
  mobile: Scalars['String']['input'];
  name: Scalars['String']['input'];
  prescriptionURL?: Scalars['String']['input'];
  schedule: Array<ScheduleDto>;
  to: Scalars['DateTime']['input'];
  type: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DoctorLoginOTPRequest: OtpStatus;
  addBusinessHours: Clinic;
  addClinic: Clinic;
  addCpgDetails: Cpg;
  addDoctor: Doctor;
  addMedication: Medication;
  addMedicationViaPhoneNumber: Medication;
  addPatient: Patient;
  bookAppointment: AppointmentDetails;
  bookAppointmentOnline: AppointmentDetails;
  createBusiness: Business;
  createDraft: Draft;
  createOrder: Scalars['String']['output'];
  createService: ServicesModel;
  createTemplate: Template;
  deleteDoctor: Scalars['Boolean']['output'];
  deleteSchedule: Scalars['Float']['output'];
  editMedication: Medication;
  getAppointmentGraph: Array<GraphData>;
  getAppointmentStats: AppointmentStats;
  getProductMetrics: Cpg;
  getRevenue: RevenueStats;
  logout: Scalars['String']['output'];
  onboarding: RegisterResponse;
  refreshToken: Scalars['String']['output'];
  register: RegisterResponse;
  registerViaOTP: RegisterResponse;
  savePrescription: Prescription;
  sendMessage: Scalars['String']['output'];
  sendOTP: OtpStatus;
  sendVideoLink: Scalars['String']['output'];
  updateAppointmentStatus: AppointmentDetails;
  updateClinicCoordinates: Clinic;
  updateClinicDetail: Clinic;
  updateCredits: UpdatedCount;
  updateDoctor: Doctor;
  updateDoctorActiveStatus: Scalars['Boolean']['output'];
  updateMedicationStatus: MedicationStatus;
  updateNotifications: Notifications;
  updatePaymentDetails: Scalars['String']['output'];
  updateProfilePicUrl: Doctor;
  updateService: ServicesModel;
  updateVideoDuration: Scalars['String']['output'];
  validateDoctorOTP: Doctor;
};


export type MutationDoctorLoginOtpRequestArgs = {
  phoneInput: PhoneNumberDto;
};


export type MutationAddBusinessHoursArgs = {
  businessHoursInput: ClinicWorkingHoursDto;
  clinicId: Scalars['String']['input'];
};


export type MutationAddClinicArgs = {
  businessId: Scalars['String']['input'];
  clinicInput: ClinicDto;
};


export type MutationAddCpgDetailsArgs = {
  cpgInput: CpgDto;
};


export type MutationAddDoctorArgs = {
  clinicIds: Scalars['String']['input'];
  doctorInput: DoctorDto;
};


export type MutationAddMedicationArgs = {
  medicationInput: MedicationDto;
};


export type MutationAddMedicationViaPhoneNumberArgs = {
  medicationInputViaPhone: MedicationViaPhoneDto;
};


export type MutationAddPatientArgs = {
  businessId: Scalars['String']['input'];
  patientInput: PatientDto;
};


export type MutationBookAppointmentArgs = {
  appointmentInput: AppointmentDetailsDto;
};


export type MutationBookAppointmentOnlineArgs = {
  appointmentInput: OnlineAppointmentDetailsDto;
};


export type MutationCreateBusinessArgs = {
  businessInput: BusinessDto;
};


export type MutationCreateDraftArgs = {
  draftInput: DraftsDto;
};


export type MutationCreateOrderArgs = {
  paymentInput: PaymentOrderDto;
};


export type MutationCreateServiceArgs = {
  clinicId: Scalars['String']['input'];
  serviceInput: ServicesDto;
};


export type MutationCreateTemplateArgs = {
  templateInput: TemplateDto;
};


export type MutationDeleteDoctorArgs = {
  doctor_id: Scalars['String']['input'];
};


export type MutationDeleteScheduleArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEditMedicationArgs = {
  id: Scalars['String']['input'];
  medicationInput: MedicationDto;
};


export type MutationGetAppointmentGraphArgs = {
  satsGraphDto: StatsGraphDto;
};


export type MutationGetAppointmentStatsArgs = {
  statsDTO: StatsDto;
};


export type MutationGetProductMetricsArgs = {
  barCode: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationGetRevenueArgs = {
  statsDTO: StatsDto;
};


export type MutationOnboardingArgs = {
  onboardingInput: OnBoaringDto;
};


export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};


export type MutationRegisterViaOtpArgs = {
  otpRegistrationInput: OtpRegistrationDto;
};


export type MutationSavePrescriptionArgs = {
  prescriptionInput: PrescriptionDto;
};


export type MutationSendMessageArgs = {
  clinicId: Scalars['String']['input'];
  prescriptionURL: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSendOtpArgs = {
  phoneInput: PhoneNumberDto;
};


export type MutationSendVideoLinkArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationUpdateAppointmentStatusArgs = {
  aid: Scalars['String']['input'];
  status: StatusEnum;
};


export type MutationUpdateClinicCoordinatesArgs = {
  clinicCoordinatesInput: ClinicCoordinatesDto;
};


export type MutationUpdateClinicDetailArgs = {
  clinicDetailsInput: ClinicDetailDto;
};


export type MutationUpdateCreditsArgs = {
  updateCreditsPayload: CreditsUpdateDto;
};


export type MutationUpdateDoctorArgs = {
  doctorInput: DoctorDto;
  id: Scalars['String']['input'];
};


export type MutationUpdateDoctorActiveStatusArgs = {
  doctor_id: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
};


export type MutationUpdateMedicationStatusArgs = {
  medicationStatusInput: MedicationStatusDto;
};


export type MutationUpdateNotificationsArgs = {
  channel: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
  notification_id: Scalars['String']['input'];
};


export type MutationUpdatePaymentDetailsArgs = {
  paymentInput: PaymentDto;
};


export type MutationUpdateProfilePicUrlArgs = {
  doctor_id: Scalars['String']['input'];
  picture_url: Scalars['String']['input'];
};


export type MutationUpdateServiceArgs = {
  serviceId: Scalars['String']['input'];
  serviceInput: ServicesDto;
};


export type MutationUpdateVideoDurationArgs = {
  aid: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  mins: Scalars['Float']['input'];
};


export type MutationValidateDoctorOtpArgs = {
  otpInput: ValidateDoctorOtp;
};

export type NotificationCredits = {
  __typename?: 'NotificationCredits';
  call: Scalars['String']['output'];
  id: Scalars['String']['output'];
  sms: Scalars['String']['output'];
  video: Scalars['String']['output'];
  whatsapp: Scalars['String']['output'];
};

export type Notifications = {
  __typename?: 'Notifications';
  call: Scalars['Boolean']['output'];
  event: Scalars['String']['output'];
  id: Scalars['String']['output'];
  sms: Scalars['Boolean']['output'];
  whatsapp: Scalars['Boolean']['output'];
};

export type OtpRegistrationDto = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};

export type OtpStatus = {
  __typename?: 'OTPStatus';
  success: Scalars['Boolean']['output'];
};

export type OnBoaringDto = {
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type OnlineAppointmentDetailsDto = {
  age?: InputMaybe<Scalars['String']['input']>;
  aid?: InputMaybe<Scalars['String']['input']>;
  business_id: Scalars['String']['input'];
  channel: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  designation: Scalars['String']['input'];
  dob?: InputMaybe<Scalars['String']['input']>;
  doctor_id: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Float']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  service_type: Scalars['String']['input'];
  start_Time?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type PaginatedCpg = {
  __typename?: 'PaginatedCPG';
  edges?: Maybe<Array<CpgEdge>>;
  hasNextPage: Scalars['Boolean']['output'];
  nodes?: Maybe<Array<Cpg>>;
  totalCount: Scalars['Int']['output'];
};

export type PaginatedPatients = {
  __typename?: 'PaginatedPatients';
  patients: Array<PatientsWithAppointment>;
  totalCount: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Patient = {
  __typename?: 'Patient';
  id: Scalars['String']['output'];
  profiles: PatientProfile;
};

export type PatientDto = {
  profile: PatientProfileDto;
};

export type PatientProfile = {
  __typename?: 'PatientProfile';
  address?: Maybe<Address>;
  age?: Maybe<Scalars['String']['output']>;
  designation: Scalars['String']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  metaData?: Maybe<Scalars['JSON']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  mobile: Scalars['String']['output'];
};

export type PatientProfileDto = {
  address?: InputMaybe<AddressDto>;
  age?: InputMaybe<Scalars['String']['input']>;
  designation: Scalars['String']['input'];
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
};

export type PatientProfileLastVisited = {
  __typename?: 'PatientProfileLastVisited';
  address?: Maybe<Address>;
  age?: Maybe<Scalars['String']['output']>;
  designation: Scalars['String']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastVisited?: Maybe<Array<LastVisited>>;
  last_name?: Maybe<Scalars['String']['output']>;
  metaData?: Maybe<Scalars['JSON']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  mobile: Scalars['String']['output'];
};

export type PatientStatsResponse = {
  __typename?: 'PatientStatsResponse';
  groupedPatients: GroupedPatients;
  totalPatients: Scalars['Int']['output'];
};

export type PatientsWithAppointment = {
  __typename?: 'PatientsWithAppointment';
  AppointmentDetails?: Maybe<Array<AppointmentDetails>>;
  address?: Maybe<Address>;
  age?: Maybe<Scalars['String']['output']>;
  designation: Scalars['String']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  metaData?: Maybe<Scalars['JSON']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  mobile: Scalars['String']['output'];
};

export type PaymentCount = {
  __typename?: 'PaymentCount';
  day: Scalars['DateTime']['output'];
  totalPaymentAmount: Scalars['Float']['output'];
};

export type PaymentDetails = {
  __typename?: 'PaymentDetails';
  amount: Scalars['Float']['output'];
  billURL?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  payment_status: Scalars['String']['output'];
  payment_type: Scalars['String']['output'];
  pid: Scalars['String']['output'];
  services?: Maybe<Array<Scalars['String']['output']>>;
};

export type PaymentDto = {
  aid: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  billURL?: InputMaybe<Scalars['String']['input']>;
  discount: Scalars['Float']['input'];
  payment_status: Scalars['String']['input'];
  payment_type: Scalars['String']['input'];
  services: Array<Scalars['String']['input']>;
};

export type PaymentOrderDto = {
  amount: Scalars['Float']['input'];
};

export type Personal = {
  __typename?: 'Personal';
  designation: Scalars['String']['output'];
  dob: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  middle_name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  profile_pic?: Maybe<Scalars['String']['output']>;
};

export type PersonalDto = {
  designation: Scalars['String']['input'];
  dob: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  middle_name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  profile_pic?: InputMaybe<Scalars['String']['input']>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  n: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PhoneNumberDto = {
  n: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PhoneNumberDto = {
  phoneNumber: Scalars['String']['input'];
};

export type Prescription = {
  __typename?: 'Prescription';
  rx_id: Scalars['String']['output'];
};

export type PrescriptionDto = {
  aid: Scalars['String']['input'];
  clinicId: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
  followUp?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  patientProfileId: Scalars['String']['input'];
  privateNotes?: InputMaybe<Scalars['String']['input']>;
  rx_entries: Rx_Entries;
  rx_url?: InputMaybe<Scalars['String']['input']>;
  visit_name?: InputMaybe<Scalars['String']['input']>;
};

export type PrescriptionDetails = {
  __typename?: 'PrescriptionDetails';
  followUp?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  privateNotes?: Maybe<Scalars['String']['output']>;
  rx_entities: Scalars['JSON']['output'];
  rx_id: Scalars['String']['output'];
  rx_url?: Maybe<Scalars['String']['output']>;
};

export type PrescriptionMedication = {
  dose?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  frequency: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timing: Scalars['String']['input'];
};

export type Professional = {
  __typename?: 'Professional';
  about?: Maybe<Scalars['String']['output']>;
  active: Scalars['Boolean']['output'];
  clinic?: Maybe<Array<Clinic>>;
  degree?: Maybe<Array<Degree>>;
  language: Array<Language>;
  major_speciality: MajorSpecaility;
  speciality: Array<Speciality>;
};

export type ProfessionalDto = {
  about: Scalars['String']['input'];
  active?: Scalars['Boolean']['input'];
  degree?: InputMaybe<Array<DegreeDto>>;
  language: Array<LanguageDto>;
  major_speciality: MajorSpecailityDto;
  medicalLicenseNumber?: InputMaybe<Scalars['String']['input']>;
  speciality: Array<SpecailityDto>;
};

export type Profile = {
  __typename?: 'Profile';
  personal: Personal;
  professional: Professional;
};

export type ProfileDto = {
  personal: PersonalDto;
  professional: ProfessionalDto;
};

export type Query = {
  __typename?: 'Query';
  approveAppointment: Scalars['String']['output'];
  approveOrReject: Scalars['String']['output'];
  canDoVideoCall: Scalars['Boolean']['output'];
  cancelAppointment: Scalars['String']['output'];
  createRazorPayOrder: RazorPayOrder;
  deleteService: Scalars['String']['output'];
  deleteTemplate: Array<Scalars['String']['output']>;
  getAClinic: Clinic;
  getAllClinicTemplates: Array<Template>;
  getAllDrafts: Array<DraftModel>;
  getAllMedication: Array<Medication>;
  getAllPatientProfiles: Array<PatientProfile>;
  getAllPatientsByStatus: Array<AppointmentDetails>;
  getAllTomorrowPatients: Array<AppointmentDetails>;
  getAppointmentChannelStats: Array<ChannelStats>;
  getAppointmentCount: Array<AppointmentCount>;
  getAppointmentStatus: AppointmentDetails;
  getAppointments: Array<AppointmentDetails>;
  getBusinessClinics: Array<Clinic>;
  getChannelCount: Array<ChannelCount>;
  getClinicDoctors: Array<Doctor>;
  getClinicNotification: Array<Notifications>;
  getClinicPatients: Array<ClinicPatient>;
  getClinicPatientsBasicInfo: ClinicPatientsResponse;
  getClinics: Array<Clinic>;
  getDiagnosisList: Array<DiagnosisList>;
  getDoctor: Doctor;
  getDoctors: Array<Doctor>;
  getDrugList: Array<DrugList>;
  getMedicationRange: Array<Medication>;
  getNearestDoctors: Array<Doctor>;
  getNotificationCredits: NotificationCredits;
  getOnGoing: Array<Medication>;
  getPatientHistory: Array<AppointmentDetails>;
  getPatientsByAgeAndGender: PatientStatsResponse;
  getPatientsCount: Scalars['Float']['output'];
  getPatientsPaginated: PaginatedPatients;
  getPaymentAnalytics: Array<PaymentCount>;
  getProduct: Cpg;
  getProducts: PaginatedCpg;
  getRooms: Scalars['String']['output'];
  getServices: Array<ServicesModel>;
  getSlots: Array<Scalars['String']['output']>;
  getStats: Stats;
  getSymptomsList: Array<SymptomsList>;
  getUserByPhoneNumber: User;
  getUsers: Array<User>;
  getWeeklyRevenue: Array<GraphData>;
  todayMedication: Array<Medication>;
};


export type QueryApproveAppointmentArgs = {
  aid: Scalars['String']['input'];
};


export type QueryApproveOrRejectArgs = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type QueryCanDoVideoCallArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryCancelAppointmentArgs = {
  aid: Scalars['String']['input'];
};


export type QueryCreateRazorPayOrderArgs = {
  amount: Scalars['Float']['input'];
};


export type QueryDeleteServiceArgs = {
  serviceId: Scalars['String']['input'];
};


export type QueryDeleteTemplateArgs = {
  templateId: Scalars['String']['input'];
};


export type QueryGetAllClinicTemplatesArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetAllPatientProfilesArgs = {
  businessId: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type QueryGetAllPatientsByStatusArgs = {
  clinic_id: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
  status: StatusEnum;
};


export type QueryGetAllTomorrowPatientsArgs = {
  clinic_id: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
};


export type QueryGetAppointmentChannelStatsArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetAppointmentCountArgs = {
  channel: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  duration: Scalars['String']['input'];
};


export type QueryGetAppointmentStatusArgs = {
  mobile: Scalars['String']['input'];
  reference_id: Scalars['String']['input'];
};


export type QueryGetAppointmentsArgs = {
  clinic_id: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type QueryGetBusinessClinicsArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetChannelCountArgs = {
  clinic_id: Scalars['String']['input'];
  duration: Scalars['String']['input'];
};


export type QueryGetClinicDoctorsArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetClinicNotificationArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetClinicPatientsArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetClinicPatientsBasicInfoArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetDiagnosisListArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetDoctorArgs = {
  doctor_id: Scalars['String']['input'];
};


export type QueryGetDrugListArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetMedicationRangeArgs = {
  currentDate: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryGetNearestDoctorsArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type QueryGetNotificationCreditsArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetOnGoingArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetPatientHistoryArgs = {
  includePayment?: InputMaybe<Scalars['Boolean']['input']>;
  patientProfileId: Scalars['String']['input'];
};


export type QueryGetPatientsByAgeAndGenderArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetPatientsCountArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetPatientsPaginatedArgs = {
  clinic_id: Scalars['String']['input'];
  doctor_id?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
};


export type QueryGetPaymentAnalyticsArgs = {
  clinic_id: Scalars['String']['input'];
  duration: Scalars['String']['input'];
};


export type QueryGetProductArgs = {
  barcode: Scalars['String']['input'];
};


export type QueryGetProductsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetServicesArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetSlotsArgs = {
  slotsDto: SlotsDto;
};


export type QueryGetStatsArgs = {
  clinic_id: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type QueryGetSymptomsListArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetUserByPhoneNumberArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type QueryGetWeeklyRevenueArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryTodayMedicationArgs = {
  userId: Scalars['String']['input'];
};

export type Rx_Entries = {
  advices?: InputMaybe<Array<Scalars['String']['input']>>;
  diagnosis: Array<Diagnosis>;
  prescriptionMedication: Array<PrescriptionMedication>;
  symptoms: Array<Symptoms>;
};

export type RazorPayOrder = {
  __typename?: 'RazorPayOrder';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type RegisterDto = {
  confirmpassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isSSO: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  error?: Maybe<ErrorType>;
  user?: Maybe<User>;
};

export type RevenueStats = {
  __typename?: 'RevenueStats';
  percentageChange: Scalars['Float']['output'];
  revenue: Scalars['Float']['output'];
};

export type Schedule = {
  __typename?: 'Schedule';
  createdAt: Scalars['DateTime']['output'];
  dose: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  medicationId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  time: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: Medication;
};

export type ScheduleDto = {
  dose: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  time: Scalars['String']['input'];
};

export type ServiceDetail = {
  __typename?: 'ServiceDetail';
  amount: Scalars['Float']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  metaData?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
};

export type ServiceDetailDto = {
  amount: Scalars['Float']['input'];
  discount: Scalars['Float']['input'];
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
};

export type ServicesDto = {
  amount: Scalars['Float']['input'];
  discount: Scalars['Float']['input'];
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
};

export type ServicesModel = {
  __typename?: 'ServicesModel';
  amount: Scalars['Float']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  metaData?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
};

export type SlotsDto = {
  clinic_id: Scalars['String']['input'];
  date: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
};

export type SpecailityDto = {
  name: Scalars['String']['input'];
};

export type Speciality = {
  __typename?: 'Speciality';
  name: Scalars['String']['output'];
};

export type Stats = {
  __typename?: 'Stats';
  appointments: Scalars['Float']['output'];
  totalAmount: Scalars['Float']['output'];
  uniquePatientCount: Scalars['Float']['output'];
};

export type StatsDto = {
  clinic_id: Scalars['String']['input'];
  compareDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type StatsGraphDto = {
  aggregationType: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  compareDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  periodicity: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
};

/** Status Enum for patient statuses */
export enum StatusEnum {
  Ap = 'AP',
  Bk = 'BK',
  Ck = 'CK',
  Cm = 'CM',
  Cn = 'CN',
  Cnd = 'CND',
  Cnmp = 'CNMP',
  Og = 'OG'
}

export type Symptoms = {
  name: Scalars['String']['input'];
  properties?: InputMaybe<Scalars['JSON']['input']>;
};

export type SymptomsList = {
  __typename?: 'SymptomsList';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Template = {
  __typename?: 'Template';
  clinicId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  serviceDetails: Array<ServiceDetail>;
};

export type TemplateDto = {
  clinicId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  serviceDetails: Array<ServiceDetailDto>;
  templateId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatedCount = {
  __typename?: 'UpdatedCount';
  count: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  onBoarded: Scalars['Boolean']['output'];
  phoneNumber: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ValidateDoctorOtp = {
  code: Scalars['String']['input'];
  phone_number: Scalars['String']['input'];
};

export type CreateBusinessMutationVariables = Exact<{
  businessInput: BusinessDto;
}>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness: { __typename?: 'Business', id: string, name: string } };

export type AddClinicMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  clinicInput: ClinicDto;
}>;


export type AddClinicMutation = { __typename?: 'Mutation', addClinic: { __typename?: 'Clinic', about: string, business_id: string, city_name: string, closeTime: string, email: string, id: string, location: Array<string>, logoUrl?: string | null, name: string, openTime: string, workingDays: Array<boolean> } };

export type AddDoctorMutationVariables = Exact<{
  clinicIds: Scalars['String']['input'];
  doctorInput: DoctorDto;
}>;


export type AddDoctorMutation = { __typename?: 'Mutation', addDoctor: { __typename?: 'Doctor', doctor_id: string } };

export type UpdateProfilePicUrlMutationVariables = Exact<{
  doctor_id: Scalars['String']['input'];
  picture_url: Scalars['String']['input'];
}>;


export type UpdateProfilePicUrlMutation = { __typename?: 'Mutation', updateProfilePicUrl: { __typename?: 'Doctor', createdAt: any, doctor_id: string, updatedAt: any } };

export type GetClinicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClinicsQuery = { __typename?: 'Query', getClinics: Array<{ __typename?: 'Clinic', about: string, business_id: string, city_name: string, closeTime: string, email: string, id: string, latitude?: number | null, location: Array<string>, logoUrl?: string | null, name: string, workingDays: Array<boolean>, longitude?: number | null, openTime: string, address: { __typename?: 'Address', city: string, country: string, line1: string, line2?: string | null, pin: string, state: string }, phone_number: Array<{ __typename?: 'PhoneNumber', n: string, name: string }>, speciality?: Array<{ __typename?: 'Speciality', name: string }> | null }> };

export type GetClinicDoctorsQueryVariables = Exact<{
  clinicId: Scalars['String']['input'];
}>;


export type GetClinicDoctorsQuery = { __typename?: 'Query', getClinicDoctors: Array<{ __typename?: 'Doctor', createdAt: any, doctor_id: string, updatedAt: any, isActive: boolean, profile: { __typename?: 'Profile', personal: { __typename?: 'Personal', designation: string, dob: any, email: string, first_name: string, gender: string, last_name: string, middle_name?: string | null, phone_number?: string | null, profile_pic?: string | null }, professional: { __typename?: 'Professional', about?: string | null, active: boolean, language: Array<{ __typename?: 'Language', name: string }>, major_speciality: { __typename?: 'MajorSpecaility', name: string }, speciality: Array<{ __typename?: 'Speciality', name: string }>, degree?: Array<{ __typename?: 'Degree', branch_name: string, college_name: string, end_year: any, name: string, start_year: any }> | null } } }> };

export type GetAllDraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDraftsQuery = { __typename?: 'Query', getAllDrafts: Array<{ __typename?: 'DraftModel', clinicName: string, doctorName: string, id: string, name: string, type: string }> };

export type ApproveOrRejectQueryVariables = Exact<{
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type ApproveOrRejectQuery = { __typename?: 'Query', approveOrReject: string };


export const CreateBusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBusiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"businessInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BusinessDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"businessInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"businessInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateBusinessMutation, CreateBusinessMutationVariables>;
export const AddClinicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddClinic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"businessId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clinicInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClinicDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addClinic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"businessId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"businessId"}}},{"kind":"Argument","name":{"kind":"Name","value":"clinicInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clinicInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"business_id"}},{"kind":"Field","name":{"kind":"Name","value":"city_name"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"workingDays"}}]}}]}}]} as unknown as DocumentNode<AddClinicMutation, AddClinicMutationVariables>;
export const AddDoctorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddDoctor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clinicIds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"doctorInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DoctorDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addDoctor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"doctorInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"doctorInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"clinicIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clinicIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doctor_id"}}]}}]}}]} as unknown as DocumentNode<AddDoctorMutation, AddDoctorMutationVariables>;
export const UpdateProfilePicUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfilePicUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"doctor_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"picture_url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfilePicUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"doctor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"doctor_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"picture_url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"picture_url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"doctor_id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateProfilePicUrlMutation, UpdateProfilePicUrlMutationVariables>;
export const GetClinicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClinics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClinics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"business_id"}},{"kind":"Field","name":{"kind":"Name","value":"city_name"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"pin"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"n"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"speciality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workingDays"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}}]}}]}}]} as unknown as DocumentNode<GetClinicsQuery, GetClinicsQueryVariables>;
export const GetClinicDoctorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClinicDoctors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clinicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClinicDoctors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clinicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clinicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"doctor_id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"profile_pic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"professional"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"language"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"major_speciality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"speciality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branch_name"}},{"kind":"Field","name":{"kind":"Name","value":"college_name"}},{"kind":"Field","name":{"kind":"Name","value":"end_year"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start_year"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetClinicDoctorsQuery, GetClinicDoctorsQueryVariables>;
export const GetAllDraftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllDrafts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllDrafts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clinicName"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetAllDraftsQuery, GetAllDraftsQueryVariables>;
export const ApproveOrRejectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ApproveOrReject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveOrReject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}]}}]} as unknown as DocumentNode<ApproveOrRejectQuery, ApproveOrRejectQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  pin: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type AddressDto = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  line1: Scalars['String']['input'];
  line2?: InputMaybe<Scalars['String']['input']>;
  pin: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type AgeGroupStats = {
  __typename?: 'AgeGroupStats';
  count: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
};

export type AppointmentCount = {
  __typename?: 'AppointmentCount';
  appointmentcount: Scalars['Float']['output'];
  day: Scalars['DateTime']['output'];
};

export type AppointmentDetails = {
  __typename?: 'AppointmentDetails';
  Prescription?: Maybe<PrescriptionDetails>;
  aid: Scalars['String']['output'];
  channel: Scalars['String']['output'];
  end_time: Scalars['String']['output'];
  patientProfile: PatientProfile;
  paymentDetails?: Maybe<PaymentDetails>;
  reference_id?: Maybe<Scalars['String']['output']>;
  service_type: Scalars['String']['output'];
  start_time: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type AppointmentDetailsDto = {
  age?: InputMaybe<Scalars['String']['input']>;
  aid?: InputMaybe<Scalars['String']['input']>;
  channel: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  dob?: InputMaybe<Scalars['String']['input']>;
  doctor_id: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Float']['input']>;
  patientProfileId: Scalars['String']['input'];
  service_type: Scalars['String']['input'];
  start_Time?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type AppointmentStats = {
  __typename?: 'AppointmentStats';
  appointments: Scalars['Float']['output'];
  percentageChange: Scalars['Float']['output'];
};

export type Business = {
  __typename?: 'Business';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type BusinessDto = {
  name: Scalars['String']['input'];
};

export type Cpg = {
  __typename?: 'CPG';
  barCode: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  healthScore: Scalars['String']['output'];
  imageURL: Scalars['String']['output'];
  ingrediants: Scalars['String']['output'];
  nutritionalFacts: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  size: Scalars['String']['output'];
  suggestion?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CpgEdge = {
  __typename?: 'CPGEdge';
  cursor: Scalars['String']['output'];
  node: Cpg;
};

export type ChannelCount = {
  __typename?: 'ChannelCount';
  appointmentcount: Scalars['Float']['output'];
  channel: Scalars['String']['output'];
};

export type ChannelStats = {
  __typename?: 'ChannelStats';
  channel: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Clinic = {
  __typename?: 'Clinic';
  about: Scalars['String']['output'];
  address: Address;
  business_id: Scalars['String']['output'];
  city_name: Scalars['String']['output'];
  closeTime: Scalars['String']['output'];
  doctors?: Maybe<Array<Doctor>>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  location: Array<Scalars['String']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  openTime: Scalars['String']['output'];
  phone_number: Array<PhoneNumber>;
  speciality?: Maybe<Array<Speciality>>;
  workingDays: Array<Scalars['Boolean']['output']>;
};

export type ClinicCoordinatesDto = {
  clinicId: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type ClinicDto = {
  about: Scalars['String']['input'];
  address: AddressDto;
  city_name: Scalars['String']['input'];
  closeTime?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  location?: InputMaybe<Array<Scalars['String']['input']>>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  openTime?: InputMaybe<Scalars['String']['input']>;
  phone_number: Array<PhoneNumberDto>;
  speciality: Array<SpecailityDto>;
  workingDays?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type ClinicDetailDto = {
  addressValue?: InputMaybe<AddressDto>;
  clinicId: Scalars['String']['input'];
  field: Scalars['String']['input'];
  phoneValue?: InputMaybe<Array<PhoneNumberDto>>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};

export type ClinicPatient = {
  __typename?: 'ClinicPatient';
  id: Scalars['String']['output'];
  profiles: PatientProfileLastVisited;
};

export type ClinicPatientBasicInfo = {
  __typename?: 'ClinicPatientBasicInfo';
  first_name: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  mobile: Scalars['String']['output'];
};

export type ClinicPatientsResponse = {
  __typename?: 'ClinicPatientsResponse';
  patients: Array<ClinicPatientBasicInfo>;
};

export type ClinicWorkingHoursDto = {
  closeTime: Scalars['String']['input'];
  openTime: Scalars['String']['input'];
  workingDays: Array<Scalars['Boolean']['input']>;
};

export type CpgDto = {
  barCode: Scalars['String']['input'];
  imageURL: Scalars['String']['input'];
  ingrediants: Scalars['String']['input'];
  nutritionalFacts: Scalars['String']['input'];
  productName: Scalars['String']['input'];
  size: Scalars['String']['input'];
};

export type CreditsUpdateDto = {
  call?: InputMaybe<Scalars['Float']['input']>;
  clinicId: Scalars['String']['input'];
  sms?: InputMaybe<Scalars['Float']['input']>;
  videoCall?: InputMaybe<Scalars['Float']['input']>;
  whatsapp?: InputMaybe<Scalars['Float']['input']>;
};

export type Degree = {
  __typename?: 'Degree';
  branch_name: Scalars['String']['output'];
  college_name: Scalars['String']['output'];
  end_year: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  start_year: Scalars['DateTime']['output'];
};

export type DegreeDto = {
  branch_name: Scalars['String']['input'];
  college_name: Scalars['String']['input'];
  end_year: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  start_year: Scalars['DateTime']['input'];
};

export type Diagnosis = {
  name: Scalars['String']['input'];
  properties?: InputMaybe<Scalars['JSON']['input']>;
};

export type DiagnosisList = {
  __typename?: 'DiagnosisList';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Doctor = {
  __typename?: 'Doctor';
  createdAt: Scalars['DateTime']['output'];
  doctor_id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  profile: Profile;
  updatedAt: Scalars['DateTime']['output'];
};

export type DoctorDto = {
  profile: ProfileDto;
};

export type Draft = {
  __typename?: 'Draft';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DraftModel = {
  __typename?: 'DraftModel';
  clinicName: Scalars['String']['output'];
  doctorName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DraftsDto = {
  clinic_id: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type DrugList = {
  __typename?: 'DrugList';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type GenderGroup = {
  __typename?: 'GenderGroup';
  age_0_17: AgeGroupStats;
  age_18_24: AgeGroupStats;
  age_25_34: AgeGroupStats;
  age_35_44: AgeGroupStats;
  age_45_64: AgeGroupStats;
  age_65_plus: AgeGroupStats;
};

export type GraphData = {
  __typename?: 'GraphData';
  timestamp: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type GroupedPatients = {
  __typename?: 'GroupedPatients';
  FEMALE: GenderGroup;
  MALE: GenderGroup;
};

export type Language = {
  __typename?: 'Language';
  name: Scalars['String']['output'];
};

export type LanguageDto = {
  name: Scalars['String']['input'];
};

export type LastVisited = {
  __typename?: 'LastVisited';
  visit_checkin: Scalars['String']['output'];
};

export type MajorSpecaility = {
  __typename?: 'MajorSpecaility';
  name: Scalars['String']['output'];
};

export type MajorSpecailityDto = {
  name: Scalars['String']['input'];
};

export type Medication = {
  __typename?: 'Medication';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  from: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  prescriptionURL?: Maybe<Scalars['String']['output']>;
  schedule: Array<Schedule>;
  to: Scalars['DateTime']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type MedicationDto = {
  comment?: Scalars['String']['input'];
  from: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  prescriptionURL?: Scalars['String']['input'];
  schedule: Array<ScheduleDto>;
  to: Scalars['DateTime']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MedicationStatus = {
  __typename?: 'MedicationStatus';
  id: Scalars['String']['output'];
  medicationId: Scalars['String']['output'];
  scheduleId: Scalars['String']['output'];
  taken: Scalars['String']['output'];
  time: Scalars['DateTime']['output'];
};

export type MedicationStatusDto = {
  medicationId: Scalars['String']['input'];
  scheduleId: Scalars['String']['input'];
  taken: Scalars['String']['input'];
  time: Scalars['DateTime']['input'];
};

export type MedicationViaPhoneDto = {
  clinicId: Scalars['String']['input'];
  comment?: Scalars['String']['input'];
  from: Scalars['DateTime']['input'];
  mobile: Scalars['String']['input'];
  name: Scalars['String']['input'];
  prescriptionURL?: Scalars['String']['input'];
  schedule: Array<ScheduleDto>;
  to: Scalars['DateTime']['input'];
  type: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DoctorLoginOTPRequest: OtpStatus;
  addBusinessHours: Clinic;
  addClinic: Clinic;
  addCpgDetails: Cpg;
  addDoctor: Doctor;
  addMedication: Medication;
  addMedicationViaPhoneNumber: Medication;
  addPatient: Patient;
  bookAppointment: AppointmentDetails;
  bookAppointmentOnline: AppointmentDetails;
  createBusiness: Business;
  createDraft: Draft;
  createOrder: Scalars['String']['output'];
  createService: ServicesModel;
  createTemplate: Template;
  deleteDoctor: Scalars['Boolean']['output'];
  deleteSchedule: Scalars['Float']['output'];
  editMedication: Medication;
  getAppointmentGraph: Array<GraphData>;
  getAppointmentStats: AppointmentStats;
  getProductMetrics: Cpg;
  getRevenue: RevenueStats;
  logout: Scalars['String']['output'];
  onboarding: RegisterResponse;
  refreshToken: Scalars['String']['output'];
  register: RegisterResponse;
  registerViaOTP: RegisterResponse;
  savePrescription: Prescription;
  sendMessage: Scalars['String']['output'];
  sendOTP: OtpStatus;
  sendVideoLink: Scalars['String']['output'];
  updateAppointmentStatus: AppointmentDetails;
  updateClinicCoordinates: Clinic;
  updateClinicDetail: Clinic;
  updateCredits: UpdatedCount;
  updateDoctor: Doctor;
  updateDoctorActiveStatus: Scalars['Boolean']['output'];
  updateMedicationStatus: MedicationStatus;
  updateNotifications: Notifications;
  updatePaymentDetails: Scalars['String']['output'];
  updateProfilePicUrl: Doctor;
  updateService: ServicesModel;
  updateVideoDuration: Scalars['String']['output'];
  validateDoctorOTP: Doctor;
};


export type MutationDoctorLoginOtpRequestArgs = {
  phoneInput: PhoneNumberDto;
};


export type MutationAddBusinessHoursArgs = {
  businessHoursInput: ClinicWorkingHoursDto;
  clinicId: Scalars['String']['input'];
};


export type MutationAddClinicArgs = {
  businessId: Scalars['String']['input'];
  clinicInput: ClinicDto;
};


export type MutationAddCpgDetailsArgs = {
  cpgInput: CpgDto;
};


export type MutationAddDoctorArgs = {
  clinicIds: Scalars['String']['input'];
  doctorInput: DoctorDto;
};


export type MutationAddMedicationArgs = {
  medicationInput: MedicationDto;
};


export type MutationAddMedicationViaPhoneNumberArgs = {
  medicationInputViaPhone: MedicationViaPhoneDto;
};


export type MutationAddPatientArgs = {
  businessId: Scalars['String']['input'];
  patientInput: PatientDto;
};


export type MutationBookAppointmentArgs = {
  appointmentInput: AppointmentDetailsDto;
};


export type MutationBookAppointmentOnlineArgs = {
  appointmentInput: OnlineAppointmentDetailsDto;
};


export type MutationCreateBusinessArgs = {
  businessInput: BusinessDto;
};


export type MutationCreateDraftArgs = {
  draftInput: DraftsDto;
};


export type MutationCreateOrderArgs = {
  paymentInput: PaymentOrderDto;
};


export type MutationCreateServiceArgs = {
  clinicId: Scalars['String']['input'];
  serviceInput: ServicesDto;
};


export type MutationCreateTemplateArgs = {
  templateInput: TemplateDto;
};


export type MutationDeleteDoctorArgs = {
  doctor_id: Scalars['String']['input'];
};


export type MutationDeleteScheduleArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEditMedicationArgs = {
  id: Scalars['String']['input'];
  medicationInput: MedicationDto;
};


export type MutationGetAppointmentGraphArgs = {
  satsGraphDto: StatsGraphDto;
};


export type MutationGetAppointmentStatsArgs = {
  statsDTO: StatsDto;
};


export type MutationGetProductMetricsArgs = {
  barCode: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationGetRevenueArgs = {
  statsDTO: StatsDto;
};


export type MutationOnboardingArgs = {
  onboardingInput: OnBoaringDto;
};


export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};


export type MutationRegisterViaOtpArgs = {
  otpRegistrationInput: OtpRegistrationDto;
};


export type MutationSavePrescriptionArgs = {
  prescriptionInput: PrescriptionDto;
};


export type MutationSendMessageArgs = {
  clinicId: Scalars['String']['input'];
  prescriptionURL: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSendOtpArgs = {
  phoneInput: PhoneNumberDto;
};


export type MutationSendVideoLinkArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationUpdateAppointmentStatusArgs = {
  aid: Scalars['String']['input'];
  status: StatusEnum;
};


export type MutationUpdateClinicCoordinatesArgs = {
  clinicCoordinatesInput: ClinicCoordinatesDto;
};


export type MutationUpdateClinicDetailArgs = {
  clinicDetailsInput: ClinicDetailDto;
};


export type MutationUpdateCreditsArgs = {
  updateCreditsPayload: CreditsUpdateDto;
};


export type MutationUpdateDoctorArgs = {
  doctorInput: DoctorDto;
  id: Scalars['String']['input'];
};


export type MutationUpdateDoctorActiveStatusArgs = {
  doctor_id: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
};


export type MutationUpdateMedicationStatusArgs = {
  medicationStatusInput: MedicationStatusDto;
};


export type MutationUpdateNotificationsArgs = {
  channel: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
  notification_id: Scalars['String']['input'];
};


export type MutationUpdatePaymentDetailsArgs = {
  paymentInput: PaymentDto;
};


export type MutationUpdateProfilePicUrlArgs = {
  doctor_id: Scalars['String']['input'];
  picture_url: Scalars['String']['input'];
};


export type MutationUpdateServiceArgs = {
  serviceId: Scalars['String']['input'];
  serviceInput: ServicesDto;
};


export type MutationUpdateVideoDurationArgs = {
  aid: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  mins: Scalars['Float']['input'];
};


export type MutationValidateDoctorOtpArgs = {
  otpInput: ValidateDoctorOtp;
};

export type NotificationCredits = {
  __typename?: 'NotificationCredits';
  call: Scalars['String']['output'];
  id: Scalars['String']['output'];
  sms: Scalars['String']['output'];
  video: Scalars['String']['output'];
  whatsapp: Scalars['String']['output'];
};

export type Notifications = {
  __typename?: 'Notifications';
  call: Scalars['Boolean']['output'];
  event: Scalars['String']['output'];
  id: Scalars['String']['output'];
  sms: Scalars['Boolean']['output'];
  whatsapp: Scalars['Boolean']['output'];
};

export type OtpRegistrationDto = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};

export type OtpStatus = {
  __typename?: 'OTPStatus';
  success: Scalars['Boolean']['output'];
};

export type OnBoaringDto = {
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type OnlineAppointmentDetailsDto = {
  age?: InputMaybe<Scalars['String']['input']>;
  aid?: InputMaybe<Scalars['String']['input']>;
  business_id: Scalars['String']['input'];
  channel: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  designation: Scalars['String']['input'];
  dob?: InputMaybe<Scalars['String']['input']>;
  doctor_id: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Float']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  service_type: Scalars['String']['input'];
  start_Time?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type PaginatedCpg = {
  __typename?: 'PaginatedCPG';
  edges?: Maybe<Array<CpgEdge>>;
  hasNextPage: Scalars['Boolean']['output'];
  nodes?: Maybe<Array<Cpg>>;
  totalCount: Scalars['Int']['output'];
};

export type PaginatedPatients = {
  __typename?: 'PaginatedPatients';
  patients: Array<PatientsWithAppointment>;
  totalCount: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Patient = {
  __typename?: 'Patient';
  id: Scalars['String']['output'];
  profiles: PatientProfile;
};

export type PatientDto = {
  profile: PatientProfileDto;
};

export type PatientProfile = {
  __typename?: 'PatientProfile';
  address?: Maybe<Address>;
  age?: Maybe<Scalars['String']['output']>;
  designation: Scalars['String']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  metaData?: Maybe<Scalars['JSON']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  mobile: Scalars['String']['output'];
};

export type PatientProfileDto = {
  address?: InputMaybe<AddressDto>;
  age?: InputMaybe<Scalars['String']['input']>;
  designation: Scalars['String']['input'];
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
};

export type PatientProfileLastVisited = {
  __typename?: 'PatientProfileLastVisited';
  address?: Maybe<Address>;
  age?: Maybe<Scalars['String']['output']>;
  designation: Scalars['String']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastVisited?: Maybe<Array<LastVisited>>;
  last_name?: Maybe<Scalars['String']['output']>;
  metaData?: Maybe<Scalars['JSON']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  mobile: Scalars['String']['output'];
};

export type PatientStatsResponse = {
  __typename?: 'PatientStatsResponse';
  groupedPatients: GroupedPatients;
  totalPatients: Scalars['Int']['output'];
};

export type PatientsWithAppointment = {
  __typename?: 'PatientsWithAppointment';
  AppointmentDetails?: Maybe<Array<AppointmentDetails>>;
  address?: Maybe<Address>;
  age?: Maybe<Scalars['String']['output']>;
  designation: Scalars['String']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  metaData?: Maybe<Scalars['JSON']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  mobile: Scalars['String']['output'];
};

export type PaymentCount = {
  __typename?: 'PaymentCount';
  day: Scalars['DateTime']['output'];
  totalPaymentAmount: Scalars['Float']['output'];
};

export type PaymentDetails = {
  __typename?: 'PaymentDetails';
  amount: Scalars['Float']['output'];
  billURL?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  payment_status: Scalars['String']['output'];
  payment_type: Scalars['String']['output'];
  pid: Scalars['String']['output'];
  services?: Maybe<Array<Scalars['String']['output']>>;
};

export type PaymentDto = {
  aid: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  billURL?: InputMaybe<Scalars['String']['input']>;
  discount: Scalars['Float']['input'];
  payment_status: Scalars['String']['input'];
  payment_type: Scalars['String']['input'];
  services: Array<Scalars['String']['input']>;
};

export type PaymentOrderDto = {
  amount: Scalars['Float']['input'];
};

export type Personal = {
  __typename?: 'Personal';
  designation: Scalars['String']['output'];
  dob: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  middle_name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  profile_pic?: Maybe<Scalars['String']['output']>;
};

export type PersonalDto = {
  designation: Scalars['String']['input'];
  dob: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  middle_name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  profile_pic?: InputMaybe<Scalars['String']['input']>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  n: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PhoneNumberDto = {
  n: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PhoneNumberDto = {
  phoneNumber: Scalars['String']['input'];
};

export type Prescription = {
  __typename?: 'Prescription';
  rx_id: Scalars['String']['output'];
};

export type PrescriptionDto = {
  aid: Scalars['String']['input'];
  clinicId: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
  followUp?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  patientProfileId: Scalars['String']['input'];
  privateNotes?: InputMaybe<Scalars['String']['input']>;
  rx_entries: Rx_Entries;
  rx_url?: InputMaybe<Scalars['String']['input']>;
  visit_name?: InputMaybe<Scalars['String']['input']>;
};

export type PrescriptionDetails = {
  __typename?: 'PrescriptionDetails';
  followUp?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  privateNotes?: Maybe<Scalars['String']['output']>;
  rx_entities: Scalars['JSON']['output'];
  rx_id: Scalars['String']['output'];
  rx_url?: Maybe<Scalars['String']['output']>;
};

export type PrescriptionMedication = {
  dose?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  frequency: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timing: Scalars['String']['input'];
};

export type Professional = {
  __typename?: 'Professional';
  about?: Maybe<Scalars['String']['output']>;
  active: Scalars['Boolean']['output'];
  clinic?: Maybe<Array<Clinic>>;
  degree?: Maybe<Array<Degree>>;
  language: Array<Language>;
  major_speciality: MajorSpecaility;
  speciality: Array<Speciality>;
};

export type ProfessionalDto = {
  about: Scalars['String']['input'];
  active?: Scalars['Boolean']['input'];
  degree?: InputMaybe<Array<DegreeDto>>;
  language: Array<LanguageDto>;
  major_speciality: MajorSpecailityDto;
  medicalLicenseNumber?: InputMaybe<Scalars['String']['input']>;
  speciality: Array<SpecailityDto>;
};

export type Profile = {
  __typename?: 'Profile';
  personal: Personal;
  professional: Professional;
};

export type ProfileDto = {
  personal: PersonalDto;
  professional: ProfessionalDto;
};

export type Query = {
  __typename?: 'Query';
  approveAppointment: Scalars['String']['output'];
  approveOrReject: Scalars['String']['output'];
  canDoVideoCall: Scalars['Boolean']['output'];
  cancelAppointment: Scalars['String']['output'];
  createRazorPayOrder: RazorPayOrder;
  deleteService: Scalars['String']['output'];
  deleteTemplate: Array<Scalars['String']['output']>;
  getAClinic: Clinic;
  getAllClinicTemplates: Array<Template>;
  getAllDrafts: Array<DraftModel>;
  getAllMedication: Array<Medication>;
  getAllPatientProfiles: Array<PatientProfile>;
  getAllPatientsByStatus: Array<AppointmentDetails>;
  getAllTomorrowPatients: Array<AppointmentDetails>;
  getAppointmentChannelStats: Array<ChannelStats>;
  getAppointmentCount: Array<AppointmentCount>;
  getAppointmentStatus: AppointmentDetails;
  getAppointments: Array<AppointmentDetails>;
  getBusinessClinics: Array<Clinic>;
  getChannelCount: Array<ChannelCount>;
  getClinicDoctors: Array<Doctor>;
  getClinicNotification: Array<Notifications>;
  getClinicPatients: Array<ClinicPatient>;
  getClinicPatientsBasicInfo: ClinicPatientsResponse;
  getClinics: Array<Clinic>;
  getDiagnosisList: Array<DiagnosisList>;
  getDoctor: Doctor;
  getDoctors: Array<Doctor>;
  getDrugList: Array<DrugList>;
  getMedicationRange: Array<Medication>;
  getNearestDoctors: Array<Doctor>;
  getNotificationCredits: NotificationCredits;
  getOnGoing: Array<Medication>;
  getPatientHistory: Array<AppointmentDetails>;
  getPatientsByAgeAndGender: PatientStatsResponse;
  getPatientsCount: Scalars['Float']['output'];
  getPatientsPaginated: PaginatedPatients;
  getPaymentAnalytics: Array<PaymentCount>;
  getProduct: Cpg;
  getProducts: PaginatedCpg;
  getRooms: Scalars['String']['output'];
  getServices: Array<ServicesModel>;
  getSlots: Array<Scalars['String']['output']>;
  getStats: Stats;
  getSymptomsList: Array<SymptomsList>;
  getUserByPhoneNumber: User;
  getUsers: Array<User>;
  getWeeklyRevenue: Array<GraphData>;
  todayMedication: Array<Medication>;
};


export type QueryApproveAppointmentArgs = {
  aid: Scalars['String']['input'];
};


export type QueryApproveOrRejectArgs = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type QueryCanDoVideoCallArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryCancelAppointmentArgs = {
  aid: Scalars['String']['input'];
};


export type QueryCreateRazorPayOrderArgs = {
  amount: Scalars['Float']['input'];
};


export type QueryDeleteServiceArgs = {
  serviceId: Scalars['String']['input'];
};


export type QueryDeleteTemplateArgs = {
  templateId: Scalars['String']['input'];
};


export type QueryGetAllClinicTemplatesArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetAllPatientProfilesArgs = {
  businessId: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type QueryGetAllPatientsByStatusArgs = {
  clinic_id: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
  status: StatusEnum;
};


export type QueryGetAllTomorrowPatientsArgs = {
  clinic_id: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
};


export type QueryGetAppointmentChannelStatsArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetAppointmentCountArgs = {
  channel: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  duration: Scalars['String']['input'];
};


export type QueryGetAppointmentStatusArgs = {
  mobile: Scalars['String']['input'];
  reference_id: Scalars['String']['input'];
};


export type QueryGetAppointmentsArgs = {
  clinic_id: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type QueryGetBusinessClinicsArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetChannelCountArgs = {
  clinic_id: Scalars['String']['input'];
  duration: Scalars['String']['input'];
};


export type QueryGetClinicDoctorsArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetClinicNotificationArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetClinicPatientsArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetClinicPatientsBasicInfoArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetDiagnosisListArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetDoctorArgs = {
  doctor_id: Scalars['String']['input'];
};


export type QueryGetDrugListArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetMedicationRangeArgs = {
  currentDate: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryGetNearestDoctorsArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type QueryGetNotificationCreditsArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetOnGoingArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetPatientHistoryArgs = {
  includePayment?: InputMaybe<Scalars['Boolean']['input']>;
  patientProfileId: Scalars['String']['input'];
};


export type QueryGetPatientsByAgeAndGenderArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetPatientsCountArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryGetPatientsPaginatedArgs = {
  clinic_id: Scalars['String']['input'];
  doctor_id?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
};


export type QueryGetPaymentAnalyticsArgs = {
  clinic_id: Scalars['String']['input'];
  duration: Scalars['String']['input'];
};


export type QueryGetProductArgs = {
  barcode: Scalars['String']['input'];
};


export type QueryGetProductsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetServicesArgs = {
  clinicId: Scalars['String']['input'];
};


export type QueryGetSlotsArgs = {
  slotsDto: SlotsDto;
};


export type QueryGetStatsArgs = {
  clinic_id: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type QueryGetSymptomsListArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetUserByPhoneNumberArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type QueryGetWeeklyRevenueArgs = {
  clinic_id: Scalars['String']['input'];
};


export type QueryTodayMedicationArgs = {
  userId: Scalars['String']['input'];
};

export type Rx_Entries = {
  advices?: InputMaybe<Array<Scalars['String']['input']>>;
  diagnosis: Array<Diagnosis>;
  prescriptionMedication: Array<PrescriptionMedication>;
  symptoms: Array<Symptoms>;
};

export type RazorPayOrder = {
  __typename?: 'RazorPayOrder';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type RegisterDto = {
  confirmpassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isSSO: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  error?: Maybe<ErrorType>;
  user?: Maybe<User>;
};

export type RevenueStats = {
  __typename?: 'RevenueStats';
  percentageChange: Scalars['Float']['output'];
  revenue: Scalars['Float']['output'];
};

export type Schedule = {
  __typename?: 'Schedule';
  createdAt: Scalars['DateTime']['output'];
  dose: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  medicationId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  time: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: Medication;
};

export type ScheduleDto = {
  dose: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  time: Scalars['String']['input'];
};

export type ServiceDetail = {
  __typename?: 'ServiceDetail';
  amount: Scalars['Float']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  metaData?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
};

export type ServiceDetailDto = {
  amount: Scalars['Float']['input'];
  discount: Scalars['Float']['input'];
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
};

export type ServicesDto = {
  amount: Scalars['Float']['input'];
  discount: Scalars['Float']['input'];
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
};

export type ServicesModel = {
  __typename?: 'ServicesModel';
  amount: Scalars['Float']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  metaData?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
};

export type SlotsDto = {
  clinic_id: Scalars['String']['input'];
  date: Scalars['String']['input'];
  doctor_id: Scalars['String']['input'];
};

export type SpecailityDto = {
  name: Scalars['String']['input'];
};

export type Speciality = {
  __typename?: 'Speciality';
  name: Scalars['String']['output'];
};

export type Stats = {
  __typename?: 'Stats';
  appointments: Scalars['Float']['output'];
  totalAmount: Scalars['Float']['output'];
  uniquePatientCount: Scalars['Float']['output'];
};

export type StatsDto = {
  clinic_id: Scalars['String']['input'];
  compareDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type StatsGraphDto = {
  aggregationType: Scalars['String']['input'];
  clinic_id: Scalars['String']['input'];
  compareDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  periodicity: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
};

/** Status Enum for patient statuses */
export enum StatusEnum {
  Ap = 'AP',
  Bk = 'BK',
  Ck = 'CK',
  Cm = 'CM',
  Cn = 'CN',
  Cnd = 'CND',
  Cnmp = 'CNMP',
  Og = 'OG'
}

export type Symptoms = {
  name: Scalars['String']['input'];
  properties?: InputMaybe<Scalars['JSON']['input']>;
};

export type SymptomsList = {
  __typename?: 'SymptomsList';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Template = {
  __typename?: 'Template';
  clinicId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  serviceDetails: Array<ServiceDetail>;
};

export type TemplateDto = {
  clinicId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  serviceDetails: Array<ServiceDetailDto>;
  templateId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatedCount = {
  __typename?: 'UpdatedCount';
  count: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  onBoarded: Scalars['Boolean']['output'];
  phoneNumber: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ValidateDoctorOtp = {
  code: Scalars['String']['input'];
  phone_number: Scalars['String']['input'];
};

export type CreateBusinessMutationVariables = Exact<{
  businessInput: BusinessDto;
}>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness: { __typename?: 'Business', id: string, name: string } };

export type AddClinicMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  clinicInput: ClinicDto;
}>;


export type AddClinicMutation = { __typename?: 'Mutation', addClinic: { __typename?: 'Clinic', about: string, business_id: string, city_name: string, closeTime: string, email: string, id: string, location: Array<string>, logoUrl?: string | null, name: string, openTime: string, workingDays: Array<boolean> } };

export type AddDoctorMutationVariables = Exact<{
  clinicIds: Scalars['String']['input'];
  doctorInput: DoctorDto;
}>;


export type AddDoctorMutation = { __typename?: 'Mutation', addDoctor: { __typename?: 'Doctor', doctor_id: string } };

export type UpdateProfilePicUrlMutationVariables = Exact<{
  doctor_id: Scalars['String']['input'];
  picture_url: Scalars['String']['input'];
}>;


export type UpdateProfilePicUrlMutation = { __typename?: 'Mutation', updateProfilePicUrl: { __typename?: 'Doctor', createdAt: any, doctor_id: string, updatedAt: any } };

export type GetClinicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClinicsQuery = { __typename?: 'Query', getClinics: Array<{ __typename?: 'Clinic', about: string, business_id: string, city_name: string, closeTime: string, email: string, id: string, latitude?: number | null, location: Array<string>, logoUrl?: string | null, name: string, workingDays: Array<boolean>, longitude?: number | null, openTime: string, address: { __typename?: 'Address', city: string, country: string, line1: string, line2?: string | null, pin: string, state: string }, phone_number: Array<{ __typename?: 'PhoneNumber', n: string, name: string }>, speciality?: Array<{ __typename?: 'Speciality', name: string }> | null }> };

export type GetClinicDoctorsQueryVariables = Exact<{
  clinicId: Scalars['String']['input'];
}>;


export type GetClinicDoctorsQuery = { __typename?: 'Query', getClinicDoctors: Array<{ __typename?: 'Doctor', createdAt: any, doctor_id: string, updatedAt: any, isActive: boolean, profile: { __typename?: 'Profile', personal: { __typename?: 'Personal', designation: string, dob: any, email: string, first_name: string, gender: string, last_name: string, middle_name?: string | null, phone_number?: string | null, profile_pic?: string | null }, professional: { __typename?: 'Professional', about?: string | null, active: boolean, language: Array<{ __typename?: 'Language', name: string }>, major_speciality: { __typename?: 'MajorSpecaility', name: string }, speciality: Array<{ __typename?: 'Speciality', name: string }>, degree?: Array<{ __typename?: 'Degree', branch_name: string, college_name: string, end_year: any, name: string, start_year: any }> | null } } }> };

export type GetAllDraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDraftsQuery = { __typename?: 'Query', getAllDrafts: Array<{ __typename?: 'DraftModel', clinicName: string, doctorName: string, id: string, name: string, type: string }> };

export type ApproveOrRejectQueryVariables = Exact<{
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type ApproveOrRejectQuery = { __typename?: 'Query', approveOrReject: string };


export const CreateBusinessDocument = gql`
    mutation CreateBusiness($businessInput: BusinessDTO!) {
  createBusiness(businessInput: $businessInput) {
    id
    name
  }
}
    `;
export type CreateBusinessMutationFn = Apollo.MutationFunction<CreateBusinessMutation, CreateBusinessMutationVariables>;

/**
 * __useCreateBusinessMutation__
 *
 * To run a mutation, you first call `useCreateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessMutation, { data, loading, error }] = useCreateBusinessMutation({
 *   variables: {
 *      businessInput: // value for 'businessInput'
 *   },
 * });
 */
export function useCreateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<CreateBusinessMutation, CreateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBusinessMutation, CreateBusinessMutationVariables>(CreateBusinessDocument, options);
      }
export type CreateBusinessMutationHookResult = ReturnType<typeof useCreateBusinessMutation>;
export type CreateBusinessMutationResult = Apollo.MutationResult<CreateBusinessMutation>;
export type CreateBusinessMutationOptions = Apollo.BaseMutationOptions<CreateBusinessMutation, CreateBusinessMutationVariables>;
export const AddClinicDocument = gql`
    mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {
  addClinic(businessId: $businessId, clinicInput: $clinicInput) {
    about
    business_id
    city_name
    closeTime
    email
    id
    location
    logoUrl
    name
    openTime
    workingDays
  }
}
    `;
export type AddClinicMutationFn = Apollo.MutationFunction<AddClinicMutation, AddClinicMutationVariables>;

/**
 * __useAddClinicMutation__
 *
 * To run a mutation, you first call `useAddClinicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClinicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClinicMutation, { data, loading, error }] = useAddClinicMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      clinicInput: // value for 'clinicInput'
 *   },
 * });
 */
export function useAddClinicMutation(baseOptions?: Apollo.MutationHookOptions<AddClinicMutation, AddClinicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddClinicMutation, AddClinicMutationVariables>(AddClinicDocument, options);
      }
export type AddClinicMutationHookResult = ReturnType<typeof useAddClinicMutation>;
export type AddClinicMutationResult = Apollo.MutationResult<AddClinicMutation>;
export type AddClinicMutationOptions = Apollo.BaseMutationOptions<AddClinicMutation, AddClinicMutationVariables>;
export const AddDoctorDocument = gql`
    mutation AddDoctor($clinicIds: String!, $doctorInput: DoctorDTO!) {
  addDoctor(doctorInput: $doctorInput, clinicIds: $clinicIds) {
    doctor_id
  }
}
    `;
export type AddDoctorMutationFn = Apollo.MutationFunction<AddDoctorMutation, AddDoctorMutationVariables>;

/**
 * __useAddDoctorMutation__
 *
 * To run a mutation, you first call `useAddDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDoctorMutation, { data, loading, error }] = useAddDoctorMutation({
 *   variables: {
 *      clinicIds: // value for 'clinicIds'
 *      doctorInput: // value for 'doctorInput'
 *   },
 * });
 */
export function useAddDoctorMutation(baseOptions?: Apollo.MutationHookOptions<AddDoctorMutation, AddDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDoctorMutation, AddDoctorMutationVariables>(AddDoctorDocument, options);
      }
export type AddDoctorMutationHookResult = ReturnType<typeof useAddDoctorMutation>;
export type AddDoctorMutationResult = Apollo.MutationResult<AddDoctorMutation>;
export type AddDoctorMutationOptions = Apollo.BaseMutationOptions<AddDoctorMutation, AddDoctorMutationVariables>;
export const UpdateProfilePicUrlDocument = gql`
    mutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {
  updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {
    createdAt
    doctor_id
    updatedAt
  }
}
    `;
export type UpdateProfilePicUrlMutationFn = Apollo.MutationFunction<UpdateProfilePicUrlMutation, UpdateProfilePicUrlMutationVariables>;

/**
 * __useUpdateProfilePicUrlMutation__
 *
 * To run a mutation, you first call `useUpdateProfilePicUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfilePicUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfilePicUrlMutation, { data, loading, error }] = useUpdateProfilePicUrlMutation({
 *   variables: {
 *      doctor_id: // value for 'doctor_id'
 *      picture_url: // value for 'picture_url'
 *   },
 * });
 */
export function useUpdateProfilePicUrlMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfilePicUrlMutation, UpdateProfilePicUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfilePicUrlMutation, UpdateProfilePicUrlMutationVariables>(UpdateProfilePicUrlDocument, options);
      }
export type UpdateProfilePicUrlMutationHookResult = ReturnType<typeof useUpdateProfilePicUrlMutation>;
export type UpdateProfilePicUrlMutationResult = Apollo.MutationResult<UpdateProfilePicUrlMutation>;
export type UpdateProfilePicUrlMutationOptions = Apollo.BaseMutationOptions<UpdateProfilePicUrlMutation, UpdateProfilePicUrlMutationVariables>;
export const GetClinicsDocument = gql`
    query GetClinics {
  getClinics {
    about
    business_id
    city_name
    closeTime
    email
    id
    latitude
    location
    logoUrl
    name
    address {
      city
      country
      line1
      line2
      pin
      state
    }
    phone_number {
      n
      name
    }
    speciality {
      name
    }
    workingDays
    longitude
    openTime
  }
}
    `;

/**
 * __useGetClinicsQuery__
 *
 * To run a query within a React component, call `useGetClinicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClinicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClinicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClinicsQuery(baseOptions?: Apollo.QueryHookOptions<GetClinicsQuery, GetClinicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClinicsQuery, GetClinicsQueryVariables>(GetClinicsDocument, options);
      }
export function useGetClinicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClinicsQuery, GetClinicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClinicsQuery, GetClinicsQueryVariables>(GetClinicsDocument, options);
        }
export function useGetClinicsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClinicsQuery, GetClinicsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClinicsQuery, GetClinicsQueryVariables>(GetClinicsDocument, options);
        }
export type GetClinicsQueryHookResult = ReturnType<typeof useGetClinicsQuery>;
export type GetClinicsLazyQueryHookResult = ReturnType<typeof useGetClinicsLazyQuery>;
export type GetClinicsSuspenseQueryHookResult = ReturnType<typeof useGetClinicsSuspenseQuery>;
export type GetClinicsQueryResult = Apollo.QueryResult<GetClinicsQuery, GetClinicsQueryVariables>;
export const GetClinicDoctorsDocument = gql`
    query GetClinicDoctors($clinicId: String!) {
  getClinicDoctors(clinicId: $clinicId) {
    createdAt
    doctor_id
    updatedAt
    isActive
    profile {
      personal {
        designation
        dob
        email
        first_name
        gender
        last_name
        middle_name
        phone_number
        profile_pic
      }
      professional {
        about
        active
        language {
          name
        }
        major_speciality {
          name
        }
        speciality {
          name
        }
        degree {
          branch_name
          college_name
          end_year
          name
          start_year
        }
      }
    }
  }
}
    `;

/**
 * __useGetClinicDoctorsQuery__
 *
 * To run a query within a React component, call `useGetClinicDoctorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClinicDoctorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClinicDoctorsQuery({
 *   variables: {
 *      clinicId: // value for 'clinicId'
 *   },
 * });
 */
export function useGetClinicDoctorsQuery(baseOptions: Apollo.QueryHookOptions<GetClinicDoctorsQuery, GetClinicDoctorsQueryVariables> & ({ variables: GetClinicDoctorsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClinicDoctorsQuery, GetClinicDoctorsQueryVariables>(GetClinicDoctorsDocument, options);
      }
export function useGetClinicDoctorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClinicDoctorsQuery, GetClinicDoctorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClinicDoctorsQuery, GetClinicDoctorsQueryVariables>(GetClinicDoctorsDocument, options);
        }
export function useGetClinicDoctorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClinicDoctorsQuery, GetClinicDoctorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClinicDoctorsQuery, GetClinicDoctorsQueryVariables>(GetClinicDoctorsDocument, options);
        }
export type GetClinicDoctorsQueryHookResult = ReturnType<typeof useGetClinicDoctorsQuery>;
export type GetClinicDoctorsLazyQueryHookResult = ReturnType<typeof useGetClinicDoctorsLazyQuery>;
export type GetClinicDoctorsSuspenseQueryHookResult = ReturnType<typeof useGetClinicDoctorsSuspenseQuery>;
export type GetClinicDoctorsQueryResult = Apollo.QueryResult<GetClinicDoctorsQuery, GetClinicDoctorsQueryVariables>;
export const GetAllDraftsDocument = gql`
    query GetAllDrafts {
  getAllDrafts {
    clinicName
    doctorName
    id
    name
    type
  }
}
    `;

/**
 * __useGetAllDraftsQuery__
 *
 * To run a query within a React component, call `useGetAllDraftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDraftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDraftsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDraftsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDraftsQuery, GetAllDraftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDraftsQuery, GetAllDraftsQueryVariables>(GetAllDraftsDocument, options);
      }
export function useGetAllDraftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDraftsQuery, GetAllDraftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDraftsQuery, GetAllDraftsQueryVariables>(GetAllDraftsDocument, options);
        }
export function useGetAllDraftsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllDraftsQuery, GetAllDraftsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllDraftsQuery, GetAllDraftsQueryVariables>(GetAllDraftsDocument, options);
        }
export type GetAllDraftsQueryHookResult = ReturnType<typeof useGetAllDraftsQuery>;
export type GetAllDraftsLazyQueryHookResult = ReturnType<typeof useGetAllDraftsLazyQuery>;
export type GetAllDraftsSuspenseQueryHookResult = ReturnType<typeof useGetAllDraftsSuspenseQuery>;
export type GetAllDraftsQueryResult = Apollo.QueryResult<GetAllDraftsQuery, GetAllDraftsQueryVariables>;
export const ApproveOrRejectDocument = gql`
    query ApproveOrReject($id: String!, $status: String!) {
  approveOrReject(id: $id, status: $status)
}
    `;

/**
 * __useApproveOrRejectQuery__
 *
 * To run a query within a React component, call `useApproveOrRejectQuery` and pass it any options that fit your needs.
 * When your component renders, `useApproveOrRejectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApproveOrRejectQuery({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useApproveOrRejectQuery(baseOptions: Apollo.QueryHookOptions<ApproveOrRejectQuery, ApproveOrRejectQueryVariables> & ({ variables: ApproveOrRejectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApproveOrRejectQuery, ApproveOrRejectQueryVariables>(ApproveOrRejectDocument, options);
      }
export function useApproveOrRejectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApproveOrRejectQuery, ApproveOrRejectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApproveOrRejectQuery, ApproveOrRejectQueryVariables>(ApproveOrRejectDocument, options);
        }
export function useApproveOrRejectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ApproveOrRejectQuery, ApproveOrRejectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ApproveOrRejectQuery, ApproveOrRejectQueryVariables>(ApproveOrRejectDocument, options);
        }
export type ApproveOrRejectQueryHookResult = ReturnType<typeof useApproveOrRejectQuery>;
export type ApproveOrRejectLazyQueryHookResult = ReturnType<typeof useApproveOrRejectLazyQuery>;
export type ApproveOrRejectSuspenseQueryHookResult = ReturnType<typeof useApproveOrRejectSuspenseQuery>;
export type ApproveOrRejectQueryResult = Apollo.QueryResult<ApproveOrRejectQuery, ApproveOrRejectQueryVariables>;