import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string):Observable<T>{

    query = URL + query;
    query += `api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);

  }

  getPopulares(){

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularuty.desc&page=${this.popularesPage}&`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getFeature(): Observable<RespuestaMDB> {

    return this.ejecutarQuery<RespuestaMDB>('/discover/movie?');

  }

}
