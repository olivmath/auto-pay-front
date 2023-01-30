import React, { useState, createContext } from 'react'
import { useRouter } from 'next/router'
import { getWallet } from './utils'

declare global {
    interface Window {
        ethereum: any
    }
}

export const LoginContext = createContext({})

export function Login() {
    const router = useRouter()
    const [wallet, setWallet] = useState({
        message: 'Login',
        connected: false,
        address: [''],
        className: 'login',
    })

    const connectWallet = async () => {
        if (!wallet.connected) {
            const signIn = await getWallet(wallet)
            setWallet({
                message: 'Logout',
                connected: true,
                address: signIn.address,
                className: 'logout',
            })
            router.push('/company')
        } else {
            router.reload()
        }
    }

    return (
        <LoginContext.Provider value={wallet}>
            <button className={wallet.className} onClick={connectWallet}>
                {wallet.message}
            </button>
        </LoginContext.Provider>
    )
}
