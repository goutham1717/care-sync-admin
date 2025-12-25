import { gql } from "@apollo/client";

export const GET_CUSTOM_FEATURES = gql`
  query GetCustomFeatures {
    getCustomFeatures {
      id
      value
    }
  }
`;

export const GET_DOCTOR = gql`
  query GetDoctor($doctor_id: String!) {
    getDoctor(doctor_id: $doctor_id) {
      doctor_id
      customFeatures {
        id
        value
      }
    }
  }
`;

