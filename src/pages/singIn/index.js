import { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import './singIn.css';

function SingIn(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signIn, loadingAuth} = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            signIn(email, password);
        }
    }

    return(
        <div className='container-login'>
            <Title name='Login'>
            </Title>
            <div className='container-login-area'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h1 className='login-title'>Sistema de atendimento </h1>
                    <input className='login-input' type="text" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='login-input' type="password" placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='login-button' type='submit'>{loadingAuth ? 'Carregando' : 'Acessar'}</button>
                </form>
                <Link className='login-button' to='/register'>Criar uma conta</Link>
            </div>
        </div>
    )
}

export default SingIn;