import { gql } from "@apollo/client";

export const GET_SUBSCRIPTION = gql`
  query GetSubscription($subscriptionId: String!) {
    getSubscription(subscriptionId: $subscriptionId) {
      id
      doctorId
      status
      startDate
      endDate
      trialStartDate
      trialEndDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_DOCTOR_SUBSCRIPTION = gql`
  query GetDoctorSubscription($doctorId: String!) {
    getDoctorSubscription(doctorId: $doctorId) {
      id
      doctorId
      status
      startDate
      endDate
      trialStartDate
      trialEndDate
      createdAt
      updatedAt
    }
  }
`;

