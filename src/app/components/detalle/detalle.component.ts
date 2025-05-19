import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false,
})
export class DetalleComponent  implements OnInit {

 @Input() id!: string;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    //console.log('ID', this.id);

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {console.log(resp);
    });
    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {console.log(resp);
    }); 
    
  }

}
