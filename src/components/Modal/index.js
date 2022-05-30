import './modal.css';

export default function Mordal({conteudo, close}){
    return(
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    Voltar
                </button>
                <div>
                    <h2>Detalhes do chamado</h2>
                    <div className='row'>
                        <span>
                            Funcionario:<a>{conteudo.employee}</a>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Cadastrado em:<a>{conteudo.createdFormated}</a>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Status:<a style={{color: '#FFF', backgroundColor: conteudo.status === 'Aberto' ? 'green' : '#999'}}>{conteudo.status}</a>
                        </span>
                    </div>
                    {
                        conteudo.completo !== '' && (
                            <>
                                <h3>Complemento</h3>
                                <p>{conteudo.complemento}</p>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}