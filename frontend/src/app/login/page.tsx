"use client";
import React from "react";
import {faTicketAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useMutation} from "react-query";
import {apiSignInMutation} from "@/api/queries";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const router = useRouter()
    const {mutate: SignInMutation, isLoading: signInIsLoading} = useMutation(
        apiSignInMutation().mutationFn,
        {
            onSuccess: () => {
                router.push("/store")
            }
        }
    )


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Do something with form data

        const makeCall = () => {
            SignInMutation({
                username: event.currentTarget.username.value,
                password: event.currentTarget.password.value,
            })
        }

        const data = makeCall()
    }

    return (
        <div className="flex flex-col flex-auto grow-0 bg-gray-200 shadow-lg">
            <div className="flex flex-col flex-auto items-center justify-center">
                <div className="flex flex-col flex-auto items-center justify-center">
                    <FontAwesomeIcon icon={faTicketAlt} size="3x"
                                     className="flex-0 text-left font-bold text-2xl text-gray-800 w-24 h-24"/>
                    <h1 className="flex-0 text-left font-bold text-2xl text-gray-800">Ticket System</h1>
                    <h2 className="flex-0 text-left font-normal text-sm text-green-800">Ticket Login</h2>
                </div>
                <div className="flex flex-col flex-auto grow-0 items-center justify-center">
                    <form onSubmit={handleSubmit}
                          className="flex flex-col flex-auto grow-0 items-center justify-center">
                        <input type="text" name="username" placeholder="Username"
                               className="flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"/>
                        <input type="password" name="password" placeholder="Password"
                               className="flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"/>
                        <button type="submit"
                                className="flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg">Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}