import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
import { filter } from 'rxjs';
import { GtagService } from './services/gtag.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialog } from './dialogs/info/info-dialog.component';
import { NotificationService } from './services/notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Yes, i sell it!';
  public hidden: boolean = false;
  private durationInSeconds: number = 3;
  private firtsAccess: string = "";
  private lastUpdate: string = "001"
  private lastView: string = '';

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private gtag: GtagService,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {
    this.firtsAccess = localStorage.getItem('first-access') ?? "";
    this.lastView = localStorage.getItem('last-view') ?? '';

    if(this.firtsAccess == ""){
      this.openInfo();
    }
    if(this.lastView == this.lastUpdate){
      this.hidden = true;
    }
    this.notification.notification.subscribe(value => {
      if(value != ''){
        this.hidden = false;
      }
    })
  }

  ngAfterViewInit() {
    let ads = document.createElement("script")
    ads.setAttribute("async", "true");
    ads.setAttribute("src", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8045867282389718")
    ads.setAttribute("crossorigin", "anonymous");
    setTimeout(()=>{
      document.head.appendChild(ads)
    }, 1)
  }

  share(){
    let shareData: ShareData = {
      url: document.location.href
    };
    try {
      console.log(navigator.share, navigator.clipboard)
      if(navigator.share){
        navigator?.share(shareData)
          .then(result => console.log(result))
          .catch(err => {
            console.log("El navegador no permite compartir.");
        });
      } else if(navigator.clipboard){
        navigator.clipboard.writeText(shareData.url ?? '').then(result => {
          this.openSnackBar("Se copio al portapapeles.");
        }).catch(
          error => console.log("No se pudo copiar.")
        )
      }
    } catch (error) {
      console.log(error);
    }
  }

  home(){
    this.router.navigate([''])
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, "Ok", {duration: this.durationInSeconds * 1000});
  }

  openInfo(){
    this.dialog.open(InfoDialog, {
      enterAnimationDuration: "10ms",
      exitAnimationDuration: '10ms',
    }).afterClosed().subscribe(result => {
      console.log(result)
      localStorage.setItem('first-access', 'false');
      localStorage.setItem('last-view', this.lastUpdate);
      this.hidden = true;
    })
  }

}
