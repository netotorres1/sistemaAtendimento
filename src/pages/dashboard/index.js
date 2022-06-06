import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';

import './dashboard.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import firebase from '../../services/firebaseConnection';
import { format} from 'date-fns';
import {useHistory, useParams} from 'react-router-dom';

const listRef = firebase.firestore().collection('atendimento').orderBy('created', 'desc');

function Dashboard(){

    const {id} = useParams();
    const history = useHistory();

    const [atendimentos, setAtendimentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [isEmpty, setIsEmpty] = useState(false);

    const [atendimentoRealizados, setAtendimentosRealizados] = useState([]);

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() =>{

        loadChamados();

        return() => {

        }
    },[])

    useEffect(() =>{
        loadAtendimentoRealizados();
    },[atendimentos])

    async function loadAtendimentoRealizados(){
        let atendidosAbertos = atendimentos.filter((item) => item.status !== 'realizado');
        setAtendimentosRealizados(atendidosAbertos);   
    }

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
                    date: doc.data().date,
                    horario:doc.data().horario,
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })
            console.log(lista)

            const lastDocs = snapshot.docs[snapshot.docs.length - 1];
            
            setAtendimentos(atendimentos => [...lista]);
            setLastDocs(lastDocs);
        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    function togglePostModal(item){
        console.log(item)
        setShowPostModal(!showPostModal);//trocando de true para false
        setDetail(item);
    }

    if(loading){
        return(
            <div>
                <Header/>
                <div className='content'>
                    <Title name='Atendimentos'>
                    </Title>
                </div>
                <div className='container-dashboard'>
                    <span>Buscando Atendimentos...</span>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name='Atendimentos'>
                </Title>

                {atendimentos.length === 0 ? (
                    <div className='container-dashboard'>
                        <span>Nenhum atendimento registrado...</span>
                        <Link className='container-dashboard-btn' to='new'>
                            Novo atendimento
                        </Link>
                    </div>
                ): (
                    <>
                        <Link className='container-dashboard-btn' to='new'>
                            Novo atendimento
                        </Link>

                        <table>
                            <thead>
                                <th scope='col'>Funcionario</th>
                                <th scope='col'>Ocupação</th>
                                <th scope='col'>Horário</th>
                                <th scope='col'>Data</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Cadastrado em</th>
                                <th scope='col'>#</th>
                            </thead>
                            <tbody>
                                {atendimentoRealizados.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label='employee'>{item.employee}</td>
                                            <td data-label='Funcionario'>{item.funcao}</td>
                                            <td data-label='horario'>{item.horario}</td>
                                            <td data-label='data'>{item.date}</td>
                                            <td className='badge'><span  style={{backgroundColor: item.status === 'Aberto' ? '#5cb85c' : 'grey'}}>{item.status}</span></td>
                                            <td data-label='Cadastrado'>{item.createdFormated}</td>
                                            <td data-label='#'>
                                            <button className='badge' style={{backgroundColor: '#3583f6'}} onClick={() => togglePostModal(item)} >
                                                Buscar
                                            </button>
                                            <Link className='badge' style={{backgroundColor: '#f6a935'}} to={`/new/${item.id}`} >
                                                Editar
                                            </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                        {!loadingMore && !isEmpty && <button className='btn-more' onClick={() => {}}>Buscar Mais...</button>}
                    </>
                )}
            </div>

            {showPostModal && (
                <Modal 
                    conteudo={detail}
                    close={togglePostModal}
                />
            )}

        </div>
    )
}

export default Dashboard;