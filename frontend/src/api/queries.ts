import {
    CreateMessageMutation,
    CreateTicketMutation, GetMessagesByParentQuery, Message, Priority,
    ProfileQuery, ReplyMessageMutation,
    SignInInput,
    SignInMutation,
    Status,
    Ticket, TicketByIdQuery,
    TicketInput,
    TicketsByStatusQuery, UpdateTicketPriorityMutation, UpdateTicketStatusMutation,
    User
} from "@/gql/graphql";
import {GraphQLClient, ResponseMiddleware} from "graphql-request";
import {
    createMessageMutation,
    createTicketMutation, getMessagesByParent,
    profileQuery,
    queryTicketById, replyMessageMutation,
    signInQuery,
    ticketsByStatusQuery, updateTicketPriorityMutation, updateTicketStatusMutation
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


export const queryTicketsByStatus = (status: Status) => ({
    queryKey: ["tickets", status],
    queryFn: async (): Promise<Ticket[]> => {
        const data: TicketsByStatusQuery = await AuthClient.request<TicketsByStatusQuery>(ticketsByStatusQuery, {status})
        return data.ticketsByStatus as Ticket[];
    }
})

export const apiProfileQuery = () => ({
    queryKey: ["profile"],
    queryFn: async (): Promise<User> => {
        const data: ProfileQuery = await AuthClient.request<ProfileQuery>(profileQuery)
        return data.profile as User;
    }
})

export const apiCreateTicketMutation = () => ({
    mutationFn: async (input: TicketInput): Promise<Ticket> => {
        const data: CreateTicketMutation = await AuthClient.request<CreateTicketMutation>(createTicketMutation, {input})
        return data.createTicket as Ticket
    }
})

export const apiTicketByIdQuery = (id: string) => ({
    queryKey: ["ticket", id],
    queryFn: async (): Promise<Ticket> => {
        const data: TicketByIdQuery = await AuthClient.request<TicketByIdQuery>(queryTicketById, {id})
        return data.ticket as Ticket
    }
})

export const apiMessagesByParentQuery = (parent: string) => ({
    queryKey: ["messages", parent],
    queryFn: async (): Promise<Message[]> => {
        const data: GetMessagesByParentQuery = await graphqlClient.request<GetMessagesByParentQuery>(getMessagesByParent, {parent: parent})

        return data.messagesByParent as Message[]
    }
})

export const apiReplyMessageMutation = () => ({
    mutationFn: async ({parent, content}: { parent: string, content: string }): Promise<Message> => {
        const data: ReplyMessageMutation = await AuthClient.request<ReplyMessageMutation>(replyMessageMutation, {
            input: {
                parent,
                content
            }
        })
        return data.replyMessage as Message
    }
})

export const apiCreateMessageMutation = () => ({
    mutationFn: async ({parent, content, sender}: {
        parent: string,
        content: string,
        sender: string
    }): Promise<Message> => {
        const data: CreateMessageMutation = await graphqlClient.request<CreateMessageMutation>(createMessageMutation, {
            input: {
                parent,
                content,
                sender
            }
        })
        return data.createMessage as Message
    }
})

export const apiUpdateTicketStatusMutation = () => ({
    mutationFn: async ({id, status}: { id: string, status: Status }): Promise<Ticket> => {
        const data: UpdateTicketStatusMutation = await AuthClient.request<UpdateTicketStatusMutation>(updateTicketStatusMutation, {
            id,
            status
        })
        return data.updateTicketStatus as Ticket
    }
})

export const apiUpdateTicketPriorityMutation = () => ({
    mutationFn: async ({id, priority}: { id: string, priority: Priority }): Promise<Ticket> => {
        const data: UpdateTicketPriorityMutation = await AuthClient.request<UpdateTicketPriorityMutation>(updateTicketPriorityMutation, {
            id,
            priority
        })
        return data.updateTicketPriority as Ticket
    }
})

