import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataNode } from '../interfaces/tree.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  getMenu(): Observable<IDataNode[]> {
    return this.http.get<IDataNode[]>('./assets/data/node.json');
  }
}
