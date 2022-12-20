import { comparavel } from './comparavel.js';
import { imprimivel } from './../utils/imprimivel.js';

export interface Modelo<T> extends imprimivel, comparavel<T> {

}