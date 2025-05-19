import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Drive', 'Flow', 'Blade runner 2049', 'Her', 'Thunderbolts', 'Harry Potter'];

  constructor( private movieService: MoviesService,
               private modalCtrl: ModalController ) {}

  buscar( event ){
    
    const valor: string = event.detail.value;
    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    //console.log(valor);
    this.buscando = true;
    this.movieService.buscarPeliculas(valor).subscribe(resp =>{console.log(resp); this.peliculas = resp['results']; this.buscando = false;
    })
    
  }

  setIdea(idea: string) {
  this.textoBuscar = idea;
  this.buscar({ detail: { value: idea } }); // simula el evento
 }

 async detalle(id: string){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });

    modal.present();

  }



}
