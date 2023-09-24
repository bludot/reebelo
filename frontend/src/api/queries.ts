import {
    CreateOrderInput, CreateOrderMutation,
    GetAllItemsQuery, GetInventoryQuery, GetOrdersByUserIdQuery,
    Inventory, Order,

    ProfileQuery,
    SignInInput,
    SignInMutation,
    User
} from "@/gql/graphql";
import {GraphQLClient, ResponseMiddleware} from "graphql-request";
import {
    createOrderMutation,
    getAllItemsQuery, getInventoryItemQuery, getOrdersByUserIdQuery,

    profileQuery,

    signInQuery,

} from "@/api/graphql/queries";
import {unprotectedRoutes} from "@/app/auth";


const responseMiddleware: ResponseMiddleware = (response) => {

    if ((response instanceof Error) || response.errors) {
        if (response.toString().includes("UNAUTHENTICATED")) {
            // check if current path is unprotected
            if (typeof window !== "undefined") {
                if (unprotectedRoutes.reduce((acc, route) => {
                    return acc || window.location.pathname.includes(route)
                }, false)) {
                    return response
                }
            }
            window.location.href = "/login"
        }

    }
    return response
}
export const graphqlClient = new GraphQLClient(`${process.env.API_URL}/graphql`)

export const AuthClient = new GraphQLClient(`${process.env.API_URL}/graphql`, {
    responseMiddleware,
});
if (typeof window !== "undefined") {
    AuthClient.setHeader('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
}


export const apiSignInMutation = () => ({
    mutationFn: async (input: SignInInput) => {
        const data = await graphqlClient.request<SignInMutation>(signInQuery, {input})
        // save to localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", data.signIn.token)
            localStorage.setItem("refreshToken", data.signIn.refreshToken)
            localStorage.setItem("exp", data.signIn.exp.toString())
            AuthClient.setHeader('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
        }
        return data
    }
})


export const apiProfileQuery = () => ({
    queryKey: ["profile"],
    queryFn: async (): Promise<User> => {
        const data: ProfileQuery = await AuthClient.request<ProfileQuery>(profileQuery)
        return data.profile as User;
    }
})

export const apiGetAllItemsQuery = () => ({
    queryKey: ["inventory"],
    queryFn: async (): Promise<Inventory[]> => {
        console.log("querying inventory")
        const data: GetAllItemsQuery = await graphqlClient.request<GetAllItemsQuery>(getAllItemsQuery)

        console.log("result", data)
        return data.inventory as Inventory[];
    }
})

export const apiGetItemByIdQuery = (id: string) => ({
    queryKey: ["inventoryById", id],
    queryFn: async (): Promise<Inventory> => {
        const data: GetInventoryQuery = await graphqlClient.request<GetInventoryQuery>(getInventoryItemQuery, {inventoryByIdId: id})

        console.log("result", data)
        return data.inventoryById as Inventory;
    }
})

export const apiGetItemsByIdsQuery = (ids: string[]) => ({
    queryKey: ["inventoryByIds", ids],
    queryFn: async (): Promise<Inventory[]> => {
        return Promise.all(ids.map(async (id) => {
            const data: GetInventoryQuery = await graphqlClient.request<GetInventoryQuery>(getInventoryItemQuery, {inventoryByIdId: id})
            return data.inventoryById as Inventory;
        }))
    }
})

export const apiCreateOrderMutation = () => ({
    mutationFn: async (input: CreateOrderInput) => {
        const data: any = await AuthClient.request<CreateOrderMutation>(createOrderMutation, {input})
        console.log("result", data)
        return data.createOrder as Order
    }
})


export const apiGetOrdersByUserIdQuery = (id: string) => ({
    queryKey: ["ordersByUserId", id],
    queryFn: async (): Promise<Order[]> => {
        const data: GetOrdersByUserIdQuery = await AuthClient.request<GetOrdersByUserIdQuery>(getOrdersByUserIdQuery, {id})
        return data.ordersByUser as Order[];
    }
})