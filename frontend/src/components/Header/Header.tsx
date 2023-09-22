"use client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTicketAlt} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useQuery} from "react-query";
import {apiProfileQuery} from "@/api/queries";
import {User} from "@/gql/graphql";
import {useState} from "react";

function checkForLocalstorageJWT() {
    if (typeof window !== "undefined") {
        // it's safe to use window now
        const token = localStorage.getItem("jwt")
        if (token) {
            return true
        }
    }
    return false
}

export default function Header({
                                   className,
                               }: {
    className?: string
}) {
    const [enableProfileFetch, setEnableProfileFetch] = useState<boolean>(false)
    // check if window is defined (so if in the browser or in node.js)

    const {data: user, isLoading: userIsLoading} = useQuery<User>({
        ...apiProfileQuery(),
        cacheTime: 0,
        enabled: checkForLocalstorageJWT(),
    })
    return (
        <div data-testid="header" className={
            `flex flex-row justify-between items-center bg-white shadow-md sticky top-0 z-50 px-4 py-2 ${className}`
        } style={{height: "4rem"}}>
            {/* home logo */}
            <div className={"flex flex-row grow-0 items-center"}>
                { /* font awesome icon */}
                <Link href={"/"} className={"flex flex-row items-center"}>
                    <FontAwesomeIcon icon={faTicketAlt}
                                     className="flex-0 text-left font-bold text-2xl text-gray-800 w-16 h-16 mx-4"/>

                    <h2 className={"text-xl font-bold"}>Ticket System</h2>
                </Link>
            </div>
            {/* navigation menu  align left*/}
            <div className={"flex flex-row grow-1 flex-auto items-start mx-4"}>
                <Link href={"/dashboard"}>
                    <span className={"mx-2"}>Dashboard</span>
                </Link>
                <Link href={"/submit-ticket"}>
                    <span className={"mx-2"}>Submit a ticket</span>
                </Link>
            </div>
            {/* user menu */}
            <div className={"flex flex-row items-center"}>
                <div className={"flex flex-row items-center"}>
                    <img src={"/user.png"} className={"w-8 h-8 mr-2"}/>
                    <h1 className={"text-xl font-bold"}>{user?.username}</h1>
                </div>
            </div>
        </div>

    )

}