import { async } from '@angular/core/testing';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      await this.auth.checkSession();
      /** he comprobado si puedes o no ir a login */
      if(this.auth.isAuthenticated()){
        this.router.events.subscribe(event=>{
          if(event instanceof NavigationEnd){ // Si es de tipo NavigationEnd - Comprobamos a donde va el usuario 
            if(this.router.url==='/' || this.router.url==='/login'){
              this.router.navigate(['/tabs']);
            }
          } 
        })
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
