import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { NotificationService } from "src/app/services/notification.service";

@Component({
    selector: 'info-dialog',
    templateUrl: 'info-dialog.component.html',
  })
  export class InfoDialog {
    public notificationMessage = '';
    constructor(
        public dialogRef: MatDialogRef<InfoDialog>,
        public notification: NotificationService
    ) {
        notification.notification.subscribe(message => {
            this.notificationMessage = message;
        })
    }
  }