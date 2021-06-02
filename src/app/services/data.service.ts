import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const createUrl = 'https://floating-cove-62554.herokuapp.com/image/upload'
const baseUrl = 'https://floating-cove-62554.herokuapp.com/image/getall'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  findImages(title, description, tags, from, to): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}&description=${description}&tags=${tags}&from=${from}&to=${to}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(createUrl, data, { observe: 'response' });
  }
}