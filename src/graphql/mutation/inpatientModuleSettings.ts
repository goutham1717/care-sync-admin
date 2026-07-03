import { gql } from "@apollo/client";

export const UPSERT_INPATIENT_MODULE_SETTINGS = gql`
  mutation UpsertInpatientModuleSettings(
    $input: UpsertInpatientModuleSettingsDTO!
  ) {
    upsertInpatientModuleSettings(input: $input) {
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
