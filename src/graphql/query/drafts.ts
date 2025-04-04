
import { gql } from "../../../node_modules/@apollo/client/index";
export const GET_DRAFTS = gql`
query GetAllDrafts {
    getAllDrafts {
        clinicName
        doctorName
        id
        name
        type
    }
}
`

export const APPROVE_OR_REJECT = gql`
query ApproveOrReject($id: String!, $status: String!) {
    approveOrReject(id: $id, status: $status)
}

`