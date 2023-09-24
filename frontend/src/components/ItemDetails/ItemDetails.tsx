import {Inventory, User} from "@/gql/graphql";
import {Price} from "@/components/Price/Price";


export interface ItemDetailsProps {
    item: Inventory

}

export function ItemDetails({item}: ItemDetailsProps) {
    return (
        <div className={"flex flex-col items-center"}>
            {/* font awesome icon */}
            <img src={item.image || ''} className={"w-32 h-32"}/>
            <div className={"flex flex-col"}>
                <h1 className={"text-xl font-bold"}>{item.name}</h1>
                <p className={"text-sm"}>{item.description}</p>
                <span className={"text-sm"}>Price: <Price price={item.price}/></span>
                <span className={"text-sm"}>Quantity: {item.quantity}</span>
            </div>
        </div>
    )


}