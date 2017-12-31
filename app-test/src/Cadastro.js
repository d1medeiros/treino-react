import React,{Component} from 'react';
import $ from 'jquery';
// import axios from 'axios'


class Cadastro extends Component{

    constructor(){
        super();
        this.state = {nome:'', valor:0, dataPagamento:'', estado: false, repetir: false};
        this.salva = this.salva.bind(this);
    }

    salva(event){
        event.preventDefault();
        console.log(this.state);


        // axios(
        //     {
        //     method: 'post',
        //     headers: {'Access-Control-Allow-Origin': '*'},
        //     url: 'http://localhost:8080/meuorcamento/api/conta/salva', 
        //     contentType: 'application/json; text/html; charset=utf-8',
        //     body: {
        //         nome: this.state.nome,
        //         valor: this.state.valor,
        //         dataPagamento: this.state.dataPagamento,
        //         estado: this.state.estado,
        //         repetir: this.state.repetir
        //     }
        //     })
        //     .then(function (response) {
        //     console.log(response);
        //     })
        //     .catch(function (error) {
        //     console.log(error);
        //     });

        $.ajax({
            type:'post',
            url:'http://localhost:8080/meuorcamento/api/conta/salva',
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify({
                nome: this.state.nome,
                valor: this.state.valor,
                dataPagamento: this.state.dataPagamento,
                estado: this.state.estado,
                repetir: this.state.repetir
            }),
            success: function(){
              this.setState({nome:'', valor:0, dataPagamento:'', estado: false, repetir: false});
            }.bind(this),
            error: function(res, req){
                console.log(res.status)
            }
           
          });
    }
    

    salvaAlteracao(nomeInput,event){
        var campoSendoAlterado = {};
        var value; 
        if(event.target.type === 'checkbox'){
            value = event.target.checked 
        } else if(event.target.type === 'number'){
            value = Number(event.target.value);
        }else{
           value = event.target.value;
        }
            
        campoSendoAlterado[nomeInput] = value;   
        this.setState(campoSendoAlterado);   
        console.log(value);
    }
    

    render(){
        return(

        <div>

            <div className="is-center">
                <h3>Cadastro</h3>
            </div>

            <div className="content">
            
                <div className="pure-g">
                    <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
                        <form className="pure-form pure-form-stacked" onSubmit={this.salva}>
                            <fieldset>
                
                                <label htmlFor="nome">Nome</label>
                                <input id="nome" type="text" placeholder="nome da conta" value={this.state.nome} onChange={this.salvaAlteracao.bind(this,'nome')}/>
                
                                <label htmlFor="valor">Valor</label>
                                <input id="valor" type="number" placeholder="0000" value={this.state.valor} onChange={this.salvaAlteracao.bind(this,'valor')} />
                
                                <label htmlFor="dataPagamento">Data Pagamento</label>
                                <input id="dataPagamento" type="date" value={this.state.dataPagamento} onChange={this.salvaAlteracao.bind(this,'dataPagamento')}/>
                
                
                                <label htmlFor="estado">Status</label>
                                <input id="estado" type="checkbox" checked={this.state.estado} onChange={this.salvaAlteracao.bind(this,'estado')} />
                
                                <label htmlFor="repetir">Repetir</label>
                                <input id="repetir" type="checkbox" checked={this.state.repetir} onChange={this.salvaAlteracao.bind(this,'repetir')} />
                
                
                                <button type="submit" className="pure-button">Enviar</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            
           
        
        </div>

        );
    }

}

export default Cadastro;