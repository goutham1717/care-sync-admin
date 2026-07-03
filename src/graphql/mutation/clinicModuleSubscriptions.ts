import { gql } from "@apollo/client";

export const UPSERT_CLINIC_MODULE_SUBSCRIPTION = gql`
  mutation UpsertClinicModuleSubscription($input: UpsertClinicModuleSubscriptionDTO!) {
    upsertClinicModuleSubscription(input: $input) {
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

export const UPDATE_CLINIC_MODULE_SUBSCRIPTION_STATUS = gql`
  mutation UpdateClinicModuleSubscriptionStatus($input: UpdateClinicModuleSubscriptionStatusDTO!) {
    updateClinicModuleSubscriptionStatus(input: $input) {
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
