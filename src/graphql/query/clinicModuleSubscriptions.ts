import { gql } from "@apollo/client";

export const GET_CLINIC_MODULE_SUBSCRIPTION = gql`
  query GetClinicModuleSubscription($clinicId: String!, $moduleKey: String!) {
    getClinicModuleSubscription(clinicId: $clinicId, moduleKey: $moduleKey) {
      id
      clinicId
      moduleKey
      status
      startDate
      endDate
      trialStartDate
      trialEndDate
    }
  }
`;

export const GET_CLINIC_MODULE_ACCESS = gql`
  query GetClinicModuleAccess($clinicId: String!, $moduleKey: String!) {
    getClinicModuleAccess(clinicId: $clinicId, moduleKey: $moduleKey) {
      moduleKey
      enabled
      status
      startDate
      endDate
    }
  }
`;
