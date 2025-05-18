import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

getFeature(): Observable<RespuestaMDB> {

  return this.http.get<RespuestaMDB>('https://api.themoviedb.org/3/discover/movie?api_key=31f403f2fdf0920d385c7cc73fc7446a&language=es&include_image_language=es');

}

}
