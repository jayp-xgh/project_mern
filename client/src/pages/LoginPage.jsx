import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect ] = useState(false);
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            await axios.post('/login', {
                email,
                password
            });
            setRedirect(true);
            alert('Login sucessful!');
        } catch(err){
            alert('Login later!');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }
    
    return (
        <div className="mt-4 grow flex items-center justify-around ">
            <div className=" mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" method='POST' onSubmit={handleLoginSubmit}>
                    <input 
                        type="email" 
                        placeholder="your@gmail.com" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input
                        type="passaword" 
                        placeholder="passaword" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
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