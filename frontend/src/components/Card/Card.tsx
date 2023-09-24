export default function Card({
                                 key,
                                 children,
                                 className,
                             }: {
    children: React.ReactNode
    className?: string
    key?: string | number
}) {
    return (
        <div
            key={key}
            className={
                `rounded-lg drop-shadow-sm bg-white  ${className} `
            }
        >
            {children}
        </div>
    )
}