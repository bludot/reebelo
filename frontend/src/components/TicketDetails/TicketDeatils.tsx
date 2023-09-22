import {Priority, Status, Ticket, User} from "@/gql/graphql";
import Card from "@/components/Card/Card";
import {format} from "date-fns";
import {
    apiCreateMessageMutation,
    apiProfileQuery,
    apiReplyMessageMutation, apiUpdateTicketPriorityMutation,
    apiUpdateTicketStatusMutation
} from "@/api/queries";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";
import {getQueryClient} from "@/app/queryProvider";

export function TicketDetails({ticket, reloadMessages}: { ticket: Ticket, reloadMessages: () => void }) {
    const [showReply, setShowReply] = useState(false)
    const {data: profile, isLoading, isError, error} = useQuery<User>({
        ...apiProfileQuery(),
        retry: false,
    })


    const {mutate: submitMessage, isLoading: submitMessageIsLoading} = useMutation(
        apiCreateMessageMutation().mutationFn,
        {
            onSuccess: () => {
                setShowReply(false)
                reloadMessages()
            }
        }
    )


    const {mutate: submitReply, isLoading: submitReplyIsLoading} = useMutation(
        apiReplyMessageMutation().mutationFn,
        {
            onSuccess: () => {
                setShowReply(false)
                reloadMessages()

            }
        }
    )

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (!profile) {
            submitMessage({
                parent: ticket.id,
                content: event.target.content.value,
                sender: ticket.email,
            })
        } else if (profile) {
            submitReply({
                parent: ticket.id,
                content: event.target.content.value,
            })
        }
        return
    }

    const {mutate: resolveTicketMutation, isLoading: resolveTicketIsLoading} = useMutation(
        apiUpdateTicketStatusMutation().mutationFn,
        {
            onSuccess: () => {
                setShowReply(false)
                reloadMessages()
                getQueryClient().invalidateQueries(['ticket', ticket.id], {refetchActive: true})


            }
        }
    )

    const {mutate: changePriority, isLoading: changePriorityIsLoading} = useMutation(
        apiUpdateTicketPriorityMutation().mutationFn,
        {
            onSuccess: () => {
                setShowReply(false)
                reloadMessages()
                getQueryClient().invalidateQueries(['ticket', ticket.id], {refetchActive: true})

            }
        }
    )


    function resolveTicket() {
        resolveTicketMutation({
            id: ticket.id,
            status: Status.Resolved,
        })

    }

    function HandlePriorityChange(event: any) {
        console.log(event.target.value)
        event.preventDefault()
        changePriority({
            id: ticket.id,
            priority: event.target.value,
        })
    }

    return (
        <Card className="flex flex-col p-4">
            {/* card div header */}
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-gray-800">{ticket.title}</h1>
                <h2 className="text-sm font-normal text-gray-800">#{ticket.id}</h2>
            </div>
            {/* card div body */}
            <div className="flex flex-col">
                <p className="text-gray-800 h-40 m-2">{ticket.description}</p>
                <div className="flex flex-row flex-wrap">
                    <div className="flex flex-col flex-auto">
                        <h3 className="text-sm font-bold text-gray-800">Status</h3>
                        <p className="text-sm font-normal text-gray-800">{ticket.status}</p>
                    </div>
                    <div className="flex flex-col flex-auto">

                        <h3 className="text-sm font-bold text-gray-800">Priority</h3>
                        {ticket && ticket.status === Status.Resolved ? (
                            <p className="text-sm font-normal text-gray-800">{ticket.priority}</p>

                        ) : (<>
                                {profile ? (
                                    <select
                                        className={"flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"}
                                        required defaultValue={ticket.priority} onChange={HandlePriorityChange}>
                                        {Object.values(Priority).map(priority => {
                                            return <option key={priority} value={priority}>{priority}</option>
                                        })}
                                    </select>
                                ) : (
                                    <p className="text-sm font-normal text-gray-800">{ticket.priority}</p>
                                )}
                            </>
                        )}
                    </div>
                    <div className="flex flex-col flex-auto">
                        <h3 className="text-sm font-bold text-gray-800">Created</h3>
                        <p className="text-sm font-normal text-gray-800">{format(new Date(ticket.createdAt), 'dd/MM/yyyy')}</p>
                    </div>
                </div>
                {/* button to reply and button to resolve */}
                {ticket && ticket.status === Status.Resolved ? null : (
                    <div className="flex flex-row flex-wrap">

                        <button className="flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"
                                data-testid="replyButton"
                                onClick={() => setShowReply(true)}>Reply
                        </button>


                        <button className="flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"
                                data-testid="resolveButton"
                                onClick={resolveTicket}>Resolve
                        </button>

                    </div>
                )
                }
            </div>
            {/* reply form */}
            {showReply ? (
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <textarea className="text-gray-600 text-sm p-2 m-2 border border-gray-300 rounded-lg"
                              name="content"
                              data-testid="replyTextArea"
                              placeholder="Reply to this message"/>
                    <div className="flex flex-row flex-wrap">
                        <button
                            type="submit"
                            data-testid="replySubmitButton"
                            className="flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg">Submit
                        </button>
                        {/* cancel button */}
                        <button className="flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"
                                onClick={() => setShowReply(!showReply)}>Cancel
                        </button>
                    </div>
                </form>
            ) : null}
        </Card>


    )
}