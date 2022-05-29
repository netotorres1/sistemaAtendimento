import Header from "../../components/Header"
import Title from "../../components/Title"

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import firebase from '../../services/firebaseConnection';

import './new.css';

export default  function New(){

    const [funcao, setFuncao] = useState('Atendimento');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplementot] = useState('');

    const [employees, setEmployees] = useState([]);
    const [loadEmployees, SetLoadEmployees] = useState(true);
    const [employeeSelected, setEmployeeSelected] = useState(0);

    const {user} =  useContext(AuthContext);

    useEffect(() => {
        async function LoadEmployees(){
            await firebase.firestore().collection('employees')
            .get()
            .then((snapshot) =>{
                let lista = [];
                snapshot.forEach((doc) => {
                    lista.push({
                        id:doc.id,
                        cpf:doc.data().cpf,
                        nome:doc.data().nome,
                        rg: doc.data().rg
                    })
                })
                if(lista.lenght === 0){
                    console.log('Nenhum funcionario encontrado.');
                    setEmployees([{id:1,cpf:'', nome:'', rg:'' }]);
                    SetLoadEmployees(false);
                    return;
                }
                setEmployees(lista);
                SetLoadEmployees(false);
            })
            .catch((error) => {
                console.log(error);
                SetLoadEmployees(false)
                setEmployees([{id:1,cpf:'', nome:'', rg:'' }])
            })
        }
        LoadEmployees();
    })

    function handleRegister(e){
        e.preventDefault();
        alert('teste')
    }
    function handleChangelSelect(e){
        setFuncao(e.target.value);
        console.log(e.target.value)
    }
    function handleOptionChange(e){
        setStatus(e.target.value);
        console.log(e.target.value)
    }
    function handleChangeCostumers(e){
        setEmployeeSelected(e.target.value);
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name='Cadastrar atendimento'/>

                <div className="container">
                    <form className="container-form" onSubmit={handleRegister}>
                        <label>Funcionario</label>
                            <select value={employeeSelected} onChange={handleChangeCostumers}>
                                {employees.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.nome}
                                        </option>
                                    )
                                })}
                            </select>
                        <label>Função</label>
                            <select value={funcao} onChange={handleChangelSelect}>
                                <option value='corrida'>Corrida</option>
                                <option value='corre'>corre</option>
                                <option value='lolzinho'>lolzinho</option>
                            </select>
                        <label>Status</label>
                        <div className="container-radio">
                            <input type='radio' name="radio" value='aberto' onChange={handleOptionChange} checked={status === 'Aberto'}/>
                            <span>Em aberto</span>

                            <input type='radio' name="radio" value='progresso' onChange={handleOptionChange}  checked={status === 'Em progresso'} />
                            <span>Em progresso</span>

                            <input type='radio' name="radio" value='realizado' onChange={handleOptionChange}  checked={status === 'Atendido'} />
                            <span>Realizado</span>
                        </div>

                            <textarea
                            type='text'
                            placeholder="Descreva seu problema"
                            value={complemento}
                            onChange={(e) => setComplementot(e.target.value)}
                            />
                            <button type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}