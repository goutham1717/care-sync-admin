import { gql } from "@apollo/client";

export const GET_INPATIENT_MODULE_SETTINGS = gql`
  query GetInpatientModuleSettings($clinicId: String!) {
    getInpatientModuleSettings(clinicId: $clinicId) {
      id
      clinicId
      wardBedTariffs
      chargeHeads
      packageTemplates
      taxSettings
      invoiceSettings
      autoPostSettings
      createdAt
      updatedAt
    }
  }
`;
