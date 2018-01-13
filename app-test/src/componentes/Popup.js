import React, { Component } from 'react';

export default class Popup extends Component{

    constructor(){
        super();
        // this.state = {mostra: ''};
        this.state = {classe: 'popup-display', mostrar: false};
        this.sair = this.sair.bind(this);

    }

    sair(){
        
    }

    render(){

        return(
            <div className={ this.state.mostrar ? "" : this.state.classe}>
                <div className="popup-main" onClick={e => this.sair(e)}></div>
                <div className="popup">
                    <div>
                        {this.props.label}
                    </div>
                    <div>
                        <button type="submit" className="button-success pure-button button-margin-3" onClick={this.props.confirmar}>
                        v
                        </button>
                        <button type="submit" className="button-error pure-button button-margin-3" onClick={this.props.recusar}>
                        x
                        </button>
                    </div>
                </div>
            </div>
        );

    }

}

