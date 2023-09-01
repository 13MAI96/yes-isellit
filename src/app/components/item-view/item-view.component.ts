import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BoardgameViewItem } from 'src/app/models/boardgame';
import { GtagService } from 'src/app/services/gtag.service';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  private itemId: number;
  public itemDetail!: BoardgameViewItem;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private itemService: ItemService,
    private gtag: GtagService
  ) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getViewById(this.itemId).subscribe(result => {
        this.itemDetail = result;
    })
  }

  ngOnInit(): void {}

  sanitizeUrl(url: string): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  contact(){
    const contactUrl = 'https://wa.me/5493764833703?text='
    const message = `Hola, te contacto por el ${this.itemDetail.nombre} que vi en la pagina Yes, i sell it! a $${this.itemDetail.precio}`
    this.gtag.newTag("contact", this.itemDetail.nombre + ": " +this.itemDetail.precio)
    window.open( contactUrl + message, '_blank')
  }
}