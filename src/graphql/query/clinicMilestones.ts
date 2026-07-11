import { gql } from "@apollo/client";

export const GET_CLINIC_MILESTONES = gql`
  query GetClinicMilestones($clinicId: String!) {
    getClinicMilestones(clinicId: $clinicId) {
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

export const GET_CLINIC_MILESTONE_PROGRESS = gql`
  query GetClinicMilestoneProgress($clinicId: String!) {
    getClinicMilestoneProgress(clinicId: $clinicId) {
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
      currentProgress
      achievedCount
      remainingToUnlock
      isCompleted
      progressPercent
      windowStatus
      daysRemaining
      daysUntilStart
      latestRewardedAt
    }
  }
`;
