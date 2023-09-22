import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
    it('should render with classname', () => {
        render(<Card className={"test"}>test</Card>)
        expect(screen.getByText('test')).toHaveClass('test')

    })

    it('should render the children', () => {
        render(<Card>Test children</Card>)
        expect(screen.getByText('Test children')).toBeInTheDocument()
    })
})


