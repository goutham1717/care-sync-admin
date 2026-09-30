import { gql } from '@apollo/client';

export const GET_INVENTORY_LOGINS = gql`
  query GetInventoryLogins($clinicId: String!) {
    getInventoryLogins(clinicId: $clinicId) {
      id
      username
      clinicId
      clinicName
      isActive
      mustChangePassword
      createdAt
    }
  }
`;
