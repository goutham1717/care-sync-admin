import { gql } from "@apollo/client";

export const ADD_CLINIC_STAFF = gql`
  mutation AddClinicStaff($input: AddClinicStaffInput!) {
    addClinicStaff(input: $input) {
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

export const UPDATE_CLINIC_STAFF = gql`
  mutation UpdateClinicStaff($input: UpdateClinicStaffInput!) {
    updateClinicStaff(input: $input) {
      id
      firstName
      lastName
      phoneNumber
      staffRole
      permissions
      isActive
    }
  }
`;

export const REMOVE_CLINIC_STAFF = gql`
  mutation RemoveClinicStaff($staffId: String!) {
    removeClinicStaff(staffId: $staffId) {
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;
