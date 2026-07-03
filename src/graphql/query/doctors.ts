import { gql } from "@apollo/client";
export const GET_CLINIC_DOCTORS = gql`
query GetClinicDoctors($clinicId: String!) {
    getClinicDoctors(clinicId: $clinicId) {
        createdAt
        doctor_id
        updatedAt
        isActive
        profile {
            personal {
                designation
                dob
                email
                first_name
                gender
                last_name
                middle_name
                phone_number
                profile_pic
            }
            professional {
                about
                active
                language {
                    name
                }
                major_speciality {
                    name
                }
                speciality {
                    name
                }
                degree {
                    branch_name
                    college_name
                    end_year
                    name
                    start_year
                }
            }
        }
    }
}
`;

export const GET_DOCTOR_APPOINTMENT_LIMIT = gql`
  query GetDoctorAppointmentLimit($doctor_id: String!) {
    getDoctorAppointmentLimit(doctor_id: $doctor_id)
  }
`;

export const GET_DOCTOR_SETTINGS = gql`
  query GetDoctorSettings($doctor_id: String!) {
    getDoctorSettings(doctor_id: $doctor_id) {
      appointmentLimit
      appointmentsUsed
    }
  }
`;

export const GET_DOCTOR_CLINIC_ACCESS = gql`
  query GetDoctorClinicAccess($doctor_id: String!) {
    getDoctor(doctor_id: $doctor_id) {
      doctor_id
      profile {
        professional {
          clinic {
            id
            name
            business_id
          }
        }
      }
    }
  }
`;

export const GET_DOCTORS_WITH_CLINICS = gql`
  query GetDoctorsWithClinics {
    getDoctors {
      doctor_id
      isActive
      profile {
        personal {
          designation
          first_name
          last_name
          phone_number
        }
        professional {
          clinic {
            id
            name
            business_id
          }
          major_speciality {
            name
          }
        }
      }
    }
  }
`;
