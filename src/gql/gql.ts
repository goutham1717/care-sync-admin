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
    "\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n": typeof types.GetAllDraftsDocument,
    "\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n": typeof types.ApproveOrRejectDocument,
};
const documents: Documents = {
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
export function graphql(source: "\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n"): (typeof documents)["\nquery GetAllDrafts {\n    getAllDrafts {\n        clinicName\n        doctorName\n        id\n        name\n        type\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n"): (typeof documents)["\nquery ApproveOrReject($id: String!, $status: String!) {\n    approveOrReject(id: $id, status: $status)\n}\n\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;