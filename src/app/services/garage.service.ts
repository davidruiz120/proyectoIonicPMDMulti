import { Vehiculo } from './../model/Vehiculo';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  myCollection: AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore) {
    this.myCollection = fireStore.collection<any>(environment.collection);
  }

  /**
   * Función que recoge todos los datos de la colección
   * previamente establecido en el constructor
   */
  readGARAGE():Observable<firebase.firestore.QuerySnapshot>{
    return this.myCollection.get();
  }

  /**
   * Función que recoge todos los datos de la colección,
   * pero devolviendo un observable con el array de los
   * objetos
   * 
   * @param timer
   */
  readGARAGE2(timer:number=10000):Observable<Vehiculo[]>{
    return new Observable((observer)=>{
      //observer.next() para devolver un valor
      //observer.error() para devolver un error
      //observer.complete() para cortar?
      let subscripcion:Subscription;
      let tempo = setTimeout(()=>{
        subscripcion.unsubscribe();
        observer.error("Timeout");
      }, timer);
      subscripcion = this.readGARAGE().subscribe((lista)=>{
        clearTimeout(tempo);
        let listado = [];
        lista.docs.forEach((vehiculo)=>{
          listado.push({id:vehiculo.id,...vehiculo.data()}); // Concatena dos cosas para unirlas en una
        })
        observer.next(listado);
        observer.complete();
      })
    });
  }

  /**
   * Función que recoge el registro según un identificador
   * en específico
   * 
   * @param id Identificador que se utilizará para la búsqueda
   */
  readGARAGEByID(id:string):Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(id).get();
  }

  /**
   * Función que se encarga de insertar un nuevo
   * registro en Firebase
   * 
   * @param nuevovehiculo Objeto que se insertará en Firebase
   */
  addGARAGE(nuevovehiculo:Vehiculo):Promise<firebase.firestore.DocumentReference>{
    return this.myCollection.add(nuevovehiculo);
  }

  /**
   * Función que se encarga de obtener un registro con su
   * identificador y actualizarlo con los nuevos datos
   * 
   * @param id Identificador del registro
   * @param data El objeto con los nuevos datos
   */
  updateGARAGE(id:string, data:Vehiculo):Promise<void>{
    return this.myCollection.doc(id).set(data);
  }

  /**
   * Función que se encarga de eliminar un registro
   * según un identificador en específico
   * 
   * @param id Identificador del registro
   */
  deleteGARAGE(id:string):Promise<void>{
    return this.myCollection.doc(id).delete();
  }

}
