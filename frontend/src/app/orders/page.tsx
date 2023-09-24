"use client";
import {useQuery} from "react-query";
import {Inventory, Order, User} from "@/gql/graphql";
import {apiGetOrdersByUserIdQuery, apiProfileQuery} from "@/api/queries";
import {checkForLocalstorageJWT} from "@/components/Header/Header";
import Card from "@/components/Card/Card";

export default function OrderPage() {

    const {data: user, isLoading: userIsLoading} = useQuery<User>({
        ...apiProfileQuery(),
        cacheTime: 0,
        enabled: checkForLocalstorageJWT(),
    })

    const {data: orders, isLoading: ordersIsLoading} = useQuery<Order[]>({
        ...apiGetOrdersByUserIdQuery(user?.uid || ""),
        enabled: !!user
    })

    function addDefaultSrc(ev: any) {
        ev.target.src = 'https://placekitten.com/300/300'
    }

    function calculateTotalPrice(order: Order) {
        if (!order?.quantity || !order?.items) {
            return 0
        }

        const orderQuantity = order?.quantity?.filter(quantity => quantity !== null)
        return orderQuantity.reduce((total: number, quantity, index) => {
            return total + ((quantity as number) * order?.items[index]?.price)
        }, 0)
    }

    return (
        <div>
            <h1>Orders</h1>
            <div className={"flex flex-col space-y-4"}>
                {orders?.map((order: Order) => {
                    return (
                        <Card className={"flex flex-col space-x-4 p-4"} key={order?.id}>
                            <div className={"flex flex-col space-y-4"}>
                                <h2>Order #{order?.id}</h2>
                                <div className={"flex flex-col space-y-4"}>
                                    {order.items.map((item: Inventory, index: number) => {
                                        return (
                                            <div className={"flex flex-row space-x-4"} key={item.id}>
                                                <div className={"flex flex-col space-y-4"}>

                                                    <span>{item.name}</span>
                                                </div>
                                                <div className={"flex flex-col space-y-4"}>
                                                    <span>Quantity: {order?.quantity?.filter(quantity => quantity !== null)[index]}</span>
                                                    <span>Price: {item.price}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {/* full price */}
                            <div className={"flex flex-row justify-between items-center"}>
                                <span className={"text-md font-bold"}>Total Price: {calculateTotalPrice(order)}</span>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
    return null
}
