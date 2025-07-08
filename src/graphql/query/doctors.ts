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