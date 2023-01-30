import { ethers } from 'ethers'

export interface AccountsPermission {
    id: string
    parentCapability: string
    invoker: string
    caveats: Array<{
        type: string
        value: string[]
    }>
    date: number
}

export interface SignInData {
    message: string
    connected: boolean
    address: string[]
    className: string
}

export async function verifySignature(message: string, signature: string) {
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

export function toWallet(
    acc: AccountsPermission[],
    wallet: SignInData
): SignInData {
    wallet.address = acc[0].caveats[0].value
    return wallet
}

export async function getWallet(wallet: SignInData) {
    const signIn: SignInData = toWallet(
        await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
        }),
        wallet
    )
    const response = await window.ethereum.request({
        method: 'personal_sign',
        params: ['Sign for Login', signIn.address[0], 'Example password'],
    })

    await verifySignature('Sign for Login', response)

    return signIn
}
