import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocaldataService {

  private _storage: Storage | null = null;
  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.init(); // Inicializa el storage
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 500
    });
    toast.present();
  }


  async init() {
    this._storage = await this.storage.create();
    const storedPeliculas = await this._storage.get('peliculas');

    this.peliculas = storedPeliculas || []; // Recupera las películas guardadas o inicializa vacío
  }

  async guadarPelicula(pelicula: PeliculaDetalle) {
    if (!this._storage) {
      await this.init();
    }

    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast(mensaje)
    await this._storage.set('peliculas', this.peliculas);

    return !existe;
  }

  async cargarFavoritos(): Promise<PeliculaDetalle[]> {
    if (!this._storage) {
      await this.init();
    }

    const peliculas = await this._storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }


  async existePelicula( id ){
   
    id = Number(id)
    
    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id);

    return (existe) ? true : false;

  }

}
