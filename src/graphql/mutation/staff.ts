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

export const UPDATE_STAFF_PERMISSIONS = gql`
  mutation UpdateStaffPermissions($input: UpdateStaffPermissionsInput!) {
    updateStaffPermissions(input: $input) {
      id
      firstName
      lastName
      staffRole
      permissions
      isActive
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
  mutation RemoveClinicStaff($staffId: String!, $clinicId: String!) {
    removeClinicStaff(staffId: $staffId, clinicId: $clinicId) {
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;
