import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Yes, i sell it!';
  private durationInSeconds: number = 3;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  ngAfterViewInit() {}

  share(){
    let shareData: ShareData = {
      url: document.location.href
    };
    try {
      if(navigator.share){
        	console.log(navigator.share)
          console.log(document.location)
      }
      navigator?.share(shareData)
        .then(result => console.log(result))
        .catch(err => {
          console.log("El navegador no permite compartir.");
          navigator.clipboard.writeText(shareData.url ?? '').then(result => {
            this.openSnackBar("Se copio al portapapeles.");
          }).catch(
            error => console.log("No se pudo copiar.")
          )
        });
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

}
