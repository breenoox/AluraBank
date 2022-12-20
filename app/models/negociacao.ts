import { comparavel } from './../interfaces/comparavel.js';
import { imprimivel } from "../utils/imprimivel.js";
import { Modelo } from '../interfaces/meuobjeto.js';

export class Negociacao implements Modelo<Negociacao>{
    constructor(
        private _data: Date, 
        public readonly quantidade: number, 
        public readonly valor: number
    ) {
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    public paraTexto():string {
        return`
            Data: ${this.data}
            Quantidade: ${this.quantidade}
            Valor: ${this.valor}
        `
    }


    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao{
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
            return new Negociacao(date, quantidade, valor);
    }

    public eIgual(negociacao: Negociacao ): boolean{
        return this.data.getDate() === negociacao._data.getDate()
        && this.data.getMonth() === negociacao._data.getMonth()
        && this.data.getFullYear() === negociacao._data.getFullYear()
    }


}