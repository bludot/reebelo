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
 */
const documents = {
    "\n    mutation signIn($input: SignInInput!) {\n        signIn(input: $input) {\n            token\n            refreshToken\n            exp\n        }\n    }\n": types.SignInDocument,
    "\n    mutation refreshTokens($refreshToken: String!) {\n        refreshToken(token: $refreshToken) {\n            token\n            refreshToken\n            exp\n        }\n    }\n": types.RefreshTokensDocument,
    "\n    query profile {\n        profile {\n            id\n            username\n            uid\n        }\n    }\n": types.ProfileDocument,
    "\n    query getAllItems {\n        inventory {\n            id\n            name\n            description\n            price\n            quantity\n            category\n            image\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetAllItemsDocument,
    "\n    query getInventory($inventoryByIdId: String!) {\n        inventoryById(id: $inventoryByIdId) {\n            id\n            name\n            description\n            price\n            quantity\n            image\n            category\n            misc\n            createdAt\n            updatedAt\n        }\n\n    }\n": types.GetInventoryDocument,
    "\n    mutation createOrder($input: CreateOrderInput!) {\n        createOrder(input: $input) {\n            id\n            userId\n            itemIds\n            quantity\n            status\n        }\n    }\n": types.CreateOrderDocument,
    "\n    query getOrdersByUserId($id: String!) {\n        ordersByUser(userId: $id) {\n            id\n            userId\n            address\n            itemIds\n            status\n            items {\n                id\n                name\n                image\n                description\n                price\n            }\n            quantity\n        }\n    }\n": types.GetOrdersByUserIdDocument,
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
export function graphql(source: "\n    mutation signIn($input: SignInInput!) {\n        signIn(input: $input) {\n            token\n            refreshToken\n            exp\n        }\n    }\n"): (typeof documents)["\n    mutation signIn($input: SignInInput!) {\n        signIn(input: $input) {\n            token\n            refreshToken\n            exp\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation refreshTokens($refreshToken: String!) {\n        refreshToken(token: $refreshToken) {\n            token\n            refreshToken\n            exp\n        }\n    }\n"): (typeof documents)["\n    mutation refreshTokens($refreshToken: String!) {\n        refreshToken(token: $refreshToken) {\n            token\n            refreshToken\n            exp\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query profile {\n        profile {\n            id\n            username\n            uid\n        }\n    }\n"): (typeof documents)["\n    query profile {\n        profile {\n            id\n            username\n            uid\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAllItems {\n        inventory {\n            id\n            name\n            description\n            price\n            quantity\n            category\n            image\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query getAllItems {\n        inventory {\n            id\n            name\n            description\n            price\n            quantity\n            category\n            image\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getInventory($inventoryByIdId: String!) {\n        inventoryById(id: $inventoryByIdId) {\n            id\n            name\n            description\n            price\n            quantity\n            image\n            category\n            misc\n            createdAt\n            updatedAt\n        }\n\n    }\n"): (typeof documents)["\n    query getInventory($inventoryByIdId: String!) {\n        inventoryById(id: $inventoryByIdId) {\n            id\n            name\n            description\n            price\n            quantity\n            image\n            category\n            misc\n            createdAt\n            updatedAt\n        }\n\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createOrder($input: CreateOrderInput!) {\n        createOrder(input: $input) {\n            id\n            userId\n            itemIds\n            quantity\n            status\n        }\n    }\n"): (typeof documents)["\n    mutation createOrder($input: CreateOrderInput!) {\n        createOrder(input: $input) {\n            id\n            userId\n            itemIds\n            quantity\n            status\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getOrdersByUserId($id: String!) {\n        ordersByUser(userId: $id) {\n            id\n            userId\n            address\n            itemIds\n            status\n            items {\n                id\n                name\n                image\n                description\n                price\n            }\n            quantity\n        }\n    }\n"): (typeof documents)["\n    query getOrdersByUserId($id: String!) {\n        ordersByUser(userId: $id) {\n            id\n            userId\n            address\n            itemIds\n            status\n            items {\n                id\n                name\n                image\n                description\n                price\n            }\n            quantity\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;