import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';

export default function Profile(){
    const {user, setUser, storageUser} = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    async function handleSave(e){
        e.preventDefault();

        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
            nome:nome
        })
        .then(() => {
            let data ={
                ...user,
                nome:nome
            }
            setUser(data);
            storageUser(data);
        })
    }

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Meu perfil">
                </Title>
                    <div className='container' onSubmit={handleSave}>
                        <form className='container-form'>
                            <label className='container-title'>Nome</label>
                            <input className='container-input' type='text' value={nome} onChange={(e) => {setNome(e.target.value)}} />

                            <label className='container-title'>Email</label>
                            <input className='container-input' type='text' value={email} disabled={true}/>

                            <button className='login-button' type='submit'>Salvar</button>
                        </form>
                    </div>
                    <div className='container'>
                        <button className='logout-btn'>
                            Sair
                        </button>
                    </div>
            </div>
        </div>
    )
}