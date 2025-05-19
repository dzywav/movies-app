import { Component } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { LocaldataService } from '../services/localdata.service';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component'; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(
    private localData: LocaldataService,
    private movieService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  async ionViewWillEnter() {
    this.peliculas = await this.localData.cargarFavoritos();
    this.generos = await this.movieService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [];

    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id);
        })
      });
    });

    console.log(this.favoritoGenero);
  }

  // Método para abrir el modal detalle y recargar favoritos al cerrar
  async abrirDetalle(pelicula: PeliculaDetalle) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id: pelicula.id }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.recargar) {
      // Recarga los favoritos si el modal notificó cambio
      this.ionViewWillEnter();
    }
  }
}
