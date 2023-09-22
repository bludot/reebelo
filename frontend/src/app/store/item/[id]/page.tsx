"use client";
import {useQuery} from "react-query";
import {useEffect} from "react";
import {apiMessagesByParentQuery, apiTicketByIdQuery} from "@/api/queries";
import {Message, Ticket} from "@/gql/graphql";
import {TicketDetails} from "@/components/TicketDetails/TicketDeatils";
import MessageBox from "@/components/MessageBox/MessageBox";

export default function TicketPage({params}: { params: { id: string } }) {

    useEffect(() => {
        console.log("TicketPage useEffect")
    }, [])
    const {data, isLoading, isError, error} = useQuery<Ticket>({
        ...apiTicketByIdQuery(params.id),
    })

    const {
        data: messages,
        isLoading: messagesIsLoading,
        isError: messagesIsError,
        error: messagesError,
        refetch: refetch
    } = useQuery<Message[]>({
        ...apiMessagesByParentQuery(params.id),
    })
    return (
        <div>


            {isLoading && <div>Loading...</div>}
            {isError && <div>{!!error}</div>}
            {data && <TicketDetails ticket={data} reloadMessages={() => {
                refetch()
            }}/>}
            {messagesIsLoading && <div>Loading...</div>}
            {messagesIsError && <div>{!!messagesError}</div>}
            {messages && messages.map(message => {
                return <MessageBox key={message.id} message={message}/>
            })
            }

        </div>
    )
}