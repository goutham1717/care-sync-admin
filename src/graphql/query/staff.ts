import { gql } from "@apollo/client";

export const GET_CLINIC_STAFF = gql`
  query GetClinicStaff($clinicId: String!) {
    getClinicStaff(clinicId: $clinicId) {
      id
      firstName
      lastName
      phoneNumber
      staffRole
      permissions
      clinicId
      isActive
      createdAt
    }
  }
`;
