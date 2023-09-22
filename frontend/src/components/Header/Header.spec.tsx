import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Header from './Header'
import {QueryClient, QueryClientProvider} from "react-query";
import {embed, GraphQLHandler, resolverMap} from "graphql-mocks";
import nock from "nock";

describe('Header', () => {

    const queryClient = new QueryClient();
    const wrapper = ({children}: any) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );


    it('should render with classname', () => {
        render(<Header className={"test"}/>, {wrapper})
        expect(screen.getByTestId('header')).toHaveClass('test')
    })

})