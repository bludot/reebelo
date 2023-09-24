"use client";
import {useQuery} from "react-query";
import {useEffect} from "react";
import {apiGetItemByIdQuery,} from "@/api/queries";
import {Inventory,} from "@/gql/graphql";
import {ItemDetails} from "@/components/ItemDetails/ItemDetails";
import Card from "@/components/Card/Card";
import {CartItem, useCartStore} from "@/stores/cart";

export default function ItemPage({params}: { params: { id: string } }) {

    useEffect(() => {
        console.log("TicketPage useEffect")
    }, [])
    console.log("THE ID", params.id)
    const {data, isLoading, isError, error} = useQuery<Inventory>({
        ...apiGetItemByIdQuery(params.id.toString()),
    })
    const cartStore = useCartStore()

    function addToCart(inventoryItem: Inventory) {
        const foundItem = cartStore.items.find(cartItem => cartItem.id === inventoryItem.id)

        const item: CartItem = {
            id: inventoryItem.id,
            name: inventoryItem.name,
            price: inventoryItem.price,
            quantity: foundItem ? foundItem.quantity + 1 : 1,

        }

        cartStore.addItem(item)
    }

    return (
        <div>


            {isLoading && <div>Loading...</div>}
            {isError && <div>{!!error}</div>}

            {data && (
                <Card className={"flex flex-col items-center"}>
                    <ItemDetails item={data}/>
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                            onClick={() => {
                                addToCart(data)

                            }}>
                        Add to cart
                    </button>

                </Card>
            )}


        </div>
    )
}
