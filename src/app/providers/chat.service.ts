import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from "../interfaces/mensaje.interface";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });

  }

  login(proveedor: string) {
    if (proveedor === "google") {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    else if (proveedor === "twitter") {
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider() );
    }
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats',
      ref => ref.orderBy('fecha', 'desc')
        .limit(5));

    return this.itemsCollection.valueChanges()
      .map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      });
  }

  agregarMensaje(texto: string) {
    console.log(this.usuario);
    // TODO falta uid
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      uid: this.usuario.uid,
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);

  }
}
