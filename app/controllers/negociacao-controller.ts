
import { Negociacao } from './../models/negociacao.js';
import { DiasDaSemana } from './../enums/dias-da-semana.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';


export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView')
    private negociacoesServer = new NegociacoesService()


    constructor() {
        this.negociacoesView.update(this.negociacoes);     
    }


    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe( 
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if(!this.eDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis')
                return;
        }
        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao)

        this.limparFormulario();
        this.atualizaView();
    }

    public importaDados(): void{
       this.negociacoesServer.obterNegociacoes()
       .then(negociacoesDeHoje =>{
        return negociacoesDeHoje. filter(negociacoesDeHoje => {
            return !this.negociacoes.lista().some(negociacao => negociacao.eIgual(negociacoesDeHoje))
        })
       })
            .then(negociacoesDeHoje => {
                for( let negociacao of negociacoesDeHoje){
                    this.negociacoes.adiciona(negociacao)
                }
                this.negociacoesView.update(this.negociacoes)
            })
    }




    private eDiaUtil(data: Date){
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes)
        this.mensagemView.update('Negociação Adicionada com Sucesso')
    }
}