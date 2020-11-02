import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messages = new Subject<any>();

  myWebSocket: WebSocketSubject<any> = webSocket('ws://172.26.123.195:3000/');

  constructor( private http: HttpClient){
    
     this.myWebSocket.next({message: 'hicardi101'});
    this.myWebSocket.subscribe(
      msg => {this.messages.next(msg);},
      err => {console.log(err);},
      () => console.log('complete')
    );
  }

  get(){
    return this.http.get(`http://localhost:3000`);
   
  }

  onMessage(): Observable<any> {
    return this.messages.asObservable();
  }

  subscribe(){
    //this.myWebSocket.next({message: 'testststes'});
    this.myWebSocket.subscribe(
      msg => {console.log(msg); this.messages.next(msg);},
      err => {console.log(err);},
      () => console.log('complete')
    );
  }


}
