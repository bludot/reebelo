"use client";
import {useMutation} from "react-query";
import {apiCreateTicketMutation} from "@/api/queries";
import {Priority, Ticket} from "@/gql/graphql";
import {useRouter} from "next/navigation";

export default function SubmitTicketPage() {
    const router = useRouter()
    const {mutate: submitTicket, isLoading: submitTicketIsLoading} = useMutation(
        apiCreateTicketMutation().mutationFn,
        {
            onSuccess: (data: Ticket) => {
                router.push(`/ticket/${data.id}`)
            }
        }
    )

    function handleSubmit(event: any) {
        event.preventDefault();
        // Do something with form data
        const makeCall = () => {
           submitTicket({
                title: event.target.title.value,
                description: event.target.description.value,
                priority: event.target.priority.value,
                email: event.target.email.value,
            })
        }
        const data = makeCall()
    }

    return (
        <div className={'flex flex-col w-3/5'}>
            <h1 className={'text-2xl font-bold'}>Submit a new ticket</h1>
            <form onSubmit={handleSubmit} className={'flex flex-col w-full'}>
                <div className={'flex flex-col'}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" className={"flex-0 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"} required/>
                </div>
                <div className={'flex flex-col'}>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" className={"flex-0 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"} required/>
                </div>
                <div className={'flex flex-col'}>
                    <label htmlFor="priority">Priority</label>
                    <select name="priority" id="priority" className={"flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"} required defaultValue={Priority.Low}>
                        {Object.values(Priority).map(priority => {
                            return <option key={priority} value={priority}>{priority}</option>
                        })}
                    </select>
                </div>
                <div className={'flex flex-col'}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className={"flex-0 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"} required/>
                </div>
                <button type="submit" className={"flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"}>Submit</button>
            </form>
        </div>
    )
}