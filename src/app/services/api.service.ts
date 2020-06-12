import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from 'src/app/models/pedido';
import JSONFormatter from 'json-formatter-js';



import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://nine45pm.com/services/pedido.php'

  constructor( private http: HttpClient) { }

  grabarPedido(pedido){

    /* const data = {
      pedido
    };
    console.log(JSON.stringify(data)); */
    // const pedidoJson = new JSONFormatter(pedido);
    this.http.post(this.url, JSON.stringify(pedido)).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }
}
