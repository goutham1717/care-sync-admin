/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateBusiness($businessInput: BusinessDTO!) {\n    createBusiness(businessInput: $businessInput) {\n      id\n      name\n    }\n  }\n": typeof types.CreateBusinessDocument,
    "\n  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {\n    addClinic(businessId: $businessId, clinicInput: $clinicInput) {\n      about\n      business_id\n      city_name\n      closeTime\n      email\n      id\n      location\n      logoUrl\n      name\n      openTime\n      workingDays\n    }\n  }\n": typeof types.AddClinicDocument,
    "\n  mutation AddDoctor(\n    $clinicIds: String!\n    $doctorInput: DoctorDTO!\n  ){\n    addDoctor(\n      doctorInput: $doctorInput\n      clinicIds: $clinicIds\n    ){\n      doctor_id\n    }\n  }\n": typeof types.AddDoctorDocument,
    "\nmutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {\n    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {\n        createdAt\n        doctor_id\n        updatedAt\n    }\n}\n": typeof types.UpdateProfilePicUrlDocument,
    "\nquery GetClinics {\n    getClinics {\n        about\n        business_id\n        city_name\n        closeTime\n        email\n        id\n        latitude\n        location\n        logoUrl\n        name\n        address {\n            city\n            country\n            line1\n            line2\n            pin\n            state\n        }\n        phone_number {\n            n\n            name\n        }\n        speciality {\n            name\n        }\n        workingDays\n        longitude\n        openTime\n    }\n}\n": typeof types.GetClinicsDocument,
    "\nquery GetClinicDoctors($clinicId: String!) {\n    getClinicDoctors(clinicId: $clinicId) {\n        createdAt\n        doctor_id\n        updatedAt\n        isActive\n        profile {\n            personal {\n                designation\n                dob\n                email\n                first_name\n                gender\n                last_name\n                middle_name\n                phone_number\n                profile_pic\n            }\n            professional {\n                about\n                active\n                language {\n                    name\n                }\n                major_speciality {\n                    name\n                }\n                speciality {\n                    name\n                }\n                degree {\n                    branch_name\n                    college_name\n                    end_year\n                    name\n                    start_year\n                }\n            }\n        }\n    }\n}\n": typeof types.GetClinicDoctorsDocument,
    "\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n": typeof types.GetAllDraftsDocument,
    "\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n": typeof types.ApproveOrRejectDocument,
};
const documents: Documents = {
    "\n  mutation CreateBusiness($businessInput: BusinessDTO!) {\n    createBusiness(businessInput: $businessInput) {\n      id\n      name\n    }\n  }\n": types.CreateBusinessDocument,
    "\n  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {\n    addClinic(businessId: $businessId, clinicInput: $clinicInput) {\n      about\n      business_id\n      city_name\n      closeTime\n      email\n      id\n      location\n      logoUrl\n      name\n      openTime\n      workingDays\n    }\n  }\n": types.AddClinicDocument,
    "\n  mutation AddDoctor(\n    $clinicIds: String!\n    $doctorInput: DoctorDTO!\n  ){\n    addDoctor(\n      doctorInput: $doctorInput\n      clinicIds: $clinicIds\n    ){\n      doctor_id\n    }\n  }\n": types.AddDoctorDocument,
    "\nmutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {\n    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {\n        createdAt\n        doctor_id\n        updatedAt\n    }\n}\n": types.UpdateProfilePicUrlDocument,
    "\nquery GetClinics {\n    getClinics {\n        about\n        business_id\n        city_name\n        closeTime\n        email\n        id\n        latitude\n        location\n        logoUrl\n        name\n        address {\n            city\n            country\n            line1\n            line2\n            pin\n            state\n        }\n        phone_number {\n            n\n            name\n        }\n        speciality {\n            name\n        }\n        workingDays\n        longitude\n        openTime\n    }\n}\n": types.GetClinicsDocument,
    "\nquery GetClinicDoctors($clinicId: String!) {\n    getClinicDoctors(clinicId: $clinicId) {\n        createdAt\n        doctor_id\n        updatedAt\n        isActive\n        profile {\n            personal {\n                designation\n                dob\n                email\n                first_name\n                gender\n                last_name\n                middle_name\n                phone_number\n                profile_pic\n            }\n            professional {\n                about\n                active\n                language {\n                    name\n                }\n                major_speciality {\n                    name\n                }\n                speciality {\n                    name\n                }\n                degree {\n                    branch_name\n                    college_name\n                    end_year\n                    name\n                    start_year\n                }\n            }\n        }\n    }\n}\n": types.GetClinicDoctorsDocument,
    "\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n": types.GetAllDraftsDocument,
    "\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n": types.ApproveOrRejectDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBusiness($businessInput: BusinessDTO!) {\n    createBusiness(businessInput: $businessInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBusiness($businessInput: BusinessDTO!) {\n    createBusiness(businessInput: $businessInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {\n    addClinic(businessId: $businessId, clinicInput: $clinicInput) {\n      about\n      business_id\n      city_name\n      closeTime\n      email\n      id\n      location\n      logoUrl\n      name\n      openTime\n      workingDays\n    }\n  }\n"): (typeof documents)["\n  mutation AddClinic($businessId: String!, $clinicInput: ClinicDTO!) {\n    addClinic(businessId: $businessId, clinicInput: $clinicInput) {\n      about\n      business_id\n      city_name\n      closeTime\n      email\n      id\n      location\n      logoUrl\n      name\n      openTime\n      workingDays\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddDoctor(\n    $clinicIds: String!\n    $doctorInput: DoctorDTO!\n  ){\n    addDoctor(\n      doctorInput: $doctorInput\n      clinicIds: $clinicIds\n    ){\n      doctor_id\n    }\n  }\n"): (typeof documents)["\n  mutation AddDoctor(\n    $clinicIds: String!\n    $doctorInput: DoctorDTO!\n  ){\n    addDoctor(\n      doctorInput: $doctorInput\n      clinicIds: $clinicIds\n    ){\n      doctor_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {\n    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {\n        createdAt\n        doctor_id\n        updatedAt\n    }\n}\n"): (typeof documents)["\nmutation UpdateProfilePicUrl($doctor_id: String!, $picture_url: String!) {\n    updateProfilePicUrl(doctor_id: $doctor_id, picture_url: $picture_url) {\n        createdAt\n        doctor_id\n        updatedAt\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetClinics {\n    getClinics {\n        about\n        business_id\n        city_name\n        closeTime\n        email\n        id\n        latitude\n        location\n        logoUrl\n        name\n        address {\n            city\n            country\n            line1\n            line2\n            pin\n            state\n        }\n        phone_number {\n            n\n            name\n        }\n        speciality {\n            name\n        }\n        workingDays\n        longitude\n        openTime\n    }\n}\n"): (typeof documents)["\nquery GetClinics {\n    getClinics {\n        about\n        business_id\n        city_name\n        closeTime\n        email\n        id\n        latitude\n        location\n        logoUrl\n        name\n        address {\n            city\n            country\n            line1\n            line2\n            pin\n            state\n        }\n        phone_number {\n            n\n            name\n        }\n        speciality {\n            name\n        }\n        workingDays\n        longitude\n        openTime\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetClinicDoctors($clinicId: String!) {\n    getClinicDoctors(clinicId: $clinicId) {\n        createdAt\n        doctor_id\n        updatedAt\n        isActive\n        profile {\n            personal {\n                designation\n                dob\n                email\n                first_name\n                gender\n                last_name\n                middle_name\n                phone_number\n                profile_pic\n            }\n            professional {\n                about\n                active\n                language {\n                    name\n                }\n                major_speciality {\n                    name\n                }\n                speciality {\n                    name\n                }\n                degree {\n                    branch_name\n                    college_name\n                    end_year\n                    name\n                    start_year\n                }\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery GetClinicDoctors($clinicId: String!) {\n    getClinicDoctors(clinicId: $clinicId) {\n        createdAt\n        doctor_id\n        updatedAt\n        isActive\n        profile {\n            personal {\n                designation\n                dob\n                email\n                first_name\n                gender\n                last_name\n                middle_name\n                phone_number\n                profile_pic\n            }\n            professional {\n                about\n                active\n                language {\n                    name\n                }\n                major_speciality {\n                    name\n                }\n                speciality {\n                    name\n                }\n                degree {\n                    branch_name\n                    college_name\n                    end_year\n                    name\n                    start_year\n                }\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n"): (typeof documents)["\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n"): (typeof documents)["\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;