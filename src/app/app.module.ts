import { MenuComponent } from './common/menu/menu.component';
import { PipesModule } from './pipes/pipes.module';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { UiComponent } from './common/ui/ui.component';

import { Camera } from '@ionic-native/camera/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { toastAnimado } from './toastAnimado';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot({
      toastEnter: toastAnimado // Aquí aplico el la función 'toastAnimado' del archivo toasAnimado.ts que se encarga de animar el Toast
    }), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    GooglePlus,
    NativeStorage,
    AuthGuardService,
    AuthService,
    StatusBar,
    SplashScreen,
    UiComponent,
    MenuComponent,
    Camera,
    NativeAudio,
    StreamingMedia,
    SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
