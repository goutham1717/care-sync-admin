import { gql } from "@apollo/client";


export const ADD_DOCTOR_TO_CLINIC = gql`
  mutation AddDoctor(
    $clinicIds: String!
    $doctorInput: DoctorDTO!
  ){
    addDoctor(
      doctorInput: $doctorInput
      clinicIds: $clinicIds
    ){
      doctor_id
    }
  }
`;

export const UPDATE_DOCTOR_APPOINTMENT_LIMIT = gql`
  mutation UpdateDoctorAppointmentLimit($doctor_id: String!, $appointmentLimit: Int!) {
    updateDoctorAppointmentLimit(doctor_id: $doctor_id, appointmentLimit: $appointmentLimit)
  }
`;

export const RECHARGE_APPOINTMENT_LIMIT = gql`
  mutation RechargeAppointmentLimit($doctor_id: String!, $amount: Int!) {
    rechargeAppointmentLimit(doctor_id: $doctor_id, amount: $amount)
  }
`;

export const UPDATE_PROFILE_PICTURE_URL = gql`
mutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {
    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {
        createdAt
        doctor_id
        updatedAt
    }
}
`