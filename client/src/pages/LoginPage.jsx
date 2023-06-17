import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect ] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const userInfo = await axios.get('/login', {email, password});
            await axios.post('/login', {email, password}, {
                withCredentials: true
            });
            setUser(userInfo);
            alert('Login sucessful!');
            setRedirect(true);
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