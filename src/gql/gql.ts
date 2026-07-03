/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateBusiness($businessInput: BusinessDTO!) {\n    createBusiness(businessInput: $businessInput) {\n      id\n      name\n    }\n  }\n": typeof types.CreateBusinessDocument,
    "\n  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {\n    addClinic(businessId: $businessId, clinicInput: $clinicInput) {\n      about\n      business_id\n      city_name\n      closeTime\n      email\n      id\n      location\n      logoUrl\n      name\n      openTime\n      workingDays\n    }\n  }\n": typeof types.AddClinicDocument,
    "\n  mutation AssignClinicFeatures($input: AssignClinicFeaturesDTO!) {\n    assignClinicFeatures(input: $input) {\n      id\n      name\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n": typeof types.AssignClinicFeaturesDocument,
    "\n  mutation RemoveClinicFeatures($input: RemoveClinicFeaturesDTO!) {\n    removeClinicFeatures(input: $input) {\n      id\n      name\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n": typeof types.RemoveClinicFeaturesDocument,
    "\n  mutation UpsertClinicModuleSubscription($input: UpsertClinicModuleSubscriptionDTO!) {\n    upsertClinicModuleSubscription(input: $input) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": typeof types.UpsertClinicModuleSubscriptionDocument,
    "\n  mutation UpdateClinicModuleSubscriptionStatus($input: UpdateClinicModuleSubscriptionStatusDTO!) {\n    updateClinicModuleSubscriptionStatus(input: $input) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": typeof types.UpdateClinicModuleSubscriptionStatusDocument,
    "\n  mutation AssignCustomFeaturesToDoctor($input: AssignCustomFeaturesDTO!) {\n    assignCustomFeaturesToDoctor(input: $input) {\n      doctor_id\n      profile {\n        personal {\n          first_name\n          last_name\n        }\n      }\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n": typeof types.AssignCustomFeaturesToDoctorDocument,
    "\n  mutation RemoveCustomFeaturesFromDoctor($input: RemoveCustomFeaturesDTO!) {\n    removeCustomFeaturesFromDoctor(input: $input) {\n      doctor_id\n      customFeatures {\n        id\n        value\n      }\n      profile {\n        personal {\n          first_name\n          last_name\n        }\n      }\n    }\n  }\n": typeof types.RemoveCustomFeaturesFromDoctorDocument,
    "\n  mutation AddDoctor(\n    $clinicIds: String!\n    $doctorInput: DoctorDTO!\n  ){\n    addDoctor(\n      doctorInput: $doctorInput\n      clinicIds: $clinicIds\n    ){\n      doctor_id\n    }\n  }\n": typeof types.AddDoctorDocument,
    "\n  mutation UpdateDoctorAppointmentLimit($doctor_id: String!, $appointmentLimit: Int!) {\n    updateDoctorAppointmentLimit(doctor_id: $doctor_id, appointmentLimit: $appointmentLimit)\n  }\n": typeof types.UpdateDoctorAppointmentLimitDocument,
    "\n  mutation RechargeAppointmentLimit($doctor_id: String!, $amount: Int!) {\n    rechargeAppointmentLimit(doctor_id: $doctor_id, amount: $amount)\n  }\n": typeof types.RechargeAppointmentLimitDocument,
    "\n  mutation AssignDoctorToClinics($doctorId: String!, $clinicIds: [String!]!) {\n    assignDoctorToClinics(doctorId: $doctorId, clinicIds: $clinicIds) {\n      doctor_id\n      profile {\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n        }\n      }\n    }\n  }\n": typeof types.AssignDoctorToClinicsDocument,
    "\nmutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {\n    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {\n        createdAt\n        doctor_id\n        updatedAt\n    }\n}\n": typeof types.UpdateProfilePicUrlDocument,
    "\n  mutation UpsertInpatientModuleSettings(\n    $input: UpsertInpatientModuleSettingsDTO!\n  ) {\n    upsertInpatientModuleSettings(input: $input) {\n      id\n      clinicId\n      wardBedTariffs\n      chargeHeads\n      packageTemplates\n      taxSettings\n      invoiceSettings\n      autoPostSettings\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpsertInpatientModuleSettingsDocument,
    "\n  mutation AddClinicStaff($input: AddClinicStaffInput!) {\n    addClinicStaff(input: $input) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      clinicId\n      isActive\n      createdAt\n    }\n  }\n": typeof types.AddClinicStaffDocument,
    "\n  mutation UpdateClinicStaff($input: UpdateClinicStaffInput!) {\n    updateClinicStaff(input: $input) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      isActive\n    }\n  }\n": typeof types.UpdateClinicStaffDocument,
    "\n  mutation RemoveClinicStaff($staffId: String!) {\n    removeClinicStaff(staffId: $staffId) {\n      id\n      firstName\n      lastName\n      phoneNumber\n    }\n  }\n": typeof types.RemoveClinicStaffDocument,
    "\n  mutation CreateSubscription($input: CreateSubscriptionDTO!) {\n    createSubscription(input: $input) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": typeof types.CreateSubscriptionDocument,
    "\n  mutation UpdateSubscription($input: UpdateSubscriptionDTO!) {\n    updateSubscription(input: $input) {\n      id\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": typeof types.UpdateSubscriptionDocument,
    "\n  mutation UpdateSubscriptionStatus($input: UpdateSubscriptionStatusDTO!) {\n    updateSubscriptionStatus(input: $input) {\n      id\n      status\n      startDate\n      endDate\n    }\n  }\n": typeof types.UpdateSubscriptionStatusDocument,
    "\n  query GetAllClinicFeatures {\n    getAllClinicFeatures {\n      id\n      value\n    }\n  }\n": typeof types.GetAllClinicFeaturesDocument,
    "\n  query GetClinicFeatures($clinicId: String!) {\n    getClinicFeatures(clinicId: $clinicId) {\n      id\n      value\n    }\n  }\n": typeof types.GetClinicFeaturesDocument,
    "\n  query GetClinicModuleSubscription($clinicId: String!, $moduleKey: String!) {\n    getClinicModuleSubscription(clinicId: $clinicId, moduleKey: $moduleKey) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": typeof types.GetClinicModuleSubscriptionDocument,
    "\n  query GetClinicModuleAccess($clinicId: String!, $moduleKey: String!) {\n    getClinicModuleAccess(clinicId: $clinicId, moduleKey: $moduleKey) {\n      moduleKey\n      enabled\n      status\n      startDate\n      endDate\n    }\n  }\n": typeof types.GetClinicModuleAccessDocument,
    "\nquery GetClinics {\n    getClinics {\n        about\n        business_id\n        city_name\n        closeTime\n        email\n        id\n        latitude\n        location\n        logoUrl\n        name\n        address {\n            city\n            country\n            line1\n            line2\n            pin\n            state\n        }\n        phone_number {\n            n\n            name\n        }\n        speciality {\n            name\n        }\n        workingDays\n        longitude\n        openTime\n    }\n}\n": typeof types.GetClinicsDocument,
    "\n  query GetCustomFeatures {\n    getCustomFeatures {\n      id\n      value\n    }\n  }\n": typeof types.GetCustomFeaturesDocument,
    "\n  query GetDoctor($doctor_id: String!) {\n    getDoctor(doctor_id: $doctor_id) {\n      doctor_id\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n": typeof types.GetDoctorDocument,
    "\nquery GetClinicDoctors($clinicId: String!) {\n    getClinicDoctors(clinicId: $clinicId) {\n        createdAt\n        doctor_id\n        updatedAt\n        isActive\n        profile {\n            personal {\n                designation\n                dob\n                email\n                first_name\n                gender\n                last_name\n                middle_name\n                phone_number\n                profile_pic\n            }\n            professional {\n                about\n                active\n                language {\n                    name\n                }\n                major_speciality {\n                    name\n                }\n                speciality {\n                    name\n                }\n                degree {\n                    branch_name\n                    college_name\n                    end_year\n                    name\n                    start_year\n                }\n            }\n        }\n    }\n}\n": typeof types.GetClinicDoctorsDocument,
    "\n  query GetDoctorAppointmentLimit($doctor_id: String!) {\n    getDoctorAppointmentLimit(doctor_id: $doctor_id)\n  }\n": typeof types.GetDoctorAppointmentLimitDocument,
    "\n  query GetDoctorSettings($doctor_id: String!) {\n    getDoctorSettings(doctor_id: $doctor_id) {\n      appointmentLimit\n      appointmentsUsed\n    }\n  }\n": typeof types.GetDoctorSettingsDocument,
    "\n  query GetDoctorClinicAccess($doctor_id: String!) {\n    getDoctor(doctor_id: $doctor_id) {\n      doctor_id\n      profile {\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetDoctorClinicAccessDocument,
    "\n  query GetDoctorsWithClinics {\n    getDoctors {\n      doctor_id\n      isActive\n      profile {\n        personal {\n          designation\n          first_name\n          last_name\n          phone_number\n        }\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n          major_speciality {\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetDoctorsWithClinicsDocument,
    "\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n": typeof types.GetAllDraftsDocument,
    "\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n": typeof types.ApproveOrRejectDocument,
    "\n  query GetInpatientModuleSettings($clinicId: String!) {\n    getInpatientModuleSettings(clinicId: $clinicId) {\n      id\n      clinicId\n      wardBedTariffs\n      chargeHeads\n      packageTemplates\n      taxSettings\n      invoiceSettings\n      autoPostSettings\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetInpatientModuleSettingsDocument,
    "\n  query GetClinicStaff($clinicId: String!) {\n    getClinicStaff(clinicId: $clinicId) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      clinicId\n      isActive\n      createdAt\n    }\n  }\n": typeof types.GetClinicStaffDocument,
    "\n  query GetSubscription($subscriptionId: String!) {\n    getSubscription(subscriptionId: $subscriptionId) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetSubscriptionDocument,
    "\n  query GetDoctorSubscription($doctorId: String!) {\n    getDoctorSubscription(doctorId: $doctorId) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetDoctorSubscriptionDocument,
};
const documents: Documents = {
    "\n  mutation CreateBusiness($businessInput: BusinessDTO!) {\n    createBusiness(businessInput: $businessInput) {\n      id\n      name\n    }\n  }\n": types.CreateBusinessDocument,
    "\n  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {\n    addClinic(businessId: $businessId, clinicInput: $clinicInput) {\n      about\n      business_id\n      city_name\n      closeTime\n      email\n      id\n      location\n      logoUrl\n      name\n      openTime\n      workingDays\n    }\n  }\n": types.AddClinicDocument,
    "\n  mutation AssignClinicFeatures($input: AssignClinicFeaturesDTO!) {\n    assignClinicFeatures(input: $input) {\n      id\n      name\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n": types.AssignClinicFeaturesDocument,
    "\n  mutation RemoveClinicFeatures($input: RemoveClinicFeaturesDTO!) {\n    removeClinicFeatures(input: $input) {\n      id\n      name\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n": types.RemoveClinicFeaturesDocument,
    "\n  mutation UpsertClinicModuleSubscription($input: UpsertClinicModuleSubscriptionDTO!) {\n    upsertClinicModuleSubscription(input: $input) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": types.UpsertClinicModuleSubscriptionDocument,
    "\n  mutation UpdateClinicModuleSubscriptionStatus($input: UpdateClinicModuleSubscriptionStatusDTO!) {\n    updateClinicModuleSubscriptionStatus(input: $input) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": types.UpdateClinicModuleSubscriptionStatusDocument,
    "\n  mutation AssignCustomFeaturesToDoctor($input: AssignCustomFeaturesDTO!) {\n    assignCustomFeaturesToDoctor(input: $input) {\n      doctor_id\n      profile {\n        personal {\n          first_name\n          last_name\n        }\n      }\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n": types.AssignCustomFeaturesToDoctorDocument,
    "\n  mutation RemoveCustomFeaturesFromDoctor($input: RemoveCustomFeaturesDTO!) {\n    removeCustomFeaturesFromDoctor(input: $input) {\n      doctor_id\n      customFeatures {\n        id\n        value\n      }\n      profile {\n        personal {\n          first_name\n          last_name\n        }\n      }\n    }\n  }\n": types.RemoveCustomFeaturesFromDoctorDocument,
    "\n  mutation AddDoctor(\n    $clinicIds: String!\n    $doctorInput: DoctorDTO!\n  ){\n    addDoctor(\n      doctorInput: $doctorInput\n      clinicIds: $clinicIds\n    ){\n      doctor_id\n    }\n  }\n": types.AddDoctorDocument,
    "\n  mutation UpdateDoctorAppointmentLimit($doctor_id: String!, $appointmentLimit: Int!) {\n    updateDoctorAppointmentLimit(doctor_id: $doctor_id, appointmentLimit: $appointmentLimit)\n  }\n": types.UpdateDoctorAppointmentLimitDocument,
    "\n  mutation RechargeAppointmentLimit($doctor_id: String!, $amount: Int!) {\n    rechargeAppointmentLimit(doctor_id: $doctor_id, amount: $amount)\n  }\n": types.RechargeAppointmentLimitDocument,
    "\n  mutation AssignDoctorToClinics($doctorId: String!, $clinicIds: [String!]!) {\n    assignDoctorToClinics(doctorId: $doctorId, clinicIds: $clinicIds) {\n      doctor_id\n      profile {\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n        }\n      }\n    }\n  }\n": types.AssignDoctorToClinicsDocument,
    "\nmutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {\n    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {\n        createdAt\n        doctor_id\n        updatedAt\n    }\n}\n": types.UpdateProfilePicUrlDocument,
    "\n  mutation UpsertInpatientModuleSettings(\n    $input: UpsertInpatientModuleSettingsDTO!\n  ) {\n    upsertInpatientModuleSettings(input: $input) {\n      id\n      clinicId\n      wardBedTariffs\n      chargeHeads\n      packageTemplates\n      taxSettings\n      invoiceSettings\n      autoPostSettings\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpsertInpatientModuleSettingsDocument,
    "\n  mutation AddClinicStaff($input: AddClinicStaffInput!) {\n    addClinicStaff(input: $input) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      clinicId\n      isActive\n      createdAt\n    }\n  }\n": types.AddClinicStaffDocument,
    "\n  mutation UpdateClinicStaff($input: UpdateClinicStaffInput!) {\n    updateClinicStaff(input: $input) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      isActive\n    }\n  }\n": types.UpdateClinicStaffDocument,
    "\n  mutation RemoveClinicStaff($staffId: String!) {\n    removeClinicStaff(staffId: $staffId) {\n      id\n      firstName\n      lastName\n      phoneNumber\n    }\n  }\n": types.RemoveClinicStaffDocument,
    "\n  mutation CreateSubscription($input: CreateSubscriptionDTO!) {\n    createSubscription(input: $input) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": types.CreateSubscriptionDocument,
    "\n  mutation UpdateSubscription($input: UpdateSubscriptionDTO!) {\n    updateSubscription(input: $input) {\n      id\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": types.UpdateSubscriptionDocument,
    "\n  mutation UpdateSubscriptionStatus($input: UpdateSubscriptionStatusDTO!) {\n    updateSubscriptionStatus(input: $input) {\n      id\n      status\n      startDate\n      endDate\n    }\n  }\n": types.UpdateSubscriptionStatusDocument,
    "\n  query GetAllClinicFeatures {\n    getAllClinicFeatures {\n      id\n      value\n    }\n  }\n": types.GetAllClinicFeaturesDocument,
    "\n  query GetClinicFeatures($clinicId: String!) {\n    getClinicFeatures(clinicId: $clinicId) {\n      id\n      value\n    }\n  }\n": types.GetClinicFeaturesDocument,
    "\n  query GetClinicModuleSubscription($clinicId: String!, $moduleKey: String!) {\n    getClinicModuleSubscription(clinicId: $clinicId, moduleKey: $moduleKey) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n": types.GetClinicModuleSubscriptionDocument,
    "\n  query GetClinicModuleAccess($clinicId: String!, $moduleKey: String!) {\n    getClinicModuleAccess(clinicId: $clinicId, moduleKey: $moduleKey) {\n      moduleKey\n      enabled\n      status\n      startDate\n      endDate\n    }\n  }\n": types.GetClinicModuleAccessDocument,
    "\nquery GetClinics {\n    getClinics {\n        about\n        business_id\n        city_name\n        closeTime\n        email\n        id\n        latitude\n        location\n        logoUrl\n        name\n        address {\n            city\n            country\n            line1\n            line2\n            pin\n            state\n        }\n        phone_number {\n            n\n            name\n        }\n        speciality {\n            name\n        }\n        workingDays\n        longitude\n        openTime\n    }\n}\n": types.GetClinicsDocument,
    "\n  query GetCustomFeatures {\n    getCustomFeatures {\n      id\n      value\n    }\n  }\n": types.GetCustomFeaturesDocument,
    "\n  query GetDoctor($doctor_id: String!) {\n    getDoctor(doctor_id: $doctor_id) {\n      doctor_id\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n": types.GetDoctorDocument,
    "\nquery GetClinicDoctors($clinicId: String!) {\n    getClinicDoctors(clinicId: $clinicId) {\n        createdAt\n        doctor_id\n        updatedAt\n        isActive\n        profile {\n            personal {\n                designation\n                dob\n                email\n                first_name\n                gender\n                last_name\n                middle_name\n                phone_number\n                profile_pic\n            }\n            professional {\n                about\n                active\n                language {\n                    name\n                }\n                major_speciality {\n                    name\n                }\n                speciality {\n                    name\n                }\n                degree {\n                    branch_name\n                    college_name\n                    end_year\n                    name\n                    start_year\n                }\n            }\n        }\n    }\n}\n": types.GetClinicDoctorsDocument,
    "\n  query GetDoctorAppointmentLimit($doctor_id: String!) {\n    getDoctorAppointmentLimit(doctor_id: $doctor_id)\n  }\n": types.GetDoctorAppointmentLimitDocument,
    "\n  query GetDoctorSettings($doctor_id: String!) {\n    getDoctorSettings(doctor_id: $doctor_id) {\n      appointmentLimit\n      appointmentsUsed\n    }\n  }\n": types.GetDoctorSettingsDocument,
    "\n  query GetDoctorClinicAccess($doctor_id: String!) {\n    getDoctor(doctor_id: $doctor_id) {\n      doctor_id\n      profile {\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n        }\n      }\n    }\n  }\n": types.GetDoctorClinicAccessDocument,
    "\n  query GetDoctorsWithClinics {\n    getDoctors {\n      doctor_id\n      isActive\n      profile {\n        personal {\n          designation\n          first_name\n          last_name\n          phone_number\n        }\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n          major_speciality {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetDoctorsWithClinicsDocument,
    "\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n": types.GetAllDraftsDocument,
    "\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n": types.ApproveOrRejectDocument,
    "\n  query GetInpatientModuleSettings($clinicId: String!) {\n    getInpatientModuleSettings(clinicId: $clinicId) {\n      id\n      clinicId\n      wardBedTariffs\n      chargeHeads\n      packageTemplates\n      taxSettings\n      invoiceSettings\n      autoPostSettings\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetInpatientModuleSettingsDocument,
    "\n  query GetClinicStaff($clinicId: String!) {\n    getClinicStaff(clinicId: $clinicId) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      clinicId\n      isActive\n      createdAt\n    }\n  }\n": types.GetClinicStaffDocument,
    "\n  query GetSubscription($subscriptionId: String!) {\n    getSubscription(subscriptionId: $subscriptionId) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetSubscriptionDocument,
    "\n  query GetDoctorSubscription($doctorId: String!) {\n    getDoctorSubscription(doctorId: $doctorId) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetDoctorSubscriptionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBusiness($businessInput: BusinessDTO!) {\n    createBusiness(businessInput: $businessInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBusiness($businessInput: BusinessDTO!) {\n    createBusiness(businessInput: $businessInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {\n    addClinic(businessId: $businessId, clinicInput: $clinicInput) {\n      about\n      business_id\n      city_name\n      closeTime\n      email\n      id\n      location\n      logoUrl\n      name\n      openTime\n      workingDays\n    }\n  }\n"): (typeof documents)["\n  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {\n    addClinic(businessId: $businessId, clinicInput: $clinicInput) {\n      about\n      business_id\n      city_name\n      closeTime\n      email\n      id\n      location\n      logoUrl\n      name\n      openTime\n      workingDays\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AssignClinicFeatures($input: AssignClinicFeaturesDTO!) {\n    assignClinicFeatures(input: $input) {\n      id\n      name\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AssignClinicFeatures($input: AssignClinicFeaturesDTO!) {\n    assignClinicFeatures(input: $input) {\n      id\n      name\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveClinicFeatures($input: RemoveClinicFeaturesDTO!) {\n    removeClinicFeatures(input: $input) {\n      id\n      name\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveClinicFeatures($input: RemoveClinicFeaturesDTO!) {\n    removeClinicFeatures(input: $input) {\n      id\n      name\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpsertClinicModuleSubscription($input: UpsertClinicModuleSubscriptionDTO!) {\n    upsertClinicModuleSubscription(input: $input) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertClinicModuleSubscription($input: UpsertClinicModuleSubscriptionDTO!) {\n    upsertClinicModuleSubscription(input: $input) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateClinicModuleSubscriptionStatus($input: UpdateClinicModuleSubscriptionStatusDTO!) {\n    updateClinicModuleSubscriptionStatus(input: $input) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateClinicModuleSubscriptionStatus($input: UpdateClinicModuleSubscriptionStatusDTO!) {\n    updateClinicModuleSubscriptionStatus(input: $input) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AssignCustomFeaturesToDoctor($input: AssignCustomFeaturesDTO!) {\n    assignCustomFeaturesToDoctor(input: $input) {\n      doctor_id\n      profile {\n        personal {\n          first_name\n          last_name\n        }\n      }\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AssignCustomFeaturesToDoctor($input: AssignCustomFeaturesDTO!) {\n    assignCustomFeaturesToDoctor(input: $input) {\n      doctor_id\n      profile {\n        personal {\n          first_name\n          last_name\n        }\n      }\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCustomFeaturesFromDoctor($input: RemoveCustomFeaturesDTO!) {\n    removeCustomFeaturesFromDoctor(input: $input) {\n      doctor_id\n      customFeatures {\n        id\n        value\n      }\n      profile {\n        personal {\n          first_name\n          last_name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCustomFeaturesFromDoctor($input: RemoveCustomFeaturesDTO!) {\n    removeCustomFeaturesFromDoctor(input: $input) {\n      doctor_id\n      customFeatures {\n        id\n        value\n      }\n      profile {\n        personal {\n          first_name\n          last_name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddDoctor(\n    $clinicIds: String!\n    $doctorInput: DoctorDTO!\n  ){\n    addDoctor(\n      doctorInput: $doctorInput\n      clinicIds: $clinicIds\n    ){\n      doctor_id\n    }\n  }\n"): (typeof documents)["\n  mutation AddDoctor(\n    $clinicIds: String!\n    $doctorInput: DoctorDTO!\n  ){\n    addDoctor(\n      doctorInput: $doctorInput\n      clinicIds: $clinicIds\n    ){\n      doctor_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDoctorAppointmentLimit($doctor_id: String!, $appointmentLimit: Int!) {\n    updateDoctorAppointmentLimit(doctor_id: $doctor_id, appointmentLimit: $appointmentLimit)\n  }\n"): (typeof documents)["\n  mutation UpdateDoctorAppointmentLimit($doctor_id: String!, $appointmentLimit: Int!) {\n    updateDoctorAppointmentLimit(doctor_id: $doctor_id, appointmentLimit: $appointmentLimit)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RechargeAppointmentLimit($doctor_id: String!, $amount: Int!) {\n    rechargeAppointmentLimit(doctor_id: $doctor_id, amount: $amount)\n  }\n"): (typeof documents)["\n  mutation RechargeAppointmentLimit($doctor_id: String!, $amount: Int!) {\n    rechargeAppointmentLimit(doctor_id: $doctor_id, amount: $amount)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AssignDoctorToClinics($doctorId: String!, $clinicIds: [String!]!) {\n    assignDoctorToClinics(doctorId: $doctorId, clinicIds: $clinicIds) {\n      doctor_id\n      profile {\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AssignDoctorToClinics($doctorId: String!, $clinicIds: [String!]!) {\n    assignDoctorToClinics(doctorId: $doctorId, clinicIds: $clinicIds) {\n      doctor_id\n      profile {\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {\n    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {\n        createdAt\n        doctor_id\n        updatedAt\n    }\n}\n"): (typeof documents)["\nmutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {\n    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {\n        createdAt\n        doctor_id\n        updatedAt\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpsertInpatientModuleSettings(\n    $input: UpsertInpatientModuleSettingsDTO!\n  ) {\n    upsertInpatientModuleSettings(input: $input) {\n      id\n      clinicId\n      wardBedTariffs\n      chargeHeads\n      packageTemplates\n      taxSettings\n      invoiceSettings\n      autoPostSettings\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertInpatientModuleSettings(\n    $input: UpsertInpatientModuleSettingsDTO!\n  ) {\n    upsertInpatientModuleSettings(input: $input) {\n      id\n      clinicId\n      wardBedTariffs\n      chargeHeads\n      packageTemplates\n      taxSettings\n      invoiceSettings\n      autoPostSettings\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddClinicStaff($input: AddClinicStaffInput!) {\n    addClinicStaff(input: $input) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      clinicId\n      isActive\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddClinicStaff($input: AddClinicStaffInput!) {\n    addClinicStaff(input: $input) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      clinicId\n      isActive\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateClinicStaff($input: UpdateClinicStaffInput!) {\n    updateClinicStaff(input: $input) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      isActive\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateClinicStaff($input: UpdateClinicStaffInput!) {\n    updateClinicStaff(input: $input) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveClinicStaff($staffId: String!) {\n    removeClinicStaff(staffId: $staffId) {\n      id\n      firstName\n      lastName\n      phoneNumber\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveClinicStaff($staffId: String!) {\n    removeClinicStaff(staffId: $staffId) {\n      id\n      firstName\n      lastName\n      phoneNumber\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSubscription($input: CreateSubscriptionDTO!) {\n    createSubscription(input: $input) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSubscription($input: CreateSubscriptionDTO!) {\n    createSubscription(input: $input) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSubscription($input: UpdateSubscriptionDTO!) {\n    updateSubscription(input: $input) {\n      id\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSubscription($input: UpdateSubscriptionDTO!) {\n    updateSubscription(input: $input) {\n      id\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSubscriptionStatus($input: UpdateSubscriptionStatusDTO!) {\n    updateSubscriptionStatus(input: $input) {\n      id\n      status\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSubscriptionStatus($input: UpdateSubscriptionStatusDTO!) {\n    updateSubscriptionStatus(input: $input) {\n      id\n      status\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllClinicFeatures {\n    getAllClinicFeatures {\n      id\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetAllClinicFeatures {\n    getAllClinicFeatures {\n      id\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClinicFeatures($clinicId: String!) {\n    getClinicFeatures(clinicId: $clinicId) {\n      id\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetClinicFeatures($clinicId: String!) {\n    getClinicFeatures(clinicId: $clinicId) {\n      id\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClinicModuleSubscription($clinicId: String!, $moduleKey: String!) {\n    getClinicModuleSubscription(clinicId: $clinicId, moduleKey: $moduleKey) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"): (typeof documents)["\n  query GetClinicModuleSubscription($clinicId: String!, $moduleKey: String!) {\n    getClinicModuleSubscription(clinicId: $clinicId, moduleKey: $moduleKey) {\n      id\n      clinicId\n      moduleKey\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClinicModuleAccess($clinicId: String!, $moduleKey: String!) {\n    getClinicModuleAccess(clinicId: $clinicId, moduleKey: $moduleKey) {\n      moduleKey\n      enabled\n      status\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  query GetClinicModuleAccess($clinicId: String!, $moduleKey: String!) {\n    getClinicModuleAccess(clinicId: $clinicId, moduleKey: $moduleKey) {\n      moduleKey\n      enabled\n      status\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetClinics {\n    getClinics {\n        about\n        business_id\n        city_name\n        closeTime\n        email\n        id\n        latitude\n        location\n        logoUrl\n        name\n        address {\n            city\n            country\n            line1\n            line2\n            pin\n            state\n        }\n        phone_number {\n            n\n            name\n        }\n        speciality {\n            name\n        }\n        workingDays\n        longitude\n        openTime\n    }\n}\n"): (typeof documents)["\nquery GetClinics {\n    getClinics {\n        about\n        business_id\n        city_name\n        closeTime\n        email\n        id\n        latitude\n        location\n        logoUrl\n        name\n        address {\n            city\n            country\n            line1\n            line2\n            pin\n            state\n        }\n        phone_number {\n            n\n            name\n        }\n        speciality {\n            name\n        }\n        workingDays\n        longitude\n        openTime\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCustomFeatures {\n    getCustomFeatures {\n      id\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetCustomFeatures {\n    getCustomFeatures {\n      id\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDoctor($doctor_id: String!) {\n    getDoctor(doctor_id: $doctor_id) {\n      doctor_id\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDoctor($doctor_id: String!) {\n    getDoctor(doctor_id: $doctor_id) {\n      doctor_id\n      customFeatures {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetClinicDoctors($clinicId: String!) {\n    getClinicDoctors(clinicId: $clinicId) {\n        createdAt\n        doctor_id\n        updatedAt\n        isActive\n        profile {\n            personal {\n                designation\n                dob\n                email\n                first_name\n                gender\n                last_name\n                middle_name\n                phone_number\n                profile_pic\n            }\n            professional {\n                about\n                active\n                language {\n                    name\n                }\n                major_speciality {\n                    name\n                }\n                speciality {\n                    name\n                }\n                degree {\n                    branch_name\n                    college_name\n                    end_year\n                    name\n                    start_year\n                }\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery GetClinicDoctors($clinicId: String!) {\n    getClinicDoctors(clinicId: $clinicId) {\n        createdAt\n        doctor_id\n        updatedAt\n        isActive\n        profile {\n            personal {\n                designation\n                dob\n                email\n                first_name\n                gender\n                last_name\n                middle_name\n                phone_number\n                profile_pic\n            }\n            professional {\n                about\n                active\n                language {\n                    name\n                }\n                major_speciality {\n                    name\n                }\n                speciality {\n                    name\n                }\n                degree {\n                    branch_name\n                    college_name\n                    end_year\n                    name\n                    start_year\n                }\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDoctorAppointmentLimit($doctor_id: String!) {\n    getDoctorAppointmentLimit(doctor_id: $doctor_id)\n  }\n"): (typeof documents)["\n  query GetDoctorAppointmentLimit($doctor_id: String!) {\n    getDoctorAppointmentLimit(doctor_id: $doctor_id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDoctorSettings($doctor_id: String!) {\n    getDoctorSettings(doctor_id: $doctor_id) {\n      appointmentLimit\n      appointmentsUsed\n    }\n  }\n"): (typeof documents)["\n  query GetDoctorSettings($doctor_id: String!) {\n    getDoctorSettings(doctor_id: $doctor_id) {\n      appointmentLimit\n      appointmentsUsed\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDoctorClinicAccess($doctor_id: String!) {\n    getDoctor(doctor_id: $doctor_id) {\n      doctor_id\n      profile {\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDoctorClinicAccess($doctor_id: String!) {\n    getDoctor(doctor_id: $doctor_id) {\n      doctor_id\n      profile {\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDoctorsWithClinics {\n    getDoctors {\n      doctor_id\n      isActive\n      profile {\n        personal {\n          designation\n          first_name\n          last_name\n          phone_number\n        }\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n          major_speciality {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDoctorsWithClinics {\n    getDoctors {\n      doctor_id\n      isActive\n      profile {\n        personal {\n          designation\n          first_name\n          last_name\n          phone_number\n        }\n        professional {\n          clinic {\n            id\n            name\n            business_id\n          }\n          major_speciality {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n"): (typeof documents)["\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n"): (typeof documents)["\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetInpatientModuleSettings($clinicId: String!) {\n    getInpatientModuleSettings(clinicId: $clinicId) {\n      id\n      clinicId\n      wardBedTariffs\n      chargeHeads\n      packageTemplates\n      taxSettings\n      invoiceSettings\n      autoPostSettings\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetInpatientModuleSettings($clinicId: String!) {\n    getInpatientModuleSettings(clinicId: $clinicId) {\n      id\n      clinicId\n      wardBedTariffs\n      chargeHeads\n      packageTemplates\n      taxSettings\n      invoiceSettings\n      autoPostSettings\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClinicStaff($clinicId: String!) {\n    getClinicStaff(clinicId: $clinicId) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      clinicId\n      isActive\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetClinicStaff($clinicId: String!) {\n    getClinicStaff(clinicId: $clinicId) {\n      id\n      firstName\n      lastName\n      phoneNumber\n      staffRole\n      permissions\n      clinicId\n      isActive\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSubscription($subscriptionId: String!) {\n    getSubscription(subscriptionId: $subscriptionId) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetSubscription($subscriptionId: String!) {\n    getSubscription(subscriptionId: $subscriptionId) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDoctorSubscription($doctorId: String!) {\n    getDoctorSubscription(doctorId: $doctorId) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetDoctorSubscription($doctorId: String!) {\n    getDoctorSubscription(doctorId: $doctorId) {\n      id\n      doctorId\n      status\n      startDate\n      endDate\n      trialStartDate\n      trialEndDate\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;