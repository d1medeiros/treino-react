import React,{Component} from 'react';
import $ from 'jquery';


class Contas extends Component{

    constructor(){
        super();
        this.state = {listaGastos: [], total: 0, mes: '', mesValor:0, anoValor:0};
        this.getNextContasPorMes = this.getNextContasPorMes.bind(this);
        this.getPrevContasPorMes = this.getPrevContasPorMes.bind(this);
        console.log("construtor");
    }

    componentDidMount(){  
        console.log("didMount");
        $.ajax({
            url:"http://localhost:8080/meuorcamento/api/conta/atual",
            dataType: 'json',
            success:function(resp){    

              var data;  
              var totalGastos = 0;  
              var mesGastos = '';
              var mesTemp = 0;
              var anoTemp = 0;
              resp.map(function(conta){
                    data = new Date(conta.dataPagamento);
                    return totalGastos+= conta.valor;
                });
                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                mesTemp = data.getMonth() + 1;
                anoTemp = data.getFullYear();
                mesGastos = monthNames[data.getMonth()];
              this.setState({
                        listaGastos: resp
                        , total:totalGastos
                        , mes: mesGastos
                        , mesValor: mesTemp
                        , anoValor: anoTemp
                    });

            }.bind(this)
          } 
        );
    }     

    getNextContasPorMes(event){
        event.preventDefault();  
        var isOk = false;
        var mes = this.state.mesValor;
        var ano = this.state.anoValor;
        console.log("next mes - ano " + mes + ' - ' + ano);
        
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
        
        console.log("next mes - ano " + mes + ' - ' + ano);
        if(isOk){
            var paramDate = mes + '-' + ano
            $.ajax({
                url:"http://localhost:8080/meuorcamento/api/conta/" + paramDate,
                dataType: 'json',
                success:function(resp){    
                    if(resp.length > 0){
                        var data;  
                        var totalGastos = 0;  
                        var mesGastos = '';
                        var mesTemp = 0;
                        var anoTemp = 0;
                        resp.map(function(conta){
                              data = new Date(conta.dataPagamento);
                              return totalGastos+= conta.valor;
                          });
                          var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                          mesTemp = data.getMonth() + 1;
                          anoTemp = data.getFullYear();
                          mesGastos = monthNames[data.getMonth()];
                        this.setState({
                                  listaGastos: resp
                                  , total:totalGastos
                                  , mes: mesGastos
                                  , mesValor: mesTemp
                                  , anoValor: anoTemp
                              });
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
        console.log("next mes - ano " + mes + ' - ' + ano);
        
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
                url:"http://localhost:8080/meuorcamento/api/conta/" + paramDate,
                dataType: 'json',
                success:function(resp){    
                    if(resp.length > 0){
                        var data;  
                        var totalGastos = 0;  
                        var mesGastos = '';
                        var mesTemp = 0;
                        var anoTemp = 0;
                        resp.map(function(conta){
                              data = new Date(conta.dataPagamento);
                              return totalGastos+= conta.valor;
                          });
                          var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                          mesTemp = data.getMonth() + 1;
                          anoTemp = data.getFullYear();
                          mesGastos = monthNames[data.getMonth()];
                        this.setState({
                                  listaGastos: resp
                                  , total:totalGastos
                                  , mes: mesGastos
                                  , mesValor: mesTemp
                                  , anoValor: anoTemp
                              });
                    }
                }.bind(this),
                  error:function(resp){
                        console.log(resp);
                  }
              } 
            );
        }
    }



    render(){
        console.log("render");
        console.log(this.state);
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
                                <tr>
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
                                    this.state.listaGastos.map(function(conta){
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

                <br />
                
                
                {/* total gastos */}
                <div className="pure-g">
                    <div className="pure-u-1-3"></div>
                    <div className="pure-u-1-3"> 
                        <table className="pure-table pure-table-bordered">
                            <tbody>
                                <tr>
                                    <td id="gastos">Total</td>
                                    <td>{this.state.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="pure-u-1-3"></div>
                </div>

                <br />

                {/* tabela ganho */}
                <div id="div-ganho" className="pure-g ganho">
                    <div className="pure-u-5-5">
                        <table className="pure-table">
                            <thead>
                                <tr>
                                    <th colSpan="3" id="">Mes</th>
                                </tr>
                                <tr>
                                    <th id="tableName">nome</th>
                                    <th>valor</th>
                                    <th>data</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>salario</td>
                                    <td>1000</td>
                                    <td>12/12/2017</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <br />
                
                {/* total ganho */}
                <div className="pure-g">
                    <div className="pure-u-1-3"></div>
                    <div className="pure-u-1-3"> 
                        <table className="pure-table pure-table-bordered">
                        <tbody>
                            <tr>
                                <td id="ganho">Total</td>
                                <td>400</td>
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