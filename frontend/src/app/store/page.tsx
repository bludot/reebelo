"use client";
import {useQuery} from "react-query";
import {Inventory} from "@/gql/graphql";
import {apiGetAllItemsQuery} from "@/api/queries";
import Card from "@/components/Card/Card";
import {useEffect} from "react";
import {Price} from "@/components/Price/Price";
import {CartItem, useCartStore} from "@/stores/cart";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function StorePage() {

    const cartStore = useCartStore()
    useEffect(() => {
        console.log("TicketPage useEffect")
    }, [])

    const {data, isLoading, isError, error} = useQuery<Inventory[]>({
        ...apiGetAllItemsQuery(),
    })

    function addToCart(inventoryItem: Inventory) {


        const item: CartItem = {
            id: inventoryItem.id,
            name: inventoryItem.name,
            price: inventoryItem.price,
            quantity: 1,

        }

        cartStore.addItem(item)
    }

    function addDefaultSrc(ev:any) {
        ev.target.src = 'https://placekitten.com/300/300'
    }
    return (
        <div>
            <h1>Store</h1>

            {isLoading && <div>Loading...</div>}
            {isError && <div>{!!error}</div>}
            {/* list items */}
            <div className={"flex flex-row items-center space-x-4"}>
                {data && data.map(item => (
                    <Card key={item.id} className={"flex flex-col space-y-4 p-4"}>
                        {/* show image, name, description, price, quantity, and add to cart button */}
                        <div className={"flex flex-col items-center"}>
                            {/* use placekit image if available */}
                            <img alt={item?.name} src={item?.image || 'https://placekitten.com/200/300'} className={"w-32 h-32"} onError={addDefaultSrc}/>
                            <div className={"flex flex-col"}>
                                <h1 className={"text-xl font-bold"}>{item.name}</h1>
                                <p className={"text-sm"}>{item.description}</p>
                                <span className={"text-sm"}>Price: <Price price={item.price}/></span>
                                <span className={"text-sm"}>Quantity: {item.quantity}</span>
                            </div>
                        </div>
                        <div className={"flex flex-col items-center space-y-4"}>
                        <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                                onClick={() => {
                                    addToCart(item)
                                }}>
                            <FontAwesomeIcon icon={faCartPlus}/>Add to cart
                        </button>
                        <Link href={`/store/item/${item.id}`}>
                            <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                                View Item
                            </button>
                        </Link>
                        </div>
                    </Card>

                ))}
            </div>

        </div>
    )
}