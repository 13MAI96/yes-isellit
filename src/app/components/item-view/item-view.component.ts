import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BoardgameViewItem } from 'src/app/models/boardgame';


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
    private sanitizer: DomSanitizer
  ) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
      console.log(this.itemId)
      this.itemDetail = {
        media: [{
            type: 'image',
            url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
            },
            {
                type: 'video',
                url: 'https://www.youtube.com/embed/VALSkPglyy0'
            }
        ],
        descripcion: "Jueguito piola",
        id: this.itemId,
        nombre: "Nombre de juego",
        estado: 'En venta',
        precio: 65000,
        editorial: "Sabra diosito"
    }
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

  }

  sanitizeUrl(url: string): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  contact(){
    const contactUrl = 'https://wa.me/5493764833703?text='
    const message = `Hola, te contacto por el ${this.itemDetail.nombre} que vi en la pagina Yes, i sell it! a $${this.itemDetail.precio}`
    window.open( contactUrl + message, '_blank')
  }
}