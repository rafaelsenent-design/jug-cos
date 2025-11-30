import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseGetJuguetes, ApiResponseMessage, Juguete} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class JugService {
  private http: HttpClient = inject(HttpClient);
  private url = 'https://api-juguetes.vercel.app/api/v2/juguete/';

  getAll(): Observable<ApiResponseGetJuguetes> {
    return this.http.get<ApiResponseGetJuguetes>(this.url+'alljuguetes');
  }

  getOneJuguete(id: string): Observable<Juguete> {
    return this.http.get<Juguete>(this.url+ 'juguete/' + id);
  }

  postJuguete(juguete: Juguete): Observable<ApiResponseMessage> {
    return this.http.post<ApiResponseMessage>(this.url+'juguetes', juguete);
  }

  patchJuguete(juguete: Juguete): Observable<ApiResponseMessage> {
    return this.http.patch<ApiResponseMessage>(this.url+'update/' + juguete._id, juguete);
  }

  deleteJuguete(id: string): Observable<ApiResponseMessage> {
    return this.http.delete<ApiResponseMessage>(this.url+'delete/' + id);
  }
}
