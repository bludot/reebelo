export function Price({price}: {price: number }) {
    const centsToDollars = (cents: number) => {
        return (cents / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        })
    }

    return (
        <span className={"text-sm"}>{centsToDollars(price)}</span>
    )
}