import Header from "../../components/Header"
import Title from "../../components/Title"

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import firebase from '../../services/firebaseConnection';
import { useParams, useHistory } from "react-router-dom";


import './new.css';

export default  function New(){

    const [funcao, setFuncao] = useState('Atendimento');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    const [horario, setHorario] = useState('');
    const [date, setDate] = useState('');

    const [employees, setEmployees] = useState([]);
    const [loadEmployees, SetLoadEmployees] = useState(true);
    const [employeeSelected, setEmployeeSelected] = useState(0);

    const [idEmployee, setIdEmployee] = useState(false);

    const {user} =  useContext(AuthContext);

    const {id} = useParams();
    const history = useHistory();

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

                if(id){
                    loadId(lista);
                }
            })
            .catch((error) => {
                console.log(error);
                SetLoadEmployees(false)
                setEmployees([{id:1,cpf:'', nome:'', rg:'' }])
            })
        }
        LoadEmployees();
    },[id])

    async function loadId(lista){
        await firebase.firestore().collection('atendimento').doc(id).get()
        .then((snapshot) => {
            setFuncao(snapshot.data().funcao);
            setHorario(snapshot.data.horario);
            setDate(snapshot.data().date);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().employeeId);
            setEmployeeSelected(index);
            setIdEmployee(true);
        })
        .catch((error) => {
            console.log(error);
            setIdEmployee(false);
        })
    }

    async function handleRegister(e){
        e.preventDefault();
        
        if(idEmployee){
            await firebase.firestore().collection('atendimento')
            .doc(id)
            .update({
                employee:employees[employeeSelected].nome,
                employeeId: employees[employeeSelected].id,
                horario: horario,
                date:date,
                funcao: funcao,
                status: status,
                complemento:complemento,
                userId:user.uid
            })
            .then(() => {
                console.log('Atendimento editado com sucesso.');
                setEmployeeSelected('');
                setHorario('');
                setDate('');
                setComplemento('');
                history.push('/dashboard');
            })
            .catch((error) => {
                console.log('Erro ao registra.', error)
            })
            return;
        }

        await firebase.firestore().collection('atendimento')
        .add({
            created: new Date(),
            employee:employees[employeeSelected].nome,
            employeeId: employees[employeeSelected].id,
            horario:horario,
            date:date,
            funcao: funcao,
            status: status,
            complemento:complemento,
            userId:user.uid
        })
        .then(() => {
            console.log('Atendimento criado com sucesso.');
            setComplemento('');
            setHorario('');
            setDate('');
            setEmployeeSelected(0);
        })
        .catch((error) => {
            console.log(error)
        })

        if(horario !== '' && date !== '' && funcao !== ''){
            console.log('Preencha todos os campos antes de prosseguir.')
        }
    }
    function handleChangelSelect(e){
        setFuncao(e.target.value);
    }
    function handleOptionChange(e){
        setStatus(e.target.value);
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
                        <label>Horário</label>
                            <input type='text' placeholder='Digite o horario' value={horario} onChange={(e) => setHorario(e.target.value)}/>  
                        <label>Data</label>
                            <input type="date" onChange={(e) => {setDate(e.target.value)}}/>
                        <label>Função</label>
                            <select value={funcao} onChange={handleChangelSelect}>
                                <option value='corrida'>Atendimento 1</option>
                                <option value='corre'>Atendimento 2</option>
                                <option value='lolzinho'>Atendimento 3</option>
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
                            onChange={(e) => setComplemento(e.target.value)}
                            />
                            <button type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}