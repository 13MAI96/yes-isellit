import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BoardgameListItem, BoardgameViewItem } from '../models/boardgame';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = environment.apiUrl
  constructor(
    private httpClient: HttpClient
  ) { }

  getItemList(): Observable<BoardgameListItem[]>{
    return this.httpClient.get<BoardgameListItem[]>(this.apiUrl + "/list")
  }

  getViewById(id: number): Observable<BoardgameViewItem>{
    return this.httpClient.get<BoardgameViewItem>(this.apiUrl + "/item/" + id)
  }
}
