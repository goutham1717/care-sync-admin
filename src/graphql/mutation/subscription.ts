import { gql } from "@apollo/client";

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($input: CreateSubscriptionDTO!) {
    createSubscription(input: $input) {
      id
      doctorId
      status
      startDate
      endDate
      trialStartDate
      trialEndDate
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription($input: UpdateSubscriptionDTO!) {
    updateSubscription(input: $input) {
      id
      status
      startDate
      endDate
      trialStartDate
      trialEndDate
    }
  }
`;

export const UPDATE_SUBSCRIPTION_STATUS = gql`
  mutation UpdateSubscriptionStatus($input: UpdateSubscriptionStatusDTO!) {
    updateSubscriptionStatus(input: $input) {
      id
      status
      startDate
      endDate
    }
  }
`;

