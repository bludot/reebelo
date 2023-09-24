"use client";
import {CartItem, useCartStore} from "@/stores/cart";
import {Inventory} from "@/gql/graphql";
import {useQuery} from "react-query";
import {apiGetItemsByIdsQuery} from "@/api/queries";
import Card from "@/components/Card/Card";
import {ReactEventHandler, useEffect, useState} from "react";
import {VariableInput} from "@/components/VariableInput/VariableInput";
import GenericModal, {GenericModalButtonTypes} from "@/components/Modal/Modal";


interface CartItemWithDetails extends CartItem {
    details: Inventory
}

export default function CartPage() {
    const cartStore = useCartStore()

    const [activeItem, setActiveItem] = useState<CartItem | null>(null)
    const [removeItemModal, setRemoveItemModal] = useState<boolean>(false)

    // get items from cartStore and query details from inventory
    const {data, isLoading, isError, error} = useQuery<Inventory[]>({
        ...apiGetItemsByIdsQuery(cartStore.items.map(item => item.id)),

        enabled: cartStore.items.length > 0
    })

    function removeItem(id: string) {
        cartStore.removeItem(id)
    }

    function updateQuantity(id: string, quantity: number) {
        cartStore.updateQuantity(id, quantity)
    }

    const totalPrice = cartStore.items.reduce((total, item) => {
        return total + (item.price * item.quantity)

    }, 0)

    const [cartItemsWithDetails, setCartItemsWithDetails] = useState<CartItemWithDetails[]>([])

    useEffect(() => {
        if (data) {
            setCartItemsWithDetails(cartStore.items.map((item: CartItem): CartItemWithDetails => {
                return {
                    ...item,
                    details: data.find(inventoryItem => inventoryItem.id === item.id) || {} as Inventory
                }
            }))
        }
    }, [data, cartStore.items])

    function addDefaultSrc(ev:any) {
        ev.target.src = 'https://placekitten.com/300/300'
    }
    return (
        <div>
            <h1>Cart</h1>
            {isLoading && <div>Loading...</div>}
            {isError && <div>{!!error}</div>}
            {/* list items */}
            <Card className={"flex flex-col space-x-4 p-4"}>
                <div className={"flex flex-row items-center space-x-4 justify-between border-b border-gray-300"}>
                    <h1 className={"text-xl font-bold"}>Cart</h1>
                    <span className={"text-sm"}>Items: {cartStore.items.length}</span>
                </div>
                <ul className={"space-y-4 w-full p-4"}>
                    {data && cartItemsWithDetails.map(item => (
                        <li key={item.id} className={"w-full"}>
                            <div className={"flex flex-row items-center space-x-4"}>
                                <div className={"flex flex-row items-center space-x-4"}>
                                    <img src={item.details.image || ''} className={"w-32 h-32"} onError={addDefaultSrc}/>
                                    <div className={"flex flex-col"}>
                                        <h1 className={"text-xl font-bold"}>{item.name}</h1>
                                        <p className={"text-sm"}>{item.details.description}</p>
                                        <span className={"text-sm"}>Price: {item.price}</span>
                                        <span className={"text-sm"}>Quantity: {item.quantity}</span>
                                    </div>
                                </div>
                                <button
                                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                                    onClick={() => {
                                        setActiveItem(item)
                                        setRemoveItemModal(true)
                                    }}>
                                    Remove from cart
                                </button>
                                <VariableInput value={item.quantity} onChange={(value) => {
                                    updateQuantity(item.id, value)
                                }}/>
                                <span>Price: {item.price * item.quantity}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={"flex flex-row items-center space-x-4 justify-between border-t border-gray-300"}>
                    <h1 className={"text-xl font-bold"}>Total Price</h1>
                    <span className={"text-sm"}>Price: {totalPrice}</span>
                </div>
            </Card>
            <GenericModal isOpen={removeItemModal} onClose={() => {
                setRemoveItemModal(false)
            }} title={"Remove Item"}
                          buttons={[
                              {
                                  label: "Cancel",
                                  onClick: () => {
                                      setRemoveItemModal(false)
                                  },
                                  type: GenericModalButtonTypes.SECONDARY
                              },
                              {
                                  label: "Remove",
                                  onClick: () => {
                                      cartStore.removeItem(activeItem?.id || "")
                                      setRemoveItemModal(false)
                                  },
                                  type: GenericModalButtonTypes.PRIMARY

                              }
                          ]}
            >
                <p>Are you sure you want to remove this item?</p>

            </GenericModal>
        </div>
    )
}