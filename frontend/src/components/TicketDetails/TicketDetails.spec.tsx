import '@testing-library/jest-dom'
import {Message, Priority, Status, Ticket, User} from "@/gql/graphql";
import {TicketDetails} from "@/components/TicketDetails/TicketDeatils";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {format} from "date-fns";
import {QueryClient, QueryClientProvider} from "react-query";
import * as queries from "@/api/queries";

describe('TicketDetails', () => {
    const queryClient = new QueryClient();
    const wrapper = ({children}: any) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
    it('should render', async () => {
        const date: Date = new Date()
        const ticket: Ticket = {
            id: "2",
            title: "test title2",
            description: "test2 description",
            status: Status.New,
            priority: Priority.High,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
            email: "fake@fake.com",
        };

        jest.spyOn(queries, 'apiProfileQuery').mockImplementation(() => ({
            queryKey: ['profile'],
            queryFn: jest.fn((): Promise<User> => Promise.resolve({
                id: "1",
                uid: "1",
                username: "test",
            })),
        }));

        jest.spyOn(queries, 'apiCreateMessageMutation').mockImplementation(() => ({
            mutationFn: jest.fn(({parent, content, sender}): Promise<Message> => Promise.resolve({
                id: "1",
                content: "test content",
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
                sender: "fake@fake.com",
                parent: "1",
            })),
        }));


        jest.spyOn(queries, 'apiReplyMessageMutation').mockImplementation(() => ({
            mutationFn: jest.fn(({parent, content}): Promise<Message> => Promise.resolve({
                id: "2",
                content: "test content",
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
                sender: "fake@fake.com",
                parent: "1",
            })),
        }));


        function refresh() {
            return
        }


        render(<TicketDetails ticket={ticket} reloadMessages={refresh}/>, {wrapper})

        // wait for the query to resolve
        await waitFor(() => screen.getByText('test title2'))
        expect(screen.getByText('test title2')).toBeInTheDocument()
        expect(screen.getByText('#2')).toBeInTheDocument()
        expect(screen.getByText('test2 description')).toBeInTheDocument()
        expect(screen.getByText('NEW')).toBeInTheDocument()
        expect(screen.getByText('HIGH')).toBeInTheDocument()
        expect(screen.getByText(format(date, "dd/MM/yyyy"))).toBeInTheDocument()

    })

    it('should hide reply after submit', async () => {
        const date: Date = new Date()
        const ticket: Ticket = {
            id: "2",
            title: "test title2",
            description: "test2 description",
            status: Status.New,
            priority: Priority.High,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
            email: "fake@fake.com"
        };

        jest.spyOn(queries, 'apiProfileQuery').mockImplementation(() => ({
            queryKey: ['profile'],
            queryFn: jest.fn((): Promise<User> => Promise.resolve({
                id: "1",
                uid: "1",
                username: "test",
            })),
        }));

        jest.spyOn(queries, 'apiCreateMessageMutation').mockImplementation(() => ({
            mutationFn: jest.fn(({parent, content, sender}): Promise<Message> => Promise.resolve({
                id: "1",
                content: "test content",
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
                sender: "fake@fake.com",
                parent: "1",
            })),
        }));


        jest.spyOn(queries, 'apiReplyMessageMutation').mockImplementation(() => ({
            mutationFn: jest.fn(({parent, content}): Promise<Message> => Promise.resolve({
                id: "2",
                content: "test content",
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
                sender: "fake@fake.com",
                parent: "1",
            })),
        }));


        function refresh() {
            return
        }

        render(<TicketDetails ticket={ticket} reloadMessages={refresh}/>, {wrapper})

        // wait for the query to resolve
        await waitFor(() => screen.getByText('test title2'))

        expect(screen.getByText('test title2')).toBeInTheDocument()
        expect(screen.getByText('#2')).toBeInTheDocument()
        expect(screen.getByText('test2 description')).toBeInTheDocument()
        expect(screen.getByText('NEW')).toBeInTheDocument()
        expect(screen.getByText('HIGH')).toBeInTheDocument()
        expect(screen.getByText(format(date, "dd/MM/yyyy"))).toBeInTheDocument()

        expect(screen.getByTestId('replyButton')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('replyButton'))
        expect(screen.getByPlaceholderText('Reply to this message')).toBeInTheDocument()


        const textInput = screen.getByTestId('replyTextArea')
        fireEvent.change(textInput, {target: {value: 'test reply'}})
        // set value of text area
        expect(screen.getByTestId('replyTextArea')).toHaveValue('test reply')
        // screen.getByTestId('replySubmitButton').click()
        //
        //
        // expect(screen.queryByPlaceholderText('Reply to this message')).not.toBeInTheDocument()
        //

    })


})