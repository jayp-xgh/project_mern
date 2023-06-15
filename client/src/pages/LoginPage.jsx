import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function LoginPage() {
    const [email, setEmail]  = useState('');
    const [password, setPassword]  = useState('');
    return (
        <div className="mt-4 grow flex items-center justify-around ">
            <div className=" mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" action="">
                    <input 
                        type="email" 
                        placeholder="your@gmail.com" 
                        value={email}
                        onChange={ev => setEmail(e.target.value)}
                    />
                    <input 
                        type="passaword" 
                        placeholder="passaword" 
                        value={password}
                        onChange={ev => setPassword(e.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}