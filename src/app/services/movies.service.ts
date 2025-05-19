import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string): Observable<T> {
    // Si query ya tiene '?', añadimos '&', si no, añadimos '?'
    const separator = query.includes('?') ? '&' : '?';
    const url = `${URL}${query}${separator}api_key=${apiKey}&language=es&include_image_language=es`;    
    return this.http.get<T>(url);
  }

  getPopulares(): Observable<RespuestaMDB> {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getFeature(): Observable<RespuestaMDB> {
    return this.ejecutarQuery<RespuestaMDB>('/discover/movie?');
  }

  getPeliculaDetalle(id: string): Observable<PeliculaDetalle> {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}`);
  }

   getActoresPelicula(id: string): Observable<RespuestaCredits> {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits`);
  }

  buscarPeliculas( texto: string ){
    return this.ejecutarQuery(`/search/movie?query=${texto}`)
  }

  cargarGeneros(): Promise<Genre[]>{

    return new Promise(resolve=>{

      this.ejecutarQuery(`/genre/movie/list?`).subscribe( resp => {this.generos = resp['genres'];
      console.log(this.generos);
      resolve(this.generos);
    });

    })

  }


}
