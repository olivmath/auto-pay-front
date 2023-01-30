import { useRouter } from 'next/router'
import React, { useState, createContext } from 'react'
import { ethers } from 'ethers'

interface AccountsPermission {
    id: string
    parentCapability: string
    invoker: string
    caveats: Array<{
        type: string
        value: string[]
    }>
    date: number
}

interface SignInData {
    message: string
    connected: boolean
    address: string[]
    className: string
}
declare global {
    interface Window {
        ethereum: any
    }
}

async function verifySignature(message: string, signature: string) {
    const signer = await window.ethereum.request({
        method: 'eth_accounts',
    })
    const verify = ethers.utils.verifyMessage(message.toString(), signature)
    if (verify.toLowerCase() !== signer[0].toLowerCase()) {
        alert('🚨 Signature not valid')
    } else {
        alert(`✅ connected: ${signer[0].toLowerCase()}`)
    }
}

export const LoginContext = createContext({})

function toWallet(acc: AccountsPermission[], wallet: SignInData): SignInData {
    wallet.address = acc[0].caveats[0].value
    return wallet
}

export function Login() {
    const router = useRouter()
    const [wallet, setWallet] = useState({
        message: 'Login',
        connected: false,
        address: [''],
        className: 'login',
    })

    const connectWallet = async () => {
        if (wallet.connected === false) {
            const signIn: SignInData = toWallet(
                await window.ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                }),
                wallet
            )
            const response = await window.ethereum.request({
                method: 'personal_sign',
                params: [
                    'Sign for Login',
                    signIn.address[0],
                    'Example password',
                ],
            })

            await verifySignature('Sign for Login', response)

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
