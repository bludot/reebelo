import {Ticket} from "@/gql/graphql";
import {format} from "date-fns";
import Card from "@/components/Card/Card";

export enum TicketPriorityColor {
    LOW = "bg-green-500",
    MEDIUM = "bg-yellow-500",
    HIGH = "bg-red-500",
}

export default function TicketPreview({
                                          key,
                                          ticket,
                                      }: {
    key?: string,
    ticket: Ticket
}) {
    // preview of a ticket with option to click to view ticket
    return (
        <Card key={key} className="flex flex-col justify-between p-4 m-4 cursor-pointer">
            <div className="flex flex-row align-middle items-center">
                <h1 className="flex-auto grow-0 text-xl font-bold">{ticket.title}</h1>
                <span className="flex-auto text-sm text-gray-500 ml-2">#{ticket.id}</span>
            </div>
            <span className="text-sm text-gray-500">{ticket.description}</span>
            <div className="flex flex-row justify-between">
                <span className="p-2 px-4 text-sm text-gray-500">{ticket.status}</span>
                <span className="grow flex">
                <span
                    className={"text-sm text-gray-800 p-2 px-4 rounded-md " + TicketPriorityColor[ticket.priority]}>{ticket.priority}</span>
                </span>
                <span
                    className="p-2 px-4 text-sm text-gray-500">{ticket.email}</span>
                <span
                    className="p-2 px-4 text-sm text-gray-500 ml-2">{format(new Date(ticket.createdAt), "dd/MM/yyyy")}</span>
            </div>
        </Card>
    )

}