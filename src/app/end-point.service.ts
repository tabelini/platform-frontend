import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPoint} from 'platform-domain';
import {Observable} from 'rxjs';
import {E} from '@angular/core/src/render3';

@Injectable()
export class EndPointService {

  readonly apiPath = '/api/iot/v1/endpoint';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<EndPoint[]> {
    return this.http.get<Array<EndPoint>>(this.apiPath);
  }

  get(id: string): Observable<EndPoint> {
    return this.http.get<EndPoint>(this.apiPath + `/${id}`);
  }

  save(obj: EndPoint): Observable<EndPoint> {
    return this.http.post<EndPoint>(this.apiPath, obj);
  }

  delete(id: string): Observable<EndPoint> {
    return this.http.delete<EndPoint>(this.apiPath + `/${id}`);
  }
}
