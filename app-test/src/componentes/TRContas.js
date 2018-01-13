import React,{Component} from 'react';
import Edit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';

import {Link} from 'react-router';

export default class TRContas extends Component{
    
    constructor(){
        super();
        this.state = {trSelecionada:0}
        this.selecionaConta = this.selecionaConta.bind(this);
        // this.editar = this.editar.bind(this);
    }

    selecionaConta(event, conta){
        if(this.state.trSelecionada === conta.id){
            this.setState({trSelecionada: 0});
        }else{
            this.setState({trSelecionada: conta.id});
        }
    }

    


    render(){
        return(
            <tbody>
            {
                this.props.lista.map(function(conta){
                    return(
                        <tr className={conta.estado?"estado-ok":""} 
                        id={conta.id === this.state.trSelecionada?"selected":"" }
                        key={conta.id} 
                        onClick={e => this.selecionaConta(e, conta)} >
                            <td>
                                <div className={conta.id === this.state.trSelecionada?"show":"hide" }>
                                    <Link  className="pure-button button-margin-3" to={'/cadastro/' + conta.id}>
                                        <Edit/>
                                    </Link>
                                    <button type="submit" className="button-error pure-button button-margin-3" onClick={e => this.props.onClick(e, conta)}>
                                        <FaTimesCircle/>
                                    </button>
                                </div>
                                {conta.nome}
                            </td>
                            <td>{conta.valor}</td>
                            <td>{conta.dataPagamento}</td>
                        </tr>  
                    );
                }.bind(this))
            }
        </tbody>
        );
    };

}