export default function Card({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={
                `rounded-lg drop-shadow-sm bg-white  ${className} `
            }
        >
            {children}
        </div>
    )
}