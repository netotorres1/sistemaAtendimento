import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';

function SingUp(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault();
        if( nome !== '' && email !== '' && password !== ''){
            signUp(email, password, nome);
        }else if(password < 6){
            alert('A senha precisa conter mais do que 6 caracteres.');
        }
        alert('cadastrando');
        console.log('alert');
    }

    return(
        <div className='container-login'>
            <div className='title'>
                <h1>Cadastrar</h1>
            </div>
            <div className='container-login-area'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h1 className='login-title'>Sistema de atendimento </h1>
                    <input className='login-input' type='text' placeholder='Digite seu nome' value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input className='login-input' type="text" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='login-input' type="password" placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='login-button' type='submit'>{loadingAuth ? 'Carregando' : 'Cadastrar'}</button>
                </form>
                <Link className='login-button' to='/'>Já tem uma conta?</Link>
            </div>
        </div>
    )
}

export default SingUp;