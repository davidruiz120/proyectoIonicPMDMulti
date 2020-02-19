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

  readGARAGE():Observable<firebase.firestore.QuerySnapshot>{
    return this.myCollection.get();
  }

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

  readGARAGEByID(id:string):Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(id).get();
  }

  addGARAGE(nuevovehiculo:Vehiculo):Promise<firebase.firestore.DocumentReference>{
    return this.myCollection.add(nuevovehiculo);
  }

  updateGARAGE(id:string, data:Vehiculo):Promise<void>{
    return this.myCollection.doc(id).set(data);
  }

  deleteGARAGE(id:string):Promise<void>{
    return this.myCollection.doc(id).delete();
  }

}
