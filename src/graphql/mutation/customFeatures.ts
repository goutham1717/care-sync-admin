import { gql } from "@apollo/client";

export const ASSIGN_CUSTOM_FEATURES_TO_DOCTOR = gql`
  mutation AssignCustomFeaturesToDoctor($input: AssignCustomFeaturesDTO!) {
    assignCustomFeaturesToDoctor(input: $input) {
      doctor_id
      profile {
        personal {
          first_name
          last_name
        }
      }
      customFeatures {
        id
        value
      }
    }
  }
`;

export const REMOVE_CUSTOM_FEATURES_FROM_DOCTOR = gql`
  mutation RemoveCustomFeaturesFromDoctor($input: RemoveCustomFeaturesDTO!) {
    removeCustomFeaturesFromDoctor(input: $input) {
      doctor_id
      customFeatures {
        id
        value
      }
      profile {
        personal {
          first_name
          last_name
        }
      }
    }
  }
`;

