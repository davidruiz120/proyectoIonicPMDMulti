import { Component } from '@angular/core';
import { UiComponent } from './../common/ui/ui.component';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  textoReconocido: String[];
  isRecording = false;

  constructor(private nativeAudio: NativeAudio, public ui: UiComponent, private stream: StreamingMedia,
          private plt: Platform, private speech: SpeechRecognition, private cd: ChangeDetectorRef) {}

  /**
   * Al iniciar la página, se iniciará la animación CSS3
   */
  ngOnInit(){
    this.animacionCSS3();
  }

  /**
   * Cuando se entre en la página, se cargará en memoria
   * el sonido en una variable
   */
  ionViewWillEnter():void{
    this.nativeAudio.preloadSimple('sound1', 'assets/audio/sound1.mp3')
    .catch((err)=>{
      this.ui.presentToast('Error - No se ha podido precargar el audio', '', 'danger');
      console.log(err);
    });
  }

  /**
   * Función que se encarga de reproducir el audio precargado
   */
  reproducir():void{
    this.nativeAudio.play('sound1')
    .catch((err)=>{
      this.ui.presentToast('Error - No se ha podido reproducir el audio', '', 'danger');
      console.log(err);
    })
  }

  /**
   * Cuando el usario deje la página, se descargará el archivo
   * para no saturar la memoria
   */
  ionViewWillLeave():void{
   this.nativeAudio.unload('sound1')
   .catch((err)=>{
    this.ui.presentToast('No se ha podido descargar el audio', '', 'danger');
    console.log(err);
   })
  }

  /**
   * Función simple que muestra un Toast de ejemplo
   */
  activarToast():void{
    this.ui.presentToast("Toast con animación de Ionic", "", "");
  }

  /**
   * Función que reproduce un stream de vídeo estableciendo
   * previamente ciertas opciones  
   */
  startVideo():void{
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log() },
      errorCallback: () => { console.log(); this.ui.presentToast("Error al intentar reproducir el vídeo", "", "danger") },
      orientation: 'portrait'
    }
    this.stream.playVideo('http://techslides.com/demos/sample-videos/small.mp4', options);
  }

  /**
   * Función que comprueba si la plataforma actual
   * es iOS
   */
  isIos():boolean {
    return this.plt.is('ios');
  }

  /**
   * Función que hace una petición de permiso hacia el usuario
   */
  getPermiso():void{
    this.speech.hasPermission()
    .then((hasPermission: boolean) =>{
      if(!hasPermission){
        this.speech.requestPermission();
      }
    })
  }

  /**
   * Función que se encarga de 'escuchar' la entrada
   * del micrófono y lo interpreta. Dicha interpretación se 
   * guarda en un array 'textoReconocido'
   */
  startListening():void{
    let options = {
      language: 'es-ES'
    }
    this.speech.startListening().subscribe(matches => {
      this.textoReconocido = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  /**
   * Función que se encarga manualmente de parar
   * de 'escuchar' el micrófono. Dicho método solo se usa
   * si la plataforma acutal es iOS
   */
  stopListening():void{
    this.speech.stopListening()
    .then(() =>{
      this.isRecording = false;
    })
  }

  /**
   * Función que se encarga de establecer la 
   * animación CSS3 al botón en concreto de la vista
   */
  animacionCSS3():void{
    var animateButton = function(e) {
      e.preventDefault;
      e.target.classList.remove('animate');
      e.target.classList.add('animate');
      setTimeout(function(){
        e.target.classList.remove('animate');
      },700);
    };
    
    var bubblyButtons = document.getElementsByClassName("bubbly-button");
    
    for (var i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton, false);
    }
  }

}
