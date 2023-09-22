import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import TicketPreview, {TicketPriorityColor} from './TicketPreview'
import {Priority, Status, Ticket} from "@/gql/graphql";
import {format} from "date-fns";

describe('TicketPreview', () => {
    it('should render with classname', () => {
        const date: Date = new Date()
        const ticket: Ticket = {
            id: "1",
            title: "test title",
            description: "test description",
            status: Status.New,
            priority: Priority.High,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
            email: "fake@fake.com",
        };
        render(<TicketPreview ticket={ticket}/>)
        expect(screen.getByText('test title')).toBeInTheDocument()
        expect(screen.getByText('#1')).toBeInTheDocument()
        expect(screen.getByText('test description')).toBeInTheDocument()
        expect(screen.getByText('NEW')).toBeInTheDocument()
        expect(screen.getByText('HIGH')).toBeInTheDocument()
        expect(screen.getByText(format(date, "dd/MM/yyyy"))).toBeInTheDocument()
        expect(screen.getByText('fake@fake.com')).toBeInTheDocument()
    })
    describe('TicketPreview priority colors', () => {
        it('should render with low priority color', () => {
            const date: Date = new Date()
            const ticket: Ticket = {
                id: "1",
                title: "test title",
                description: "test description",
                status: Status.New,
                priority: Priority.Low,
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
                email: "fake@fake.com",
            };
            render(<TicketPreview ticket={ticket}/>)
            expect(screen.getByText('LOW')).toHaveClass(TicketPriorityColor.LOW)
        })

        it('should render with medium priority color', () => {
            const date: Date = new Date()
            const ticket: Ticket = {
                id: "1",
                title: "test title",
                description: "test description",
                status: Status.New,
                priority: Priority.Medium,
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
                email: "fake@fake.com",
            };
            render(<TicketPreview ticket={ticket}/>)
            expect(screen.getByText('MEDIUM')).toHaveClass(TicketPriorityColor.MEDIUM)
        })

        it('should render with high priority color', () => {
            const date: Date = new Date()
            const ticket: Ticket = {
                id: "1",
                title: "test title",
                description: "test description",
                status: Status.New,
                priority: Priority.High,
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
                email: "fake@fake.com",
            };
            render(<TicketPreview ticket={ticket}/>)
            expect(screen.getByText('HIGH')).toHaveClass(TicketPriorityColor.HIGH)

        })
    })
})