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

export const