export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col flex-auto min-h-screen">
            {children}
        </div>
    )
}