import { loginApi, registerApi } from '../services/auth.api.js'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context.jsx'

export const useAuth = () => {
    const { user, setUser, loading, setLoading, error, setError } = useContext(AuthContext)

    async function handleLogin(email, password) {
        setLoading(true);
        setError(null);
        try {
            const res = await loginApi(email, password)
            setLoading(res.user)
            return res
        }
        catch (err) {
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }
    async function handleRegister(email, password, username) {
        setLoading(true);
        setError(null);
        try {
            const res = await registerApi(email, password, username)
            setUser(res.user)
            return res
        }
        catch (err) {
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }
    return { handleLogin, handleRegister, setLoading, loading }
}

