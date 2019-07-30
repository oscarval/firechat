import { Component } from '@angular/core';
import { ChatService } from "../../providers/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {

  public mensaje:string = "";

  constructor( public chatService:ChatService ) {
    this.chatService.cargarMensajes()
      .subscribe();
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
