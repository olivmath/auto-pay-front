import { useRouter } from 'next/router'
import React, { useState, createContext } from 'react'

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
        address: '',
        className: 'login',
    })

    const connectWallet = async () => {
        if (wallet.connected === false) {
            const listAddress = await window.ethereum.request({
                method: 'eth_requestAccounts',
                params: [{ eth_accounts: {} }],
            })
            alert(`✅ connected: ${listAddress[0]}`)
            setWallet({
                message: 'Logout',
                connected: true,
                address: listAddress[0],
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
