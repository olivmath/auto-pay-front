import Header from './Header'
import React from 'react'

interface MainContainerProps {
    children: React.ReactNode
}

export default function MainContainer({ children }: MainContainerProps) {
    return (
        <>
            <Header></Header>
            {children}
        </>
    )
}
