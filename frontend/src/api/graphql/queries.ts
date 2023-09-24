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

export const getAllItemsQuery = graphql(/* GraphQL */`
    query getAllItems {
        inventory {
            id
            name
            description
            price
            quantity
            category
            image
            createdAt
            updatedAt
        }
    }
`)

export const getInventoryItemQuery = graphql(/* GraphQL */`
    query getInventory($inventoryByIdId: String!) {
        inventoryById(id: $inventoryByIdId) {
            id
            name
            description
            price
            quantity
            image
            category
            misc
            createdAt
            updatedAt
        }

    }
`)


export const createOrderMutation = graphql(/* GraphQL */`
    mutation createOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            id
            userId
            itemIds
            quantity
            status
        }
    }
`)

export const getOrdersByUserIdQuery = graphql(/* GraphQL */`
    query getOrdersByUserId($id: String!) {
        ordersByUser(userId: $id) {
            id
            userId
            address
            itemIds
            status
            items {
                id
                name
                image
                description
                price
            }
            quantity
        }
    }
`)