// create message box with option to reply
// use tailwindcss to style
// when clicking "reply" should show form to reply
import {Message} from "@/gql/graphql";
import {useState} from "react";
import Card from "@/components/Card/Card";
import {format} from "date-fns";

export default function MessageBox({message}: { message: Message }) {
    const [showReply, setShowReply] = useState(false)

    return (
        <Card className="flex flex-col m-4 p-4">
            <div className="flex flex-col">
                {/* message header */}
                <div className="flex justify-between">
                    <h2 className="text-sm font-normal text-gray-800">#{message.id}</h2>
                </div>
                {/* message */}
                <p className="text-gray-600 text-sm">{message.content}</p>
                {/* message footer */}
                <div className="flex flex-row flex-wrap">
                    { /* sender */}
                    <div className="flex flex-col flex-auto">
                        <h3 className="text-sm font-bold text-gray-800">Sender</h3>
                        <p className="text-sm font-normal text-gray-800">{message.sender}</p>
                    </div>
                    <div className="flex flex-col flex-auto">
                        <h3 className="text-sm font-bold text-gray-800">Created</h3>
                        <p className="text-sm font-normal text-gray-800">{format(new Date(message.createdAt), 'dd/MM/yyyy')}</p>
                    </div>
                </div>
                {/* reply button */}
                <button className="text-gray-600 text-sm" data-testid="replyButton"
                        onClick={() => setShowReply(!showReply)}>Reply
                </button>
                {/* reply form */}
                {showReply ? (
                    <form className="flex flex-col">
                        <textarea className="text-gray-600 text-sm" placeholder="Reply to this message"/>
                        <button className="text-gray-600 text-sm">Submit</button>
                    </form>
                ) : null}
            </div>
        </Card>
    )

}