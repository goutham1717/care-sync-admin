import { gql } from '@apollo/client';

export const CREATE_INVENTORY_LOGIN = gql`
  mutation CreateInventoryLogin($input: CreateInventoryLoginDTO!) {
    createInventoryLogin(input: $input) {
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

export const UPDATE_INVENTORY_LOGIN_STATUS = gql`
  mutation UpdateInventoryLoginStatus($input: UpdateInventoryLoginStatusDTO!) {
    updateInventoryLoginStatus(input: $input) {
      id
      isActive
    }
  }
`;
