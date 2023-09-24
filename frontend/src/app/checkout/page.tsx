"use client";

import {CreateOrderInput, CreateOrderMutation, Order, User} from "@/gql/graphql";
import {CartItem, useCartStore} from "@/stores/cart";
import {useMutation, useQuery} from "react-query";
import {apiCreateOrderMutation, apiProfileQuery} from "@/api/queries";
import {checkForLocalstorageJWT} from "@/components/Header/Header";
import GenericModal, {GenericModalButtonTypes} from "@/components/Modal/Modal";
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function CheckoutPage() {
    const router = useRouter()

    const [orderPlacedModal, setOrderPlacedModal] = useState<boolean>(false)
    const [errorPlacingOrderModal, setErrorPlacingOrderModal] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("You must have items in your cart to place an order.")
    const createOrderMutation = useMutation(apiCreateOrderMutation().mutationFn)

    const cartStore = useCartStore()
    const {data: user, isLoading: userIsLoading} = useQuery<User>({
        ...apiProfileQuery(),
        cacheTime: 0,
        enabled: checkForLocalstorageJWT(),
    })

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (cartStore.items.length === 0) {
            setErrorMessage("You must have items in your cart to place an order.")
            setErrorPlacingOrderModal(true)
            return
        }
        // get form data
        const formData = new FormData(event.currentTarget)
        // convert to json
        const data = Object.fromEntries(formData.entries())

        if (!data.address || !data.city || !data.state || !data.zip) {
            setErrorMessage("You must fill out all fields to place an order.")
            setErrorPlacingOrderModal(true)
            return
        }
        // convert address to single string
        const address = `${data.address} ${data.city}, ${data.state} ${data.zip}`

        const initialOrderInput: CreateOrderInput = {
            address: address,
            userId: user?.uid || "",

        }

        const result = await createOrderMutation.mutate(initialOrderInput, {
            onSuccess: async (data: Order) => {
                if (!data || !data?.id) {
                    return
                }
                const orderInputs: CreateOrderInput[] = cartStore.items.map((item: CartItem): CreateOrderInput => {

                    return {
                        parentId: data?.id || "",
                        address: address,
                        quantity: item.quantity,
                        itemId: item.id,
                        userId: user?.uid || "",
                    }
                })
                await Promise.all(orderInputs.map(orderInput => {
                    return createOrderMutation.mutate(orderInput)
                }))

                cartStore.removeAllItems()
                setOrderPlacedModal(true)
            }
        })

        // create orderinput object


    }

    return (
        <div>
            <h1>Checkout</h1>
            <form className={"flex flex-col space-y-4"} onSubmit={handleSubmit}>
                <div className={"flex flex-col space-y-4"}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder={"Name"}/>

                    <label htmlFor="address" className={"flex flex-col space-y-4"}>Address</label>
                    <input type="text" name="address" id="address" placeholder={"Address"}/>
                    <label htmlFor="city" className={"flex flex-col space-y-4"}>City</label>
                    <input type="text" name="city" id="city" placeholder={"City"}/>
                    <label htmlFor="state" className={"flex flex-col space-y-4"}>State</label>
                    <input type="text" name="state" id="state" placeholder={"State"}/>
                    <label htmlFor="zip" className={"flex flex-col space-y-4"}>Zip</label>
                    <input type="text" name="zip" id="zip" placeholder={"Zip"}/>
                </div>
                <button type={"submit"}
                        className={"flex-0 w-64 h-10 p-2 m-2 text-gray-800 border border-gray-300 rounded-lg"}>Submit
                </button>
            </form>
            <GenericModal isOpen={orderPlacedModal} title={"Order Placed"} onClose={() => {
                setOrderPlacedModal(false)
                router.push("/orders")
            }}
                          buttons={[{
                              type: GenericModalButtonTypes.PRIMARY,
                              label: "Close",
                              onClick: () => {
                                  setOrderPlacedModal(false)
                                  router.push("/orders")
                              }
                          }]}>
                <div className={"flex flex-row space-x-4"}>
                    <p>Order Placed Successfully</p>
                </div>
            </GenericModal>

            <GenericModal isOpen={errorPlacingOrderModal} title={"Error Placing Order"}
                          onClose={() => {
                              setErrorPlacingOrderModal(false)
                          }}
                          buttons={[{
                              type: GenericModalButtonTypes.PRIMARY,
                              label: "Close",
                              onClick: () => {
                                  setErrorPlacingOrderModal(false)
                              }
                          }]}>
                <div className={"flex flex-row space-x-4"}>
                    <p className={"text-red-500"}>{errorMessage}</p>
                </div>
            </GenericModal>

        </div>
    )
}