import { gql } from "@apollo/client";

export const ADD_CLINIC = gql`
  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {
    addClinic(businessId: $businessId, clinicInput: $clinicInput) {
      about
      business_id
      city_name
      closeTime
      email
      id
      location
      logoUrl
      name
      openTime
      workingDays
    }
  }
`; 