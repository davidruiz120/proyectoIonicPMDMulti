import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from './../model/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;

  constructor(private local: NativeStorage, private google: GooglePlus, private router: Router) { }

  public async checkSession(): Promise<void>{
    if(!this.user){
      try{
        this.user = await this.local.getItem('user');
      } catch (err){
        this.user = null;
      }
    }
  }

  public isAuthenticated():boolean{
    return this.user?true:false;
  }

  /**
   * Almacena el usuario en local con el nombre user
   * 
   * @param user  el usuario a almacenar, en caso de omisión
   * saveSession() eliminará el usuario->
   */
  public async saveSession(user?:User){
    if(user){
      await this.local.setItem('user', user);
    } else {
      await this.local.remove('user');
    }
  }

  public loginGoogle(): Promise<boolean>{
    return new Promise((resolve, reject)=>{
      this.google.login({})
      .then(d=>{
        if(d && d.email){ // Si existe
          let user: User = {
            email: d.email,
            displayName: d.displayName,
            imageUrl: d.imageUrl,
            userId: d.userId
          }
          this.user = user;
          this.saveSession(user);
          // En este punto ya está guardada la sesión
          resolve(true);
        } else {
          resolve(false);
        }
        //console.log(d);
      })
      .catch(err=>{
        resolve(false);
      })
    });
  }

  public async logout(){
    await this.google.logout();
    this.user = null;
    await this.saveSession(); // Sin parámetros para borrar la cookie
    this.router.navigate(['login']);
  }
}
