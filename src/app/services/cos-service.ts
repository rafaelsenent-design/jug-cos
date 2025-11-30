import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseCosmeticos, ApiResponseMessage, Cosmetico} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CosService {
  private http: HttpClient = inject(HttpClient);
  private url = 'https://api-cosmeticos.vercel.app/api/v2/cosmeticos/';

  getByPage(page: number): Observable<ApiResponseCosmeticos> {
    return this.http.get<ApiResponseCosmeticos>(this.url+'paged?page=' + page + '&limit=10');
  }

  getOneCosmetico(id: string): Observable<Cosmetico> {
    return this.http.get<Cosmetico>(this.url+ 'detail/' + id);
  }

  postCosmetico(cosmetico: Cosmetico): Observable<ApiResponseMessage> {
    return this.http.post<ApiResponseMessage>(this.url+'addOne', cosmetico);
  }

  patchCosmetico(cosmetico: Cosmetico): Observable<ApiResponseMessage> {
    return this.http.patch<ApiResponseMessage>(this.url+'updateOne/' + cosmetico._id, cosmetico);
  }

  deleteCosmetico(id: string): Observable<ApiResponseMessage> {
    return this.http.delete<ApiResponseMessage>(this.url+'deleteOne/' + id);
  }
}


