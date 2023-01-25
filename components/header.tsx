import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Login from './login'

export default function Header() {
    return (
        <div className="header">
            <Login />
        </div>
    )
}
