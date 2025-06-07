import { gql } from "@apollo/client";


export const GET_CLINICS = gql`
query GetClinics {
    getClinics {
        about
        business_id
        city_name
        closeTime
        email
        id
        latitude
        location
        logoUrl
        name
        address {
            city
            country
            line1
            line2
            pin
            state
        }
        phone_number {
            n
            name
        }
        speciality {
            name
        }
        workingDays
        longitude
        openTime
    }
}
`