import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false,
})
export class DetalleComponent  implements OnInit {

 @Input() id!: string;
 
 pelicula: PeliculaDetalle = {};
 oculto = 150;
 actores: Cast[] = [];

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    //console.log('ID', this.id);

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {console.log(resp); this.pelicula = resp;
    });
    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {console.log(resp); this.actores = resp.cast;
    }); 
    
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){

  }

}
