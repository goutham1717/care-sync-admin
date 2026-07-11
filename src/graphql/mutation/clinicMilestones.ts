import { gql } from "@apollo/client";

export const CREATE_CLINIC_MILESTONE = gql`
  mutation CreateClinicMilestone($input: CreateClinicMilestoneDTO!) {
    createClinicMilestone(input: $input) {
      id
      clinicId
      title
      description
      startDate
      endDate
      metricType
      targetValue
      rewardType
      rewardValue
      isActive
      repeatable
      sortOrder
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CLINIC_MILESTONE = gql`
  mutation UpdateClinicMilestone($input: UpdateClinicMilestoneDTO!) {
    updateClinicMilestone(input: $input) {
      id
      clinicId
      title
      description
      startDate
      endDate
      metricType
      targetValue
      rewardType
      rewardValue
      isActive
      repeatable
      sortOrder
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CLINIC_MILESTONE = gql`
  mutation DeleteClinicMilestone($milestoneId: String!) {
    deleteClinicMilestone(milestoneId: $milestoneId)
  }
`;

export const EVALUATE_CLINIC_MILESTONES = gql`
  mutation EvaluateClinicMilestones($clinicId: String!) {
    evaluateClinicMilestones(clinicId: $clinicId) {
      id
      clinicId
      milestoneId
      sequence
      progressValue
      status
      rewardPayload
      errorMessage
      achievedAt
      rewardedAt
    }
  }
`;
