import './header.css';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Header(){

    const {user} = useContext(AuthContext) 

    return(
        <div className='sidebar'>
           <div>{user.nome}</div>
           <Link to='/dashboard'>Atendimentos</Link>
           <Link to='/employees'>Funcionarios</Link>
           <Link to='/profile'>Configurações</Link>
        </div>
    )
}