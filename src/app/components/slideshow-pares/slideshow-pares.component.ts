import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
  standalone: false,
})
export class SlideshowParesComponent  implements OnInit {


  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClick(){
    this.cargarMas.emit();
  }

}
