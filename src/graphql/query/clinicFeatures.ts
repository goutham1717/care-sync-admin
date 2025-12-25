import { gql } from "@apollo/client";

export const GET_ALL_CLINIC_FEATURES = gql`
  query GetAllClinicFeatures {
    getAllClinicFeatures {
      id
      value
    }
  }
`;

export const GET_CLINIC_FEATURES = gql`
  query GetClinicFeatures($clinicId: String!) {
    getClinicFeatures(clinicId: $clinicId) {
      id
      value
    }
  }
`;

