import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { LocaldataService } from 'src/app/services/localdata.service';
import { MoviesService } from 'src/app/services/movies.service';
import { NavController } from '@ionic/angular';


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
 estrella = 'star-outline';
 actores: Cast[] = [];

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private localData: LocaldataService,
              private navController: NavController) { }

  ngOnInit() {
    //console.log('ID', this.id);

    this.localData.existePelicula(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline' );
    

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {console.log(resp); this.pelicula = resp;
    });
    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {console.log(resp); this.actores = resp.cast;
    }); 
    
  }

regresar() {
  this.modalCtrl.dismiss({ recargar: true });
}
  favorito(){
    const existe = this.localData.guadarPelicula(this.pelicula).then(existe => this.estrella = (existe) ? 'star' : 'star-outline' );
  }

}
