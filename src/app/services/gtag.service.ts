import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BoardgameListItem, BoardgameViewItem } from '../models/boardgame';
import { Observable } from 'rxjs';
declare const gtag: Function;

export class ItemViewEvent{
    currency: "USD" | "EUR" | "ARS";
    value: number;
    item_name: string;
    items: ItemEvent[];
    constructor(
        currency: "USD" | "EUR" | "ARS", 
        value: number,
        itemName: string, 
        items: ItemEvent[]
    ){
        this.currency = currency;
        this.value = value;
        this.item_name = itemName
        this.items = items
    }
}

export class ItemEvent{
    item_id: string;
    item_name: string;
    item_brand: string;
    price: number;
    constructor(
        itemId: string, 
        itemName: string, 
        itemBrand: string, 
        price: number
    ){
        this.item_id = itemId;
        this.item_name = itemName;
        this.item_brand = itemBrand;
        this.price = price;
    }
}

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

  tagItemView(item: ItemViewEvent){
    gtag("event", item.item_name, {...item})
  }
}