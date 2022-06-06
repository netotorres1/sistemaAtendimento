import {useEffect, useState} from 'react';
import firebase from '../../services/firebaseConnection';
import { format} from 'date-fns';

import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';


export default function Atendidos(){

    const [atendimentos, setAtendimentos] = useState([]);
    const [atendiosFiltrados, setAtendimentosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [isEmpty, setIsEmpty] = useState(false);

    const listRef = firebase.firestore().collection('atendimento').orderBy('created', 'desc');

    useEffect(() =>{
        loadChamados();
        return() => {

        }
    },[])
    
    useEffect(() =>{
        loadChamadosFiltrados();
    },[atendimentos])

    async function loadChamados(){
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot)
        })
        .catch((error) =>{
            console.log("Erro: ", error)
            setLoadingMore(false);
        })
        setLoading(false);
    }

    async function loadChamadosFiltrados(){
        let atendidos = atendimentos.filter((item) => item.status === 'realizado');
        setAtendimentosFiltrados(atendidos);
    }

    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.length === 0;

        if(!isCollectionEmpty){
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id:doc.id,
                    funcao: doc.data().funcao,
                    employee: doc.data().employee,
                    employeeId: doc.data().employeeId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/mm/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            const lastDocs = snapshot.docs[snapshot.docs.length - 1];
            
            setAtendimentos(atendimentos => [...lista]);
            setLastDocs(lastDocs);
        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name='Atendimentos'>
                </Title>
               
                {<table>
                    <thead>
                        <th scope='col'>Funcionario</th>
                        <th scope='col'>Ocupação</th>
                        <th scope='col'>Horario</th>
                        <th scope='col'>Data</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Cadastrado em</th>
                        <th scope='col'>#</th>
                    </thead>
                    <tbody>
                        {atendiosFiltrados.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td data-label='employee'>{item.employee}</td>
                                    <td data-label='Funcionario'>{item.funcao}</td>
                                    <td data-label='Horario'>{item.horario}</td>
                                    <td data-label='data'>{item.date}</td>
                                    <td className='badge'><span  style={{backgroundColor: item.status === 'Aberto' ? '#5cb85c' : 'grey'}}>{item.status}</span></td>
                                    <td data-label='Cadastrado'>{item.createdFormated}</td>
                                    <td data-label='#'>
                                    </td>
                                </tr>)
                                })}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}