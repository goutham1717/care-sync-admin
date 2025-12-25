import { gql } from "@apollo/client";

export const ASSIGN_CLINIC_FEATURES = gql`
  mutation AssignClinicFeatures($input: AssignClinicFeaturesDTO!) {
    assignClinicFeatures(input: $input) {
      id
      name
      customFeatures {
        id
        value
      }
    }
  }
`;

export const REMOVE_CLINIC_FEATURES = gql`
  mutation RemoveClinicFeatures($input: RemoveClinicFeaturesDTO!) {
    removeClinicFeatures(input: $input) {
      id
      name
      customFeatures {
        id
        value
      }
    }
  }
`;

