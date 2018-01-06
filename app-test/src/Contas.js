import React,{Component} from 'react';
import TRContas from './componentes/TRContas';
import PubSub from 'pubsub-js';
import $ from 'jquery';

class Contas extends Component{

    constructor(){
        super();
        this.state = {
            listaGastos: [], 
            listaGanho: [], 
            totalGastos: 0, 
            totalGanho: 0, 
            mes: '', 
            mesValor:0, 
            anoValor:0,
            trSelecionadaGastos:0,
            trSelecionadaGanho:0

        };
        this.getNextContasPorMes = this.getNextContasPorMes.bind(this);
        this.getPrevContasPorMes = this.getPrevContasPorMes.bind(this);
        console.log("construtor");
    }


    sucessoAjax(resp){
        var mesGastos = '';
        var mesTemp = 0;
        var anoTemp = 0;
        var totalGastosTemp = 0;  
        var totalGanhoTemp = 0;  

        var  data = new Date(resp[0].dataPagamento.replace('-', ','));
        
        var listaGastosAtualizada = resp.filter(function(conta){
            var isGastos = conta.tipoConta === 'GASTOS'
            if(isGastos){
                totalGastosTemp += conta.valor;
            }

            return isGastos;
        });
        
        var listaGanhoAtualizada = resp.filter(function(conta){
            var isGanho = conta.tipoConta === 'GANHO'
            if(isGanho){
                totalGanhoTemp += conta.valor;
            }
            return isGanho;
          });

        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        mesTemp = data.getMonth() + 1;
        anoTemp = data.getFullYear();
        mesGastos = monthNames[data.getMonth()];

        return {
              listaGastos: listaGastosAtualizada
              , listaGanho: listaGanhoAtualizada
              , totalGastos:totalGastosTemp
              , totalGanho:totalGanhoTemp
              , mes: mesGastos
              , mesValor: mesTemp
              , anoValor: anoTemp
          };
    }


    componentDidMount(){  
        console.log("didMount");
        $.ajax({
            url:"http://localhost:8080/meuorcamento/api/conta/atual",
            dataType: 'json',
            success:function(resp){    
                this.setState(this.sucessoAjax(resp));
            }.bind(this)
        });

        PubSub.publish('atualiza-gastos', this.token);
    }

    componentWillMount(){
        console.log("willMount");
        this.token = PubSub.subscribe('atualiza-gastos',function(topico,index){
                this.setState(this.state.listaGastos.pop(index));
                console.log(this.state.listaGastos);
            }.bind(this));
    }   
    
    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
      }

    getNextContasPorMes(event){
        event.preventDefault();  
        var isOk = false;
        var mes = this.state.mesValor;
        var ano = this.state.anoValor;
        
        mes++;
        if(mes >= 1 && mes <= 12){
            isOk = true;
        }else if (mes > 12){
            ano++;
            mes = 1;
            isOk = true;
        }else{
            isOk = false;
        }
        
        console.log("depois de mudar -> next mes - ano " + mes + ' - ' + ano);
        if(isOk){
            var paramDate = mes + '-' + ano
            $.ajax({
                url:"http://localhost:8080/meuorcamento/api/conta/mesano/" + paramDate,
                dataType: 'json',
                success:function(resp){    
                    if(resp.length > 0){
                        this.setState(this.sucessoAjax(resp));
                    }
                }.bind(this),
                  error:function(resp){
                        console.log(resp);
                  }
              } 
            );
        }
    }

    getPrevContasPorMes(event){
        event.preventDefault();  
        var isOk = false;
        var mes = this.state.mesValor;
        var ano = this.state.anoValor;
        
        mes--;
        if(mes >= 1 && mes <= 12){
            isOk = true;
        }else if (mes < 1){
            ano--;
            mes = 12;
            isOk = true;
        }else{
            isOk = false;
        }
        
        console.log("next mes - ano " + mes + ' - ' + ano);
        if(isOk){
            var paramDate = mes + '-' + ano
            $.ajax({
                url:"http://localhost:8080/meuorcamento/api/conta/mesano/" + paramDate,
                dataType: 'json',
                success:function(resp){    
                    if(resp.length > 0){
                        this.setState(this.sucessoAjax(resp));
                    }
                }.bind(this),
                  error:function(resp){
                        console.log(resp);
                  }
              } 
            );
        }
    }

    remover(event, conta){
        event.stopPropagation();
        console.log("Removendo " + conta.id);
        $.ajax({
            type:'post',
            url:'http://localhost:8080/meuorcamento/api/conta/remove/' + conta.id,
            contentType:'application/json',
            dataType:'json',
            success: function(res){
                PubSub.publish('atualiza-gastos', conta.id);
            },
            error: function(res, req){
                console.log(res.status)
            }           
          });
    }

    render(){
        console.log("render");
        return(

        <div>
        
            <div className="is-center">
                <h3>Contas</h3>
            </div>

            <div className="content is-center">
            
                {/* botao prev next */}
                <div className="pure-g">
                    <div className="pure-u-1-3" id="prev-contas">
                        <p>
                            <button type="submit" className="pure-button" onClick={this.getPrevContasPorMes}>Prev</button>
                        </p>
                    </div>
                    <div className="pure-u-1-3">
                        <p></p>
                    </div>
                    <div className="pure-u-1-3" id="next-contas">
                        <p>
                            <button type="submit" className="pure-button" onClick={this.getNextContasPorMes}>Next</button>
                        </p>
                    </div>
                </div>

                {/* tabela gastos */}
                <div id="div-gastos" className="pure-g gastos">
                    <div className="pure-u-5-5">
                        <table className="pure-table">
                            <thead>
                                <tr className="header-table-name">
                                    <th colSpan="3" id="">{this.state.mes}</th>
                                </tr>
                                <tr>
                                    <th id="tableName">nome</th>
                                    <th>valor</th>
                                    <th>data</th>
                                </tr>
                            </thead>

                            <TRContas lista={this.state.listaGastos} selecao={this.state.trSelecionadaGastos} onClick={this.remover} />
                        </table>
                    </div>
                </div>

                
                {/* total gastos */}
                <div className="pure-g total">
                    <div className="pure-u-1-3"></div>
                    <div className="pure-u-1-3"> 
                        <table className="pure-table pure-table-bordered">
                            <tbody>
                                <tr>
                                    <td className="header-total">Total</td>
                                    <td>{this.state.totalGastos}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="pure-u-1-3"></div>
                </div>


                {/* tabela ganho */}
                <div id="div-ganho" className="pure-g ganho">
                <div className="pure-u-5-5">
                    <table className="pure-table">
                        <thead>
                            <tr className="header-table-name">
                                <th colSpan="3" id="">{this.state.mes}</th>
                            </tr>
                            <tr>
                                <th id="tableName">nome</th>
                                <th>valor</th>
                                <th>data</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.listaGanho.map(function(conta){
                                    return(
                                        <tr key={conta.id}>
                                            <td>{conta.nome}</td>
                                            <td>{conta.valor}</td>
                                            <td>{conta.dataPagamento}</td>
                                        </tr>  
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

                
                {/* total ganho */}
                <div className="pure-g total">
                    <div className="pure-u-1-3"></div>
                    <div className="pure-u-1-3"> 
                        <table className="pure-table pure-table-bordered">
                        <tbody>
                            <tr>
                                <td className="header-total">Total</td>
                                <td>{this.state.totalGanho}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className="pure-u-1-3"></div>
                </div>
               

            </div>

        </div>

        );
    }

}

export default Contas;