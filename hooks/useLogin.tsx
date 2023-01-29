import { useContext } from 'react'
import { LoginContext } from '../components/Login'

const useLogin = () => {
    const constext = useContext(LoginContext)

    return constext
}

export default useLogin
