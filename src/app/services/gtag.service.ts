import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BoardgameListItem, BoardgameViewItem } from '../models/boardgame';
import { Observable } from 'rxjs';
declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GtagService {
  constructor() { }

  newTag(eventType: string, extraData: string){
    if(eventType == "page_view"){
        gtag(
            "event", 
            eventType, 
            {
                page_path: extraData
            }
        )
    } else if(eventType == "contact"){
        gtag(
            "event",
            eventType,
            {
                price: extraData
            }
        )
    } else if(eventType == "view_item"){
        gtag(
            "event",
            eventType,
            {
                item: extraData
            }
        )
    }
  }
}