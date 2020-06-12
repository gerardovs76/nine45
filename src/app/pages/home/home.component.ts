import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Color } from 'src/app/models/color';
import { Diseno } from './../../models/diseno';

import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  lineasDePedido: any = [];
  pedido: any = [];
  colores: Color[];

  disenos: Diseno[];

  formArticle: FormGroup;
  formPedido: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.colores = [
      new Color('Rojo', 'Rojo'),
      new Color('Celeste', 'Celeste'),
      new Color('Naranja', 'Naranja'),
      new Color('Verde', 'Verde'),
      new Color('Amarillo', 'Amarillo'),
      new Color('Negro', 'Negro'),
      new Color('Blanco', 'Blanco'),
      new Color('Azul', 'Azul'),
      new Color('Beige', 'Beige'),
      new Color('Café', 'Café'),
    ];

    this.disenos = [
      new Diseno('Lego Superman', 'Lego Superman'),
      new Diseno('Lego Batman', 'Lego Batman'),
      new Diseno('Capitán América', 'Capitán América'),
      new Diseno('Super Mario:  Luigi', 'Super Mario:  Luigi'),
      new Diseno('Amazing Spiderman 1', 'Amazing Spiderman 1'),
      new Diseno('Amazing Spiderman 2', 'Amazing Spiderman 2'),
      new Diseno('Hello Kitty', 'Hello Kitty'),
      new Diseno('My Little Pony', 'My Little Pony'),
      new Diseno('Super Mario: Mario', 'Super Mario: Mario'),
      new Diseno('Frozen: Elsa', 'Frozen: Elsa'),
      new Diseno('PJ Masks: Gatuno', 'PJ Masks: Gatuno'),
      new Diseno('Simpsons: Barcelona', 'Simpsons: Barcelona'),
      new Diseno('Fortnite', 'Fortnite'),
      new Diseno('StarWars: Darth Vader', 'StarWars: Darth Vader'),
      new Diseno('Simpsons: Emelec', 'Simpsons: Emelec'),
      new Diseno('Transformers: Optimus Prime', 'Transformers: Optimus Prime'),
      new Diseno('Dragon Ball Z: Goku', 'Dragon Ball Z: Goku'),
      new Diseno('Barbie', 'Barbie'),
      new Diseno('Princesas Disney', 'Princesas Disney'),
      new Diseno('Spiderman', 'Spiderman'),
      new Diseno('Yo soy Grut', 'Yo soy Grut'),
      new Diseno('Marvel Heroes', 'Marvel Heroes'),
      new Diseno('Bebes Llorones: BOs', 'Bebes Llorones: BOs'),
      new Diseno('Bebes Llorones: Countess', 'Bebes Llorones: Countess'),
      new Diseno('StarWars: Darth Vader 2', 'StarWars: Darth Vader 2'),
      new Diseno('Adventure Tim', 'Adventure Tim'),
      new Diseno('Barbie 2', 'Barbie 2'),
      new Diseno('Bob Esponja', 'Bob Esponja'),
      new Diseno('Paw Patrol', 'Paw Patrol'),
      new Diseno('Simpsons: Homero', 'Simpsons: Homero'),
      new Diseno('Las chicas superpoderosas', 'Las chicas superpoderosas'),
      new Diseno('Hulk', 'Hulk'),
      new Diseno('Iron Man', 'Iron Man'),
      new Diseno('Princesita Sofia', 'Princesita Sofia'),
      new Diseno('Pokemon', 'Pokemon'),
      new Diseno('Sonic Generations', 'Sonic Generations'),
      new Diseno('Captain America', 'Captain America'),
      new Diseno('Mickey Mouse', 'Mickey Mouse'),
      new Diseno('Frozen: Elsa 2', 'Frozen: Elsa 2'),
    ];

    $('.header-menu-toggle').on('click', (e) => {
      e.preventDefault();

      $('body').toggleClass('menu-is-open');
    });

    this.formArticle = this.fb.group({
      formColor: [null, Validators.required],
      formDiseno: [null, Validators.required],
      formCantidad: [1, [Validators.required, Validators.min(1)]]
    });

    this.formPedido = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required]],
      ciudad: ['', [Validators.required]]
    })
  }

  onColorChange() {
    console.log(this.formArticle.value);
  }

  onDisenoChange(){
    console.log(this.formArticle.value);
  }

  grabarLinea(){
    const formData: any = this.formArticle.value;
    this.lineasDePedido.push({
      color: formData.formColor.colId,
      diseno: formData.formDiseno.disId,
      cantidad: formData.formCantidad
    });
  }

  grabarPedido(){
    const formData: any = this.formPedido.value;

    this.pedido = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      ciudad: formData.ciudad,
      pedido: this.lineasDePedido
    };

    this.formArticle.markAsPristine();
    this.formArticle.markAsUntouched();
    this.formArticle.reset();
    this.lineasDePedido = [];
    console.log(this.pedido);

    this.api.grabarPedido(this.pedido);

  }
}
