import Link from 'next/link'

export default function Company() {
    return (
        <>
            <p>Company name</p>
            <p>Company Description</p>

            <ul>
                <li>
                    <p>Employee 1</p>
                    <p>100 ETH</p>
                    <p>next payment: 12345</p>
                </li>
                <li>
                    <p>Employee 2</p>
                    <p>100 ETH</p>
                    <p>next payment: 12345</p>
                </li>
                <li>
                    <p>Employee 3</p>
                    <p>100 ETH</p>
                    <p>next payment: 12345</p>
                </li>
            </ul>
            <Link href="/">{'back'}</Link>
        </>
    )
}
