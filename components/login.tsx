import React, { useState, useEffect } from 'react'

declare global {
    interface Window {
        ethereum: any
    }
}

function addrFormatter(s: string, size = 3) {
    var first = s.slice(0, size + 1)
    var last = s.slice(-size)
    return `${first}_${last}`
}

export default function Login() {
    const [wallet, setWallet] = useState('Login')
    const connectWallet = async () => {
        const listUserAddress = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })
        console.log(listUserAddress)
        setWallet(addrFormatter(listUserAddress[0]))
        // setWallet("Logout")
    }

    return (
        <button className="login" onClick={connectWallet}>
            {wallet}
        </button>
    )
}
