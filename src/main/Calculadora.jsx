import "./Calculadora.css"
import React, { Component } from "react";
import Button from "../components/Buttons";
import Display from "../components/Display";


const estadoInicial = {
    valorDisplay: "0",
    limparTela: false,
    operador: null,
    valores: [0, 0],
    vlrAtual: 0
}

class Calculadora extends Component {

    state = {...estadoInicial};

    constructor(props) {
        super(props);
        this.limpaMemoria = this.limpaMemoria.bind(this);   
        this.setOperacao = this.setOperacao.bind(this);   
        this.addDigito = this.addDigito.bind(this);   
    }

    limpaMemoria() {
        // console.log("limpa tela");
        this.setState( {...estadoInicial} );
    }
    
    setOperacao(operador) {
        // console.log("operator",operador);
        if (this.state.vlrAtual === 0)
            this.setState( {
                limparTela: true,
                vlrAtual: 1,
                operador
            } )
        else {
            const igual = operador === "=";
            const valores = [...this.state.valores];
            const operacaoAtual = this.state.operador;

            try {
                valores[0] = eval(`${valores[0]} ${operacaoAtual} ${valores[1]}`);
            } catch(erro) {
                console.log(erro);
                valores[0] = this.state.valores[0];
            }
            this.setState({
                valores,
                limparTela: !igual,
                vlrAtual: igual ? 0 : 1,
                valorDisplay: String(valores[0]),
                operador: igual ? null : operador
            });
        }
    }
    
    addDigito(digito) {
        if (digito === '.') {
            const valor = this.state.valorDisplay;
            if(valor.includes("."))
                return;
        
            if(valor==="0" || valor===".")
                return this.setState( {valorDisplay: "0."} );
        }
        
        const limpaDisplay = this.state.limparTela || this.state.valorDisplay==="0";
        const valorAtual   = limpaDisplay ? "" : this.state.valorDisplay;
        const valorDisplay = valorAtual + digito;

        this.setState( {
            valorDisplay,
            limparTela: false
        });

        if (digito !== ".") {
            const indice    = this.state.vlrAtual;
            const valores   = [...this.state.valores];
            const novoValor = parseFloat(valorDisplay);
            
            valores[indice] = novoValor;
            this.setState( {valores} );
        }
    }

    render() {
        return (
            <div className="calculadora">
                <Display value={this.state.valorDisplay}/>
                <Button label="A/C" click={this.limpaMemoria} doubleCol lightOperator/>
                <Button label="/" click={this.setOperacao}operator/>
                <Button label="*" click={this.setOperacao} operator/>
                <Button label="7" click={this.addDigito}/> 
                <Button label="8" click={this.addDigito}/>
                <Button label="9" click={this.addDigito}/>
                <Button label="-" click={this.setOperacao} operator/>
                <Button label="4" click={this.addDigito}/>
                <Button label="5" click={this.addDigito}/>
                <Button label="6" click={this.addDigito}/>
                <Button label="+" click={this.setOperacao} operator/>
                <Button label="1" click={this.addDigito}/>
                <Button label="2" click={this.addDigito}/>
                <Button label="3" click={this.addDigito}/>
                <Button label="=" click={this.setOperacao} doubleRow lightOperator/>
                <Button label="0" click={this.addDigito} doubleCol/>
                <Button label="." click={this.addDigito}/>
            </div>
        );
    }
}

export default Calculadora;