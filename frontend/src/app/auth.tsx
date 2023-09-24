"use client";
import {usePathname, useRouter} from "next/navigation";
import {HandleRefresh} from "@/api/auth";
import {apiProfileQuery} from "@/api/queries";
import {useQuery} from "react-query";
import {User} from "@/gql/graphql";
import {useEffect} from "react";

export const unprotectedRoutes = [
    "login",
    "register",
    "ticket",
    "submit-ticket",
]


export default function VerifyAuth() {
    // get current route
    const router = useRouter()
    const pathName = usePathname()

    const {data: profile, isLoading: profileIsLoading, isError} = useQuery<User>({
        ...apiProfileQuery(),
        enabled: !unprotectedRoutes.reduce((acc, route) => {
            return acc || pathName.includes(route)
        }, false)
    })

    useEffect(() => {
        if (!unprotectedRoutes.reduce((acc, route) => {
            return acc || pathName.includes(route)
        }, false)) {
            return;
        }
        if (profileIsLoading) {
            return
        }
        if (isError && !unprotectedRoutes.reduce((acc, route) => {
            return acc || pathName.includes(route)
        }, false)) {
            router.push("/login")
        }
    }, [profileIsLoading, isError, pathName, router])

    const handleRefresh: HandleRefresh = HandleRefresh.getInstance()
    handleRefresh.start()
    return (
        <></>
    )

}