import { useState } from 'react'
import { useAuth } from '../Hook/useAuth.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { handleLogin, setLoading, loading } = useAuth()
    const navigate = useNavigate();

    async function handlesubmit(e) {
        e.preventDefault()
        if (loading) {
            setLoading(<h1>Loading...</h1>)
        }
        await handleLogin(email, password)
        navigate("/")
    }
    return (
        <>
            <input type="email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)}
                placeholder='Enter a email'
            />
            <input type="password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)}
                placeholder='Enter a password'
            />
            <button type="submit" onClick={handlesubmit}>Login</button>
        </>
    )
}

export default Login