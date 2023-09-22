"use client";
import {useQuery} from "react-query";
import {Status, Ticket, TicketsByStatusQuery} from "@/gql/graphql";
import {queryTicketsByStatus} from "@/api/queries";
import TicketPreview from "@/components/TicketPreview/TicketPreview";
import Link from "next/link";

export default function DashboardPage() {

    // get tickets by status using react-query
    const {data: newTickets, isLoading: newTicketsIsLoading, isError: newTicketsIsError, error: newTicketsError}: {
        data: Ticket[] | undefined,
        isLoading: boolean,
        isError: boolean,
        error: any
    } = useQuery<Ticket[]>({
        ...queryTicketsByStatus(Status.New),
    })

    const {
        data: inprogressTickets,
        isLoading: inprogressTicketsIsLoading,
        isError: inprogressTicketsIsError,
        error: inprogressTicketsError
    }: {
        data: Ticket[] | undefined,
        isLoading: boolean,
        isError: boolean,
        error: any
    } = useQuery<Ticket[]>({
        ...queryTicketsByStatus(Status.InProgress),
    })

    return (
        <div>
            <h1>Current New Tickets</h1>
            {newTicketsIsLoading && <div>Loading...</div>}
            {newTicketsIsError && <div>Error: {newTicketsError.message}</div>}
            {/* list tickets with preview */}
            {newTickets && newTickets.map((ticket) => {
                return (
                    <Link href={`/ticket/${ticket.id}`} key={ticket.id}>
                        <TicketPreview key={ticket.id} ticket={ticket}/>
                    </Link>
                )
            })}

            <h1>In Progress Tickets</h1>
            {inprogressTicketsIsLoading && <div>Loading...</div>}
            {inprogressTicketsIsError && <div>Error: {inprogressTicketsError.message}</div>}
            {inprogressTickets && inprogressTickets.map((ticket) => {
                return (
                    <Link href={`/ticket/${ticket.id}`} key={ticket.id}>
                        <TicketPreview key={ticket.id} ticket={ticket}/>
                    </Link>
                )

            })}
        </div>
    )
}