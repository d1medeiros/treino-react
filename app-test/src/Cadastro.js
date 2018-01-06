import React,{Component} from 'react';
import FormContas from './componentes/FormContas'
// import $ from 'jquery';
// import axios from 'axios'

// class CadastroSalva extends Component{
    
// }

// class CadastroAltera extends Component{

// }

class Cadastro extends Component{

    
    // constructor(){
    //     super();
        
    //     this.salva = this.salva.bind(this);
    // }


    


    render(){
        var tipoConta = [
                            { "id": 'GASTOS', "value":'Gastos'},
                            { "id": 'GANHO', "value":'Ganho'}
                        ];
        tipoConta = tipoConta.map(function(c){
            return <option key={c.id} value={c.id}>{c.value}</option>;
        });
        return(
        <div>

            <div className="is-center">
                <h3>Cadastro</h3>
            </div>

            <div className="content">
                <div className="pure-g">
                    <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
                       <FormContas tipos={tipoConta} acao={this.props.params.userId}/>
                    </div>
                </div>
            
           
            </div>
        
        </div>
        );

    }

}

export default Cadastro;