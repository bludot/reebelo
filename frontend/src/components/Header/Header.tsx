"use client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faKey, faTicketAlt, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useQuery} from "react-query";
import {apiProfileQuery} from "@/api/queries";
import {User} from "@/gql/graphql";
import {useCartStore} from "@/stores/cart";

export function checkForLocalstorageJWT() {
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
    const cartStore = useCartStore()


    const {data: user, isLoading: userIsLoading} = useQuery<User>({
        ...apiProfileQuery(),
        cacheTime: 0,
        enabled: checkForLocalstorageJWT(),
    })
    return (
        <div data-testid="header" className={
            `flex flex-row justify-between items-center bg-white shadow-md sticky top-0 z-50 px-4 py-2 space-x-4 ${className}`
        } style={{height: "4rem"}}>
            {/* home logo */}
            <div className={"flex flex-row grow-0 items-center"}>
                { /* font awesome icon */}
                <Link href={"/"} className={"flex flex-row items-center"}>
                    <FontAwesomeIcon icon={faTicketAlt}
                                     className="flex-0 text-left font-bold text-2xl text-gray-800 w-16 h-16 mx-4"/>

                    <h2 className={"text-xl font-bold"}>Ecommerce</h2>
                </Link>
            </div>
            {/* navigation menu  align left*/}
            <div className={"flex flex-row grow-1 flex-auto items-start mx-4"}>
                <Link href={"/store"}>
                    <span className={"mx-2"}>Store</span>
                </Link>
                <Link href={"/checkout"}>
                    <span className={"mx-2"}>Checkout</span>
                </Link>
                {user && (
                    <Link href={"/orders"}>
                        <span className={"mx-2"}>Orders</span>
                    </Link>
                )}
            </div>
            {/* cart with top right showing number of items */}
            <div className={"flex flex-row items-center"}>
                <Link href={"/cart"}>
                    <div className={"flex flex-row items-center space-x-2"}>
                        <FontAwesomeIcon icon={faCartShopping}/>
                        <span className={"text-xl font-bold"}>{cartStore.items.length}</span>
                    </div>
                </Link>

            </div>
            {/* user menu */}
            <div className={"flex flex-row items-center"}>
                <div className={"flex flex-row items-center"}>
                    {user ? (
                        <>
                            <FontAwesomeIcon icon={faUser}
                                             className="flex-0 text-left font-bold text-2xl text-gray-800 w-8 h-8 mx-4"/>
                            <h1 className={"text-xl font-bold"}>{user?.username}</h1>
                        </>
                    ) : (
                        <Link href={"/login"}>
                            <div className={"flex flex-row items-center space-x-2"}>
                                <FontAwesomeIcon icon={faKey}
                                                 className="flex-0 text-left font-bold text-2xl text-gray-800 w-8 h-8 mx-4"/>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>

    )

}