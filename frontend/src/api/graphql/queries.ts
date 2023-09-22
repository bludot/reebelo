import {graphql} from "@/gql"


export const signInQuery = graphql(/* GraphQL */`
    mutation signIn($input: SignInInput!) {
        signIn(input: $input) {
            token
            refreshToken
            exp
        }
    }
`)

export const ticketsByStatusQuery = graphql(/* GraphQL */`
    query ticketsByStatus($status: Status!) {
        ticketsByStatus(status: $status) {
            id
            title
            description
            status
            priority
            email
            createdAt
            updatedAt
        }
    }
`)

export const refreshTokensMutation = graphql(/* GraphQL */`
    mutation refreshTokens($refreshToken: String!) {
        refreshToken(token: $refreshToken) {
            token
            refreshToken
            exp
        }
    }
`)

export const profileQuery = graphql(/* GraphQL */`
    query profile {
        profile {
            id
            username
            uid
        }
    }
`)

export const createTicketMutation = graphql(/* GraphQL */`
    mutation createTicket($input: TicketInput!) {
        createTicket(input: $input) {
            id
            title
            description
            status
            priority
            createdAt
            updatedAt
        }
    }
`)

export const queryTicketById = graphql(/* GraphQL */`
    query ticketById($id: String!) {
        ticket(id: $id) {
            id
            title
            description
            status
            email
            priority
            createdAt
            updatedAt
        }
    }
`)

export const getMessagesByParent = graphql(/* GraphQL */`
    query getMessagesByParent($parent: String!) {
        messagesByParent(parent: $parent) {
            id
            parent
            content
            sender
            createdAt
            updatedAt
        }
    }
`)

export const replyMessageMutation = graphql(/* GraphQL */`
    mutation replyMessage($input: ReplyMessageInput!) {
        replyMessage(input: $input) {
            id
            parent
            content
            sender
            createdAt
            updatedAt
        }
    }
`)

export const createMessageMutation = graphql(/* GraphQL */`
    mutation createMessage($input: MessageInput!) {
        createMessage(input: $input) {
            id
            parent
            content
            sender
            createdAt
            updatedAt
        }
    }
`)

export const updateTicketStatusMutation = graphql(/* GraphQL */`
    mutation updateTicketStatus($id: String!, $status: Status!) {
        updateTicketStatus(id: $id, status: $status) {
            id
            title
            description
            status
            priority
            createdAt
            updatedAt
        }
    }
`)

export const updateTicketPriorityMutation = graphql(/* GraphQL */`
    mutation updateTicketPriority($id: String!, $priority: Priority!) {
        updateTicketPriority(id: $id, priority: $priority) {
            id
            title
            description
            status
            priority
            createdAt
            updatedAt
        }
    }
`)

