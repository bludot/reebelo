import '@testing-library/jest-dom'
import {Message} from "@/gql/graphql";
import {fireEvent, render, screen} from "@testing-library/react";
import {format} from "date-fns";
import {QueryClient, QueryClientProvider} from "react-query";
import MessageBox from "@/components/MessageBox/MessageBox";

describe('MessageBox', () => {
    const queryClient = new QueryClient();
    const wrapper = ({children}: any) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    it('should render', () => {
        const date: Date = new Date()
        const message: Message = {
            id: "2",
            content: "test content",
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
            sender: "fake@fake.com",
            parent: "1",
        }
        render(<MessageBox message={message}/>, {wrapper})
        expect(screen.getByText('test content')).toBeInTheDocument()
        expect(screen.getByText(format(date, "dd/MM/yyyy"))).toBeInTheDocument()
        expect(screen.getByText('fake@fake.com')).toBeInTheDocument()

    })

    it('should show reply box', () => {
        const date: Date = new Date()
        const message: Message = {
            id: "2",
            content: "test content",
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
            sender: "fake@fake.com",
            parent: "1",
        }

        render(<MessageBox message={message}/>, {wrapper})
        expect(screen.getByTestId('replyButton')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('replyButton'))
        expect(screen.getByPlaceholderText('Reply to this message')).toBeInTheDocument()
        expect(screen.getByText('Submit')).toBeInTheDocument()

    })
})