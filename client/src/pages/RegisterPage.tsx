import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage(): JSX.Element {
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function registerUser(e: React.FormEvent) {
        e.preventDefault()
        try {
            await axios.post('/register', {
                name, email, password
            })
            alert('Registration successful. Now you can log in')
        } catch (e) {
            alert('Registration failed. Please try again')
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" action="" onSubmit={registerUser}>
                    <input type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                    <input type="email"
                        placeholder={"your@email.com"}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2">Already a member? <Link className="underline text-primary" to={'/login'}>Login now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}