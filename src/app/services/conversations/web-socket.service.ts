import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socketCheck: boolean = false;
  newMessage: any;
  constructor(
    private socket: Socket,
  ) {
    this.connectToWebSocket();
  }
  connectToWebSocket() {
    if (localStorage.getItem('userToken')) {
      this.socket.ioSocket.io.opts.query = { authorization: localStorage.getItem('userToken') }; // new options
      this.socket.ioSocket.io.uri = 'https://oq-bot-backend.abgari.store';
      this.socket.connect();
      this.socket.on('connect', (data) => {
        this.socketCheck = true;
      });
    }
  }

  subscribeToRoom(conversionId) {
    this.socket.emit('subscribe', { 'room': conversionId });
  }

  unsubscribeFromRoom(conversionId) {
    this.socket.emit('unsubscribe', { 'room': conversionId });
  }
}
