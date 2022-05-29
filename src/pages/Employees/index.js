import './employees.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';

export default function Employees(){

    const [nome, setNome] = useState('');
    const [cpf, setcpf] = useState('');
    const [rg, setRg] =  useState('');

    async function handleAdd(e){
        e.preventDefault();
        
        if(nome !== '' && cpf !== '' && rg !== ''){
            await firebase.firestore().collection('employees')
            .add({
                nome:nome,
                cpf:cpf,
                rg:rg
            })
            .then(() => {
                setNome('');
                setcpf('');
                setRg('');
                alert('Funcionario cadastrado com sucesso.');
            })
            .catch((error) => {
                console.log(error);
                alert('Erro ao cadastrar este funcionario.');
            })
        }else{
            alert('Preencha todos os campos.');
        }
    }

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name='Funcionários'>

                </Title>
                <div className='container'>
                <form className='container-form' onSubmit={handleAdd}>
                    <label className='container-title'>Nome:</label>
                    <input className='container-input' type='text' placeholder='Nome completo' value={nome} onChange={(e) => { setNome(e.target.value)}} />

                    <label className='container-title'>CPF:</label>
                    <input className='container-input' type='text' placeholder='CPF' value={cpf} onChange={(e) => { setcpf(e.target.value)}} />

                    <label className='container-title'>RG:</label>
                    <input className='container-input' type='text' placeholder='RG' value={rg} onChange={(e) => { setRg(e.target.value)}} />

                    <button className='login-button' type='submit'>Cadastrar</button>
                </form>
            </div>
            </div>
        </div>
    )
}