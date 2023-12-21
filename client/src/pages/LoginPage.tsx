import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

export default function LoginPage(): JSX.Element {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [redirect, setRedirect] = useState<boolean>(false)
    const { setUser }: any = useContext(UserContext);
    async function handleLoginSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            const { data } = await axios.post('/login', {
                email, password
            })
            setUser(data)
            setRedirect(true)
        } catch (e) {
            alert('Login Failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" action="" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder={"your@email.com"}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2">Dont have an account yet? <Link className="underline text-primary" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}