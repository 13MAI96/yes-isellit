import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notification: BehaviorSubject<string>;
  constructor(
  ) { 
    this.notification = new BehaviorSubject('');
  }

  newNotification(message: string){
    this.notification.next(message);
  }

}