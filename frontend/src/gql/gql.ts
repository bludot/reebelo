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
    "\n    query ticketsByStatus($status: Status!) {\n        ticketsByStatus(status: $status) {\n            id\n            title\n            description\n            status\n            priority\n            email\n            createdAt\n            updatedAt\n        }\n    }\n": types.TicketsByStatusDocument,
    "\n    mutation refreshTokens($refreshToken: String!) {\n        refreshToken(token: $refreshToken) {\n            token\n            refreshToken\n            exp\n        }\n    }\n": types.RefreshTokensDocument,
    "\n    query profile {\n        profile {\n            id\n            username\n            uid\n        }\n    }\n": types.ProfileDocument,
    "\n    mutation createTicket($input: TicketInput!) {\n        createTicket(input: $input) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n": types.CreateTicketDocument,
    "\n    query ticketById($id: String!) {\n        ticket(id: $id) {\n            id\n            title\n            description\n            status\n            email\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n": types.TicketByIdDocument,
    "\n    query getMessagesByParent($parent: String!) {\n        messagesByParent(parent: $parent) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetMessagesByParentDocument,
    "\n    mutation replyMessage($input: ReplyMessageInput!) {\n        replyMessage(input: $input) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n": types.ReplyMessageDocument,
    "\n    mutation createMessage($input: MessageInput!) {\n        createMessage(input: $input) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n": types.CreateMessageDocument,
    "\n    mutation updateTicketStatus($id: String!, $status: Status!) {\n        updateTicketStatus(id: $id, status: $status) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n": types.UpdateTicketStatusDocument,
    "\n    mutation updateTicketPriority($id: String!, $priority: Priority!) {\n        updateTicketPriority(id: $id, priority: $priority) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n": types.UpdateTicketPriorityDocument,
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
export function graphql(source: "\n    query ticketsByStatus($status: Status!) {\n        ticketsByStatus(status: $status) {\n            id\n            title\n            description\n            status\n            priority\n            email\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query ticketsByStatus($status: Status!) {\n        ticketsByStatus(status: $status) {\n            id\n            title\n            description\n            status\n            priority\n            email\n            createdAt\n            updatedAt\n        }\n    }\n"];
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
export function graphql(source: "\n    mutation createTicket($input: TicketInput!) {\n        createTicket(input: $input) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation createTicket($input: TicketInput!) {\n        createTicket(input: $input) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ticketById($id: String!) {\n        ticket(id: $id) {\n            id\n            title\n            description\n            status\n            email\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query ticketById($id: String!) {\n        ticket(id: $id) {\n            id\n            title\n            description\n            status\n            email\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getMessagesByParent($parent: String!) {\n        messagesByParent(parent: $parent) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query getMessagesByParent($parent: String!) {\n        messagesByParent(parent: $parent) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation replyMessage($input: ReplyMessageInput!) {\n        replyMessage(input: $input) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation replyMessage($input: ReplyMessageInput!) {\n        replyMessage(input: $input) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createMessage($input: MessageInput!) {\n        createMessage(input: $input) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation createMessage($input: MessageInput!) {\n        createMessage(input: $input) {\n            id\n            parent\n            content\n            sender\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateTicketStatus($id: String!, $status: Status!) {\n        updateTicketStatus(id: $id, status: $status) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation updateTicketStatus($id: String!, $status: Status!) {\n        updateTicketStatus(id: $id, status: $status) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateTicketPriority($id: String!, $priority: Priority!) {\n        updateTicketPriority(id: $id, priority: $priority) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation updateTicketPriority($id: String!, $priority: Priority!) {\n        updateTicketPriority(id: $id, priority: $priority) {\n            id\n            title\n            description\n            status\n            priority\n            createdAt\n            updatedAt\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;