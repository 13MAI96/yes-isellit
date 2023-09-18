import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BoardgameListItem } from 'src/app/models/boardgame';
import { GtagService, ItemEvent, ItemViewEvent } from 'src/app/services/gtag.service';
import { ItemService } from 'src/app/services/item.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  title = 'Yes, i sell it!';
  displayedColumns: string[] = ['id', 'nombre', 'editorial', 'estado', 'price', 'actions'];
  dataSource!: MatTableDataSource<BoardgameListItem>;
  private lastItemQuantity = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private itemService: ItemService,
    private gtag: GtagService,
    private notification: NotificationService
  ) {
    this.itemService.getItemList().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.notify(result.length);
    })
  }

  notify(quantity: number){
    this.lastItemQuantity = Number(localStorage.getItem('item-quantity') ?? 0);
    if(quantity > this.lastItemQuantity){
      const news = quantity-this.lastItemQuantity
      this.notification.newNotification(`Se han agregado ${news} nuevos items.`);
      localStorage.setItem('item-quantity', JSON.stringify(quantity));
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(row: BoardgameListItem){
    let item = new ItemViewEvent("ARS", row.precio, row.nombre, 
      [new ItemEvent(`${row.id}`, row.nombre, row.editorial, row.precio)]
    )
    this.gtag.tagItemView(item);
    this.router.navigate(['item/' + row.id])
  }
}

