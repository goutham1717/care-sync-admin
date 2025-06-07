import { gql } from "@apollo/client";

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness($businessInput: BusinessDTO!) {
    createBusiness(businessInput: $businessInput) {
      id
      name
    }
  }
`;