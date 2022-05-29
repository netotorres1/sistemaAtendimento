import Header from '../../components/Header';
import Title from '../../components/Title';

import './dashboard.css';
import { useState} from 'react';
import {Link} from 'react-router-dom';

function Dashboard(){

    const [atendimentos, setAtendimentos] = useState([1]);

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
                            Novo chamado
                        </Link>
                    </div>
                ): (
                    <>
                        <Link className='container-dashboard-btn' to='new'>
                            Novo chamado
                        </Link>

                        <table>
                            <thead>
                                <th scope='col'>Funcionario</th>
                                <th scope='col'>Ocupação</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Cadastrado em</th>
                                <th scope='col'>#</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label='Funcionario'>Sujeito</td>
                                    <td data-label='Funcionario'>Suporte</td>
                                    <td className='badge' style={{backgroundColor: 'rgb(79, 190, 79)'}}><span>Em aberto</span></td>
                                    <td data-label='Cadastrado'>28/05/2022</td>
                                    <td data-label='#'>
                                    <button className='badge' style={{backgroundColor: '#3583f6'}}>
                                        Buscar
                                    </button>
                                    <button className='badge' style={{backgroundColor: '#f6a935'}}>
                                        Editar
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    )
}

export default Dashboard;