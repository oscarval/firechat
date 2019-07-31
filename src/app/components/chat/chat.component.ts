import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../providers/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit{

  public mensaje: string = "";
  elemento: any;

  constructor( public chatService:ChatService ) {
    this.chatService.cargarMensajes()
      .subscribe( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      });
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    if(this.mensaje.length > 0){
      this.chatService.agregarMensaje(this.mensaje).then(resp =>{
        this.mensaje = "";
      }).catch(error =>{
        console.error("error al guardar",error);
      })
    }else{
      return;
    }
  }

}
